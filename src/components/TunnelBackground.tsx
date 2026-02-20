'use client'

import { useEffect, useRef } from 'react'

const VERT = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}`

const FRAG = `
precision highp float;
uniform float iTime;
uniform vec3 iResolution;

#define T (iTime * 1.5 + 5.0 + 3.0 * sin(iTime * 0.15))
#define P(z) vec3(12.0 * cos((z) * vec2(0.1, 0.12)), z)
#define A(F, H, K) abs(dot(sin(F * p * K), H + p - p)) / K

void main() {
  vec2 u = gl_FragCoord.xy;
  float t, s = 0.0, i, d = 0.0, e = 0.0;
  vec3 c = vec3(0.0);
  vec3 r = iResolution;

  u = (u - r.xy / 2.0) / r.y;

  vec3 p = P(T),
       Z = normalize(P(T + 4.0) - p),
       X = normalize(vec3(Z.z, 0.0, -Z.x)),
       D = vec3(u, 1.0) * mat3(-X, cross(X, Z), Z);

  for (int j = 0; j < 28; j++) {
    if (d >= 30.0) break;
    i = float(j);
    p += D * s;
    X = P(p.z);
    t = sin(iTime);
    e = length(p - vec3(
      X.x + t,
      X.y + t * 2.0,
      6.0 + T + t * 2.0)) - 0.01;
    s = cos(p.z * 0.6) * 2.0 + 4.0
      - min(length(p.xy - X.x - 6.0), length((p - X).xy))
      + A(4.0, 0.25, 0.1)
      + A(T + 8.0, 0.22, 2.0);
    d += s = min(e, 0.01 + 0.3 * abs(s));
    c += 1.0 / s + 10.0 * vec3(1.0, 2.0, 5.0) / max(e, 0.6);
  }

  gl_FragColor = vec4(c * c / 4e6, 1.0);
}`

export default function TunnelBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const startTimeRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl', {
      alpha: false,
      antialias: false,
      premultipliedAlpha: false,
    })
    if (!gl) return

    function createShader(type: number, source: string) {
      const shader = gl!.createShader(type)!
      gl!.shaderSource(shader, source)
      gl!.compileShader(shader)
      if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
        console.error('shader compile error:', gl!.getShaderInfoLog(shader))
        gl!.deleteShader(shader)
        return null
      }
      return shader
    }

    const vs = createShader(gl.VERTEX_SHADER, VERT)
    const fs = createShader(gl.FRAGMENT_SHADER, FRAG)
    if (!vs || !fs) return

    const program = gl.createProgram()!
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('program link error:', gl.getProgramInfoLog(program))
      return
    }

    gl.useProgram(program)

    // Fullscreen quad
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)

    const pos = gl.getAttribLocation(program, 'position')
    gl.enableVertexAttribArray(pos)
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0)

    const iTimeLoc = gl.getUniformLocation(program, 'iTime')
    const iResLoc = gl.getUniformLocation(program, 'iResolution')

    // Reduced pixel ratio for performance — raymarching is GPU heavy
    const dpr = Math.min(window.devicePixelRatio * 0.75, 1.5)

    const resize = () => {
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      gl.viewport(0, 0, canvas.width, canvas.height)
    }

    resize()
    startTimeRef.current = performance.now()

    const render = () => {
      const time = (performance.now() - startTimeRef.current) / 1000
      gl.uniform1f(iTimeLoc, time)
      gl.uniform3f(iResLoc, canvas.width, canvas.height, 1.0)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      animationRef.current = requestAnimationFrame(render)
    }

    render()
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(animationRef.current)
      window.removeEventListener('resize', resize)
      gl.deleteProgram(program)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
      gl.deleteBuffer(buffer)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  )
}

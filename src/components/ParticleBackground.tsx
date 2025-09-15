'use client'

import { useEffect, useRef } from 'react'
import { createNoise3D } from 'simplex-noise'

class PropsArray {
  private data: Float32Array
  private propCount: number
  private itemCount: number

  constructor(itemCount: number, props: string[]) {
    this.itemCount = itemCount
    this.propCount = props.length
    this.data = new Float32Array(itemCount * this.propCount)
  }

  set(values: number[], index: number) {
    const start = index * this.propCount
    for (let i = 0; i < values.length; i++) {
      this.data[start + i] = values[i]
    }
  }

  get(index: number): number[] {
    const start = index * this.propCount
    return Array.from(this.data.slice(start, start + this.propCount))
  }

  forEach(callback: (item: number[], index: number) => void) {
    for (let i = 0; i < this.itemCount; i++) {
      callback(this.get(i), i)
    }
  }

  map(callback: (item?: number[], index?: number) => number[]) {
    for (let i = 0; i < this.itemCount; i++) {
      this.set(callback(undefined, i), i)
    }
  }
}



// Utility functions
const TAU = Math.PI * 2
const rand = (n: number) => Math.random() * n
const randRange = (n: number) => rand(n) - n * 0.5
const randIn = (min: number, max: number) => rand(max - min) + min
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const cos = Math.cos
const sin = Math.sin
const fadeInOut = (t: number, m: number) => {
  const hm = 0.5 * m
  return Math.abs(((t + hm) % m) - hm) / hm
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const particlesRef = useRef<PropsArray | null>(null)
  const bufferRef = useRef<CanvasRenderingContext2D | null>(null)
  const imageBufferRef = useRef<ImageData | null>(null)
  const noiseRef = useRef<ReturnType<typeof createNoise3D> | null>(null)
  const tickRef = useRef(0)
  const dimensionsRef = useRef({ width: 0, height: 0, centerx: 0, centery: 0 })
  const mouseRef = useRef({ x: 0, y: 0 })

  const particleCount = 8000
  const particleProps = ['x', 'y', 'vx', 'vy', 'a', 'l', 'ttl', 'vc', 'r', 'g', 'b']
  const noiseSteps = 6

  const createParticle = (): number[] => {
    const { centerx, centery } = dimensionsRef.current
    const theta = rand(TAU)
    const rdist = randRange(250)
    const x = centerx + rdist * cos(theta)
    const y = centery + rdist * sin(theta)
    const vx = 0
    const vy = 0
    const l = 0
    const ttl = 100 + rand(200)
    const vc = randIn(1, 10)
    const grayValue = (120 + rand(80)) | 0
    const r = grayValue
    const g = grayValue
    const b = grayValue

    return [x, y, vx, vy, 0, l, ttl, vc, r, g, b]
  }

  const createParticles = () => {
    particlesRef.current = new PropsArray(particleCount, particleProps)
    particlesRef.current.map(createParticle)
  }

  const resetParticle = (i: number) => {
    particlesRef.current!.set(createParticle(), i)
  }

  const updatePixelCoords = (x: number, y: number, vx: number, vy: number, vc: number): [number, number, number, number] => {
    if (!noiseRef.current) return [x, y, vx, vy]
    const n = noiseRef.current(x * 0.0025, y * 0.00125, tickRef.current * 0.00025) * TAU * noiseSteps
    
    // Mouse interaction
    const { x: mouseX, y: mouseY } = mouseRef.current
    const dx = mouseX - x
    const dy = mouseY - y
    const distance = Math.sqrt(dx * dx + dy * dy)
    const maxDistance = 150
    
    if (distance < maxDistance) {
      const force = (maxDistance - distance) / maxDistance
      const angle = Math.atan2(dy, dx)
      const mouseInfluence = force * 0.5
      vx += cos(angle) * mouseInfluence
      vy += sin(angle) * mouseInfluence
    }
    
    vx = lerp(vx, cos(n) * vc, 0.015)
    vy = lerp(vy, sin(n) * vc, 0.015)
    x += vx
    y += vy
    return [x, y, vx, vy]
  }

  const updatePixelAlpha = (l: number, ttl: number): [number, number] => {
    l++
    return [l, fadeInOut(l, ttl) * 255]
  }

  const outOfBounds = (x: number, y: number, width: number, height: number): boolean => {
    return y < 1 || y > height - 1 || x < 1 || x > width - 1
  }

  const fillPixel = (imageData: ImageData, i: number, [r, g, b, a]: number[]) => {
    imageData.data.set([r, g, b, a], i)
  }

  const updateParticles = () => {
    const { width, height } = dimensionsRef.current
    const particles = particlesRef.current!
    const imageBuffer = imageBufferRef.current!
    
    imageBuffer.data.fill(0)

    particles.forEach(([x, y, vx, vy, , l, ttl, vc, r, g, b], index) => {
      const i = 4 * ((x | 0) + (y | 0) * width)
      const [newL, newA] = updatePixelAlpha(l, ttl)

      if (newL < ttl && !outOfBounds(x, y, width, height)) {
        const [newX, newY, newVx, newVy] = updatePixelCoords(x, y, vx, vy, vc)
        particles.set([newX, newY, newVx, newVy, newA, newL, ttl, vc, r, g, b], index)
        fillPixel(imageBuffer, i, [r, g, b, newA])
      } else {
        resetParticle(index)
      }
    })

    bufferRef.current!.putImageData(imageBuffer, 0, 0)
  }

  const drawBackground = (ctx: CanvasRenderingContext2D) => {
    const { width, height } = dimensionsRef.current
    ctx.fillStyle = 'rgba(0, 0, 0, 0.15)'
    ctx.fillRect(0, 0, width, height)
  }

  const renderFrame = (ctx: CanvasRenderingContext2D) => {
    const buffer = bufferRef.current!
    
    ctx.save()
    ctx.filter = 'blur(3px) brightness(120%)'
    ctx.globalAlpha = 0.7
    ctx.drawImage(buffer.canvas, 0, 0)
    ctx.globalCompositeOperation = 'lighter'
    ctx.filter = 'saturate(150%)'
    ctx.globalAlpha = 0.5
    ctx.drawImage(buffer.canvas, 0, 0)
    ctx.restore()
  }

  const resize = () => {
    if (!canvasRef.current || !bufferRef.current) return
    
    const width = window.innerWidth
    const height = window.innerHeight
    
    canvasRef.current.width = width
    canvasRef.current.height = height
    bufferRef.current.canvas.width = width
    bufferRef.current.canvas.height = height
    
    dimensionsRef.current = {
      width,
      height,
      centerx: width * 0.5,
      centery: height * 0.5
    }
    
    imageBufferRef.current = bufferRef.current.createImageData(width, height)
  }

  const render = () => {
    if (!canvasRef.current) return
    
    const ctx = canvasRef.current.getContext('2d')!
    
    tickRef.current++
    updateParticles()
    drawBackground(ctx)
    renderFrame(ctx)
    
    animationRef.current = requestAnimationFrame(render)
  }

  useEffect(() => {
    if (!canvasRef.current) return
    
    // Create buffer canvas
    const bufferCanvas = document.createElement('canvas')
    bufferRef.current = bufferCanvas.getContext('2d')!
    
    const setup = () => {
      noiseRef.current = createNoise3D()
      resize()
      createParticles()
      render()
    }
    
    setup()
    
    const handleResize = () => {
      resize()
    }
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvasRef.current) return
      const rect = canvasRef.current.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    }
    
    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{
        background: 'transparent'
      }}
    />
  )
}
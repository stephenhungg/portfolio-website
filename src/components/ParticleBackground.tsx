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

  const particleCount = 22500
  const particleProps = ['x', 'y', 'vx', 'vy', 'a', 'l', 'ttl', 'vc', 'r', 'g', 'b']
  const noiseSteps = 8

  const createParticle = (): number[] => {
    const { width, height } = dimensionsRef.current
    
    // Spawn particles from edges of screen
    const edge = Math.floor(rand(4)) // 0=top, 1=right, 2=bottom, 3=left
    let x, y
    
    switch(edge) {
      case 0: // top edge
        x = rand(width)
        y = -50
        break
      case 1: // right edge
        x = width + 50
        y = rand(height)
        break
      case 2: // bottom edge
        x = rand(width)
        y = height + 50
        break
      default: // left edge
        x = -50
        y = rand(height)
    }
    
    const vx = 0
    const vy = 0
    const l = 0
    const ttl = 150 + rand(300)
    const vc = randIn(3, 20)
    // Create diverse color gradients based on spawn edge and position
    const centerx = dimensionsRef.current.centerx
    const centery = dimensionsRef.current.centery
    const distFromCenter = Math.sqrt((x - centerx) * (x - centerx) + (y - centery) * (y - centery))
    const maxDist = Math.sqrt(width * width + height * height) * 0.5
    const normalizedDist = Math.min(distFromCenter / maxDist, 1)
    
    // Different color schemes for each edge
    let r, g, b
    switch(edge) {
      case 0: // Top edge - Cool blues to warm purples
        r = Math.floor(60 + normalizedDist * 140 + rand(50))   // 60-250
        g = Math.floor(80 + normalizedDist * 100 + rand(40))   // 80-220  
        b = Math.floor(180 + normalizedDist * 75)              // 180-255
        break
      case 1: // Right edge - Warm oranges to hot pinks
        r = Math.floor(200 + normalizedDist * 55)              // 200-255
        g = Math.floor(100 + normalizedDist * 120 + rand(35))  // 100-255
        b = Math.floor(60 + normalizedDist * 140 + rand(30))   // 60-230
        break
      case 2: // Bottom edge - Deep purples to bright cyans
        r = Math.floor(120 + normalizedDist * 80 + rand(40))   // 120-240
        g = Math.floor(60 + normalizedDist * 150 + rand(45))   // 60-255
        b = Math.floor(200 + normalizedDist * 55)              // 200-255
        break
      default: // Left edge - Forest greens to golden yellows
        r = Math.floor(80 + normalizedDist * 150 + rand(25))   // 80-255
        g = Math.floor(160 + normalizedDist * 95)              // 160-255
        b = Math.floor(40 + normalizedDist * 80 + rand(35))    // 40-155
    }

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
    const { centerx, centery } = dimensionsRef.current
    
    // Distance from center for spiral calculation
    const dx = x - centerx
    const dy = y - centery
    const distFromCenter = Math.sqrt(dx * dx + dy * dy)
    const angleFromCenter = Math.atan2(dy, dx)
    
    // Create spiral motion - particles spiral outward from center
    const spiralForce = 0.8
    const outwardForce = distFromCenter * 0.0008
    const spiralAngle = angleFromCenter + (tickRef.current * 0.01) + (distFromCenter * 0.005)
    
    // Base spiral velocity
    const spiralVx = cos(spiralAngle) * spiralForce + cos(angleFromCenter) * outwardForce
    const spiralVy = sin(spiralAngle) * spiralForce + sin(angleFromCenter) * outwardForce
    
    // Add noise for organic movement
    const n = noiseRef.current(x * 0.002, y * 0.002, tickRef.current * 0.0005) * TAU * noiseSteps
    const noiseVx = cos(n) * vc * 0.3
    const noiseVy = sin(n) * vc * 0.3
    
    // Mouse interaction - creates swirling vortex
    const { x: mouseX, y: mouseY } = mouseRef.current
    const mouseDx = mouseX - x
    const mouseDy = mouseY - y
    const mouseDistance = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy)
    const maxMouseDistance = 200
    
    let mouseVx = 0, mouseVy = 0
    if (mouseDistance < maxMouseDistance) {
      const force = (maxMouseDistance - mouseDistance) / maxMouseDistance
      const mouseAngle = Math.atan2(mouseDy, mouseDx)
      // Create circular motion around mouse
      const circularAngle = mouseAngle + Math.PI * 0.5
      const mouseInfluence = force * 2.0
      mouseVx = cos(circularAngle) * mouseInfluence
      mouseVy = sin(circularAngle) * mouseInfluence
    }
    
    // Combine all forces
    const targetVx = spiralVx + noiseVx + mouseVx
    const targetVy = spiralVy + noiseVy + mouseVy
    
    vx = lerp(vx, targetVx, 0.04)
    vy = lerp(vy, targetVy, 0.04)
    
    x += vx
    y += vy
    
    return [x, y, vx, vy]
  }

  const updatePixelAlpha = (l: number, ttl: number): [number, number] => {
    l++
    return [l, fadeInOut(l, ttl) * 255]
  }

  const outOfBounds = (x: number, y: number, width: number, height: number): boolean => {
    // Allow particles to go further off-screen before resetting
    const buffer = 100
    return y < -buffer || y > height + buffer || x < -buffer || x > width + buffer
  }

  const fillPixel = (imageData: ImageData, i: number, [r, g, b, a]: number[]) => {
    // Ensure the pixel index is within bounds
    if (i >= 0 && i < imageData.data.length - 3) {
      imageData.data.set([r, g, b, a], i)
    }
  }

  const updateParticles = () => {
    const { width, height } = dimensionsRef.current
    const particles = particlesRef.current!
    const imageBuffer = imageBufferRef.current!
    
    imageBuffer.data.fill(0)

    particles.forEach(([x, y, vx, vy, , l, ttl, vc, r, g, b], index) => {
      const [newL, newA] = updatePixelAlpha(l, ttl)

      if (newL < ttl && !outOfBounds(x, y, width, height)) {
        const [newX, newY, newVx, newVy] = updatePixelCoords(x, y, vx, vy, vc)
        particles.set([newX, newY, newVx, newVy, newA, newL, ttl, vc, r, g, b], index)
        
        // Only draw pixel if coordinates are within screen bounds
        const pixelX = x | 0
        const pixelY = y | 0
        if (pixelX >= 0 && pixelX < width && pixelY >= 0 && pixelY < height) {
          const i = 4 * (pixelX + pixelY * width)
          
          // Dynamic color evolution based on lifetime and velocity
          const lifeProgress = newL / ttl
          const velocityMag = Math.sqrt(newVx * newVx + newVy * newVy)
          const velocityInfluence = Math.min(velocityMag * 0.08, 1)
          
          // Color evolution: particles get more vibrant as they age and move faster
          const saturationBoost = lifeProgress * 0.4 + velocityInfluence * 0.6
          const brightnessShift = Math.sin(lifeProgress * Math.PI) * 30
          
          // Enhance colors dynamically
          const evolvedR = Math.floor(r * (1 + saturationBoost * 0.3) + brightnessShift + velocityInfluence * 25)
          const evolvedG = Math.floor(g * (1 + saturationBoost * 0.2) + brightnessShift + velocityInfluence * 20)
          const evolvedB = Math.floor(b * (1 + saturationBoost * 0.4) + brightnessShift + velocityInfluence * 30)
          
          fillPixel(imageBuffer, i, [
            Math.min(255, Math.max(0, evolvedR)),
            Math.min(255, Math.max(0, evolvedG)), 
            Math.min(255, Math.max(0, evolvedB)),
            newA
          ])
        }
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
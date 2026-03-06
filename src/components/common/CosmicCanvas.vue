<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  alpha: number
  energy: number
  drift: number
}

type Palette = {
  accent: [number, number, number]
  accent2: [number, number, number]
  line: [number, number, number]
}

const canvasRef = ref<HTMLCanvasElement | null>(null)

const pointer = {
  x: 0,
  y: 0,
  active: false,
}

const pulseAnchor = {
  x: 0,
  y: 0,
}

let context: CanvasRenderingContext2D | null = null
let animationFrame = 0
let width = 0
let height = 0
let dpr = 1
let lastTimestamp = 0
let reducedMotion = false
let particles: Particle[] = []
let themeMode: 'dark' | 'light' = 'dark'
let palette: Palette = {
  accent: [91, 231, 255],
  accent2: [0, 255, 163],
  line: [91, 231, 255],
}

const readRgb = (name: string, fallback: [number, number, number]) => {
  if (typeof window === 'undefined') return fallback

  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  const parts = value
    .split(',')
    .map((item) => Number(item.trim()))
    .filter((item) => Number.isFinite(item))

  if (parts.length !== 3) return fallback
  return [parts[0]!, parts[1]!, parts[2]!] as [number, number, number]
}

const rgba = (rgb: [number, number, number], alpha: number) =>
  `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`

const mixRgb = (source: [number, number, number], target: [number, number, number], amount: number) => [
  Math.round(source[0] + (target[0] - source[0]) * amount),
  Math.round(source[1] + (target[1] - source[1]) * amount),
  Math.round(source[2] + (target[2] - source[2]) * amount),
] as [number, number, number]

const syncPalette = () => {
  themeMode = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark'
  const accent = readRgb('--accent-rgb', [91, 231, 255])
  const accent2Raw = readRgb('--accent-2-rgb', [0, 255, 163])
  const accent2 = themeMode === 'light' ? mixRgb(accent, accent2Raw, 0.16) : accent2Raw
  const line = themeMode === 'light' ? mixRgb(accent, accent2, 0.08) : accent

  palette = {
    accent,
    accent2,
    line,
  }
}

const isLightTheme = () => themeMode === 'light'

const particleCount = () => {
  if (width < 640) return 24
  if (width < 1024) return 34
  return 46
}

const createParticles = () => {
  particles = Array.from({ length: particleCount() }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.32,
    vy: (Math.random() - 0.5) * 0.28,
    size: Math.random() * 2.4 + 0.8,
    alpha: Math.random() * 0.45 + 0.25,
    energy: Math.random() * Math.PI * 2,
    drift: Math.random() * 0.8 + 0.6,
  }))
}

const resizeCanvas = () => {
  const canvas = canvasRef.value
  if (!canvas) return

  width = window.innerWidth
  height = window.innerHeight
  dpr = Math.min(window.devicePixelRatio || 1, 1.5)
  canvas.width = Math.floor(width * dpr)
  canvas.height = Math.floor(height * dpr)
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`

  context = canvas.getContext('2d')
  if (!context) return
  context.setTransform(dpr, 0, 0, dpr, 0, 0)

  if (pulseAnchor.x === 0 && pulseAnchor.y === 0) {
    pulseAnchor.x = width * 0.78
    pulseAnchor.y = height * 0.24
  }

  syncPalette()
  createParticles()
}

const drawGlow = (x: number, y: number, radius: number, color: [number, number, number], alpha: number) => {
  if (!context) return

  const gradient = context.createRadialGradient(x, y, 0, x, y, radius)
  gradient.addColorStop(0, rgba(color, alpha))
  gradient.addColorStop(0.45, rgba(color, alpha * 0.3))
  gradient.addColorStop(1, rgba(color, 0))

  context.fillStyle = gradient
  context.beginPath()
  context.arc(x, y, radius, 0, Math.PI * 2)
  context.fill()
}

const drawAtmosphere = (time: number) => {
  if (!context) return

  context.save()
  context.globalCompositeOperation = 'screen'

  const glowBoost = isLightTheme() ? 1.18 : 1

  drawGlow(width * (0.18 + Math.sin(time * 0.18) * 0.02), height * 0.22, 180, palette.accent2, 0.08 * glowBoost)
  drawGlow(width * 0.84, height * (0.2 + Math.cos(time * 0.22) * 0.03), 220, palette.accent, 0.12 * glowBoost)
  drawGlow(width * 0.52, height * 0.78, 240, palette.accent, 0.05 * glowBoost)

  const orbitX = width * (0.72 + Math.cos(time * 0.11) * 0.035)
  const orbitY = height * (0.28 + Math.sin(time * 0.14) * 0.03)
  drawGlow(orbitX, orbitY, isLightTheme() ? 96 : 112, palette.accent, isLightTheme() ? 0.04 : 0.05)
  drawGlow(orbitX - 90, orbitY + 56, isLightTheme() ? 62 : 74, palette.accent2, isLightTheme() ? 0.028 : 0.035)

  context.restore()
}

const updateParticles = (delta: number, time: number) => {
  const influenceRadius = 170

  for (const particle of particles) {
    particle.energy += 0.012 * particle.drift * delta
    particle.x += particle.vx * delta + Math.cos(particle.energy + time * 0.2) * 0.12
    particle.y += particle.vy * delta + Math.sin(particle.energy) * 0.08

    if (pointer.active) {
      const dx = pointer.x - particle.x
      const dy = pointer.y - particle.y
      const distance = Math.hypot(dx, dy)
      if (distance < influenceRadius && distance > 0) {
        const force = (1 - distance / influenceRadius) * 0.025 * delta
        particle.x -= dx * force
        particle.y -= dy * force
      }
    }

    if (particle.x < -30) particle.x = width + 30
    if (particle.x > width + 30) particle.x = -30
    if (particle.y < -30) particle.y = height + 30
    if (particle.y > height + 30) particle.y = -30
  }
}

const drawLinks = () => {
  if (!context) return

  const maxDistance = width < 768 ? 120 : 150

  context.save()
  context.lineWidth = 1

  for (let i = 0; i < particles.length; i += 1) {
    const source = particles[i]!

    for (let j = i + 1; j < particles.length; j += 1) {
      const target = particles[j]!
      const dx = source.x - target.x
      const dy = source.y - target.y
      const distance = Math.hypot(dx, dy)

      if (distance > maxDistance) continue

      const alpha = (1 - distance / maxDistance) * (isLightTheme() ? 0.26 : 0.22)
      context.strokeStyle = rgba(palette.line, alpha)
      context.beginPath()
      context.moveTo(source.x, source.y)
      context.lineTo(target.x, target.y)
      context.stroke()
    }
  }

  context.restore()
}

const drawParticles = (time: number) => {
  if (!context) return

  context.save()
  context.globalCompositeOperation = 'screen'

  for (const particle of particles) {
    const pulse = 0.65 + Math.sin(time * 1.3 + particle.energy) * 0.35
    const radius = particle.size * (0.9 + pulse * 0.35)
    const color = pulse > 0.72 ? palette.accent2 : palette.accent

    const particleBoost = isLightTheme() ? 1.12 : 1
    context.fillStyle = rgba(color, Math.min(1, particle.alpha * (0.8 + pulse * 0.35) * particleBoost))
    context.beginPath()
    context.arc(particle.x, particle.y, radius, 0, Math.PI * 2)
    context.fill()

    context.fillStyle = rgba(color, isLightTheme() ? 0.1 : 0.08)
    context.beginPath()
    context.arc(particle.x, particle.y, radius * 4.5, 0, Math.PI * 2)
    context.fill()
  }

  context.restore()
}

const drawPulse = (time: number) => {
  if (!context) return

  const targetX = pointer.active ? pointer.x : width * 0.78
  const targetY = pointer.active ? pointer.y : height * 0.24
  const anchorEase = pointer.active ? 0.16 : 0.075

  pulseAnchor.x += (targetX - pulseAnchor.x) * anchorEase
  pulseAnchor.y += (targetY - pulseAnchor.y) * anchorEase

  const anchorX = pulseAnchor.x
  const anchorY = pulseAnchor.y
  const ringCycle = isLightTheme() ? 5.2 : 4.2
  const minRadius = pointer.active ? 16 : 24
  const spread = pointer.active ? 26 : 38

  context.save()
  context.globalCompositeOperation = 'screen'

  drawGlow(anchorX, anchorY, pointer.active ? 22 : 30, palette.accent, isLightTheme() ? 0.038 : 0.05)

  for (let index = 0; index < 3; index += 1) {
    const phase = ((time / ringCycle) + index / 3) % 1
    const eased = phase * phase * (3 - 2 * phase)
    const radius = minRadius + eased * spread
    const alphaBase = (0.16 - index * 0.038) * (isLightTheme() ? 1.06 : 1)
    const alpha = alphaBase * (1 - eased) * (pointer.active ? 0.94 : 1)

    context.strokeStyle = rgba(index % 2 === 0 ? palette.accent : palette.accent2, alpha)
    context.lineWidth = pointer.active ? 1 : 1.1
    context.beginPath()
    context.arc(anchorX, anchorY, radius, 0, Math.PI * 2)
    context.stroke()
  }

  context.strokeStyle = rgba(palette.accent, isLightTheme() ? 0.3 : 0.28)
  context.beginPath()
  context.moveTo(anchorX - 8, anchorY)
  context.lineTo(anchorX + 8, anchorY)
  context.moveTo(anchorX, anchorY - 8)
  context.lineTo(anchorX, anchorY + 8)
  context.stroke()

  context.restore()
}

const renderFrame = (timestamp = 0) => {
  if (!context) return

  const time = timestamp / 1000
  const delta = Math.min((timestamp - lastTimestamp) / 16.666 || 1, 2)
  lastTimestamp = timestamp

  context.clearRect(0, 0, width, height)
  drawAtmosphere(time)
  updateParticles(delta, time)
  drawLinks()
  drawParticles(time)
  drawPulse(time)

  if (!reducedMotion) {
    animationFrame = window.requestAnimationFrame(renderFrame)
  }
}

const handlePointerMove = (event: MouseEvent) => {
  pointer.x = event.clientX
  pointer.y = event.clientY
  pointer.active = true
}

const handlePointerLeave = () => {
  pointer.active = false
}

const handleVisibility = () => {
  if (document.hidden) {
    window.cancelAnimationFrame(animationFrame)
    return
  }

  lastTimestamp = performance.now()
  renderFrame(lastTimestamp)
}

const handleThemeMutation = () => {
  syncPalette()
  if (reducedMotion) {
    renderFrame(performance.now())
  }
}

let themeObserver: MutationObserver | null = null
let mediaQuery: MediaQueryList | null = null
let mediaQueryHandler: ((event: MediaQueryListEvent) => void) | null = null

onMounted(() => {
  if (typeof window === 'undefined') return

  mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  reducedMotion = mediaQuery.matches

  resizeCanvas()
  lastTimestamp = performance.now()
  renderFrame(lastTimestamp)

  window.addEventListener('resize', resizeCanvas, { passive: true })
  window.addEventListener('mousemove', handlePointerMove, { passive: true })
  window.addEventListener('mouseleave', handlePointerLeave)
  document.addEventListener('visibilitychange', handleVisibility)

  mediaQueryHandler = (event) => {
    reducedMotion = event.matches
    window.cancelAnimationFrame(animationFrame)
    lastTimestamp = performance.now()
    renderFrame(lastTimestamp)
  }
  mediaQuery.addEventListener('change', mediaQueryHandler)

  themeObserver = new MutationObserver(handleThemeMutation)
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  })
})

onBeforeUnmount(() => {
  if (typeof window === 'undefined') return

  window.cancelAnimationFrame(animationFrame)
  window.removeEventListener('resize', resizeCanvas)
  window.removeEventListener('mousemove', handlePointerMove)
  window.removeEventListener('mouseleave', handlePointerLeave)
  document.removeEventListener('visibilitychange', handleVisibility)
  if (mediaQuery && mediaQueryHandler) mediaQuery.removeEventListener('change', mediaQueryHandler)
  themeObserver?.disconnect()
})
</script>

<template>
  <canvas ref="canvasRef" class="cosmic-canvas" aria-hidden="true" />
</template>

<style scoped>
.cosmic-canvas {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  opacity: 0.92;
  z-index: 1;
  filter: saturate(1.05);
}

:global([data-theme='light']) .cosmic-canvas {
  opacity: 0.95;
  filter: saturate(1.02) contrast(1.08);
}

@media (max-width: 760px) {
  .cosmic-canvas {
    opacity: 0.82;
  }
}
</style>

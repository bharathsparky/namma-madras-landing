import { useEffect, useRef, useState } from 'react'
import { Renderer, Program, Triangle, Mesh } from 'ogl'
import './LightRays.css'

const DEFAULT_COLOR = '#5eead4'

const hexToRgb = (hex) => {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return m
    ? [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255]
    : [1, 1, 1]
}

const getAnchorAndDir = (origin, w, h) => {
  const outside = 0.2
  switch (origin) {
    case 'top-left':
      return { anchor: [0, -outside * h], dir: [0, 1] }
    case 'top-right':
      return { anchor: [w, -outside * h], dir: [0, 1] }
    case 'left':
      return { anchor: [-outside * w, 0.5 * h], dir: [1, 0] }
    case 'right':
      return { anchor: [(1 + outside) * w, 0.5 * h], dir: [-1, 0] }
    case 'bottom-left':
      return { anchor: [0, (1 + outside) * h], dir: [0, -1] }
    case 'bottom-center':
      return { anchor: [0.5 * w, (1 + outside) * h], dir: [0, -1] }
    case 'bottom-right':
      return { anchor: [w, (1 + outside) * h], dir: [0, -1] }
    default:
      return { anchor: [0.5 * w, -outside * h], dir: [0, 1] }
  }
}

function LightRays({
  raysOrigin = 'top-center',
  raysColor = DEFAULT_COLOR,
  raysSpeed = 0.5,
  lightSpread = 1.85,
  rayLength = 2.75,
  pulsating = false,
  fadeDistance = 1.12,
  saturation = 1.0,
  followMouse = true,
  mouseInfluence = 0.07,
  noiseAmount = 0.035,
  distortion = 0.0,
  className = '',
}) {
  const containerRef = useRef(null)
  const uniformsRef = useRef(null)
  const rendererRef = useRef(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const smoothMouseRef = useRef({ x: 0.5, y: 0.5 })
  const animationIdRef = useRef(null)
  const meshRef = useRef(null)
  const cleanupFunctionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const observerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.01, rootMargin: '80px' },
    )

    observerRef.current.observe(containerRef.current)

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
        observerRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (!isVisible || !containerRef.current) return

    if (cleanupFunctionRef.current) {
      cleanupFunctionRef.current()
      cleanupFunctionRef.current = null
    }

    let cancelled = false

    const initializeWebGL = async () => {
      await new Promise((resolve) => setTimeout(resolve, 10))
      if (cancelled || !containerRef.current) return

      const renderer = new Renderer({
        dpr: Math.min(window.devicePixelRatio, 1.5),
        alpha: true,
        depth: false,
        stencil: false,
        webgl: 1,
      })
      rendererRef.current = renderer

      const gl = renderer.gl
      gl.enable(gl.BLEND)
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

      gl.canvas.style.width = '100%'
      gl.canvas.style.height = '100%'
      gl.canvas.style.display = 'block'

      while (containerRef.current.firstChild) {
        containerRef.current.removeChild(containerRef.current.firstChild)
      }
      containerRef.current.appendChild(gl.canvas)

      const vert = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}`

      const frag = `precision highp float;

uniform float iTime;
uniform vec2  iResolution;

uniform vec2  rayPos;
uniform vec2  rayDir;
uniform vec3  raysColor;
uniform float raysSpeed;
uniform float lightSpread;
uniform float rayLength;
uniform float pulsating;
uniform float fadeDistance;
uniform float saturation;
uniform vec2  mousePos;
uniform float mouseInfluence;
uniform float noiseAmount;
uniform float distortion;

varying vec2 vUv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

/* Soft volumetric cone — avoid sin(cosAngle * large) which creates radial "line" stripes */
float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord, float speedMul) {
  vec2 sourceToCoord = coord - raySource;
  float dist = length(sourceToCoord);
  if (dist < 0.0001) return 0.0;

  vec2 dirNorm = sourceToCoord / dist;
  float cosAngle = dot(dirNorm, rayRefDirection);

  float wobble = distortion * sin(iTime * 2.0 + dist * 0.008) * 0.12;
  float cosSoft = clamp(cosAngle + wobble, 0.0, 1.0);

  float cone = pow(cosSoft, 1.0 / max(lightSpread, 0.08));
  cone = mix(cone, cone * cone, 0.35);

  float maxDistance = iResolution.x * rayLength;
  float lenF = smoothstep(0.0, 1.0, clamp((maxDistance - dist) / maxDistance, 0.0, 1.0));

  float fd = max(iResolution.x * fadeDistance, 1.0);
  float fadeF = smoothstep(0.35, 1.0, clamp((fd - dist) / fd, 0.0, 1.0));

  float pulse = pulsating > 0.5 ? (0.82 + 0.18 * sin(iTime * speedMul * 2.2)) : 1.0;

  float breathe = 0.9 + 0.1 * sin(iTime * speedMul * 0.28 + dist * 0.0012);
  float slow = 0.96 + 0.04 * sin(iTime * speedMul * 0.15 + dist * 0.0004);

  return cone * lenF * fadeF * pulse * breathe * slow;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 coord = vec2(fragCoord.x, iResolution.y - fragCoord.y);
  
  vec2 finalRayDir = rayDir;
  if (mouseInfluence > 0.0) {
    vec2 mouseScreenPos = mousePos * iResolution.xy;
    vec2 mouseDirection = normalize(mouseScreenPos - rayPos);
    finalRayDir = normalize(mix(rayDir, mouseDirection, mouseInfluence));
  }

  float a = rayStrength(rayPos, finalRayDir, coord, 1.4 * raysSpeed);
  float b = rayStrength(rayPos, finalRayDir, coord, 0.85 * raysSpeed);
  float combined = a * 0.58 + b * 0.42;

  vec3 glow = vec3(combined);

  if (noiseAmount > 0.0) {
    float n = noise(coord * 0.008 + iTime * 0.06);
    float n2 = hash(coord * 0.02 + iTime * 0.04);
    float grain = mix(n, n2, 0.5);
    glow *= (1.0 - noiseAmount * 0.85 + noiseAmount * 0.85 * grain);
  }

  float vy = coord.y / max(iResolution.y, 1.0);
  float brightness = 1.0 - vy;
  glow.r *= 0.14 + brightness * 0.78;
  glow.g *= 0.35 + brightness * 0.58;
  glow.b *= 0.48 + brightness * 0.48;

  if (saturation != 1.0) {
    float gray = dot(glow, vec3(0.299, 0.587, 0.114));
    glow = mix(vec3(gray), glow, saturation);
  }

  fragColor = vec4(glow * raysColor, combined);
}

void main() {
  vec4 color;
  mainImage(color, gl_FragCoord.xy);
  gl_FragColor = color;
}`

      const uniforms = {
        iTime: { value: 0 },
        iResolution: { value: [1, 1] },

        rayPos: { value: [0, 0] },
        rayDir: { value: [0, 1] },

        raysColor: { value: hexToRgb(raysColor) },
        raysSpeed: { value: raysSpeed },
        lightSpread: { value: lightSpread },
        rayLength: { value: rayLength },
        pulsating: { value: pulsating ? 1.0 : 0.0 },
        fadeDistance: { value: fadeDistance },
        saturation: { value: saturation },
        mousePos: { value: [0.5, 0.5] },
        mouseInfluence: { value: mouseInfluence },
        noiseAmount: { value: noiseAmount },
        distortion: { value: distortion },
      }
      uniformsRef.current = uniforms

      const geometry = new Triangle(gl)
      const program = new Program(gl, {
        vertex: vert,
        fragment: frag,
        uniforms,
        transparent: true,
        cullFace: null,
        depthTest: false,
        depthWrite: false,
      })
      const mesh = new Mesh(gl, { geometry, program, frustumCulled: false })
      meshRef.current = mesh

      const updatePlacement = () => {
        if (!containerRef.current || !renderer) return

        renderer.dpr = Math.min(window.devicePixelRatio, 1.5)

        const { clientWidth: wCSS, clientHeight: hCSS } = containerRef.current
        renderer.setSize(wCSS, hCSS)

        const dpr = renderer.dpr
        const w = wCSS * dpr
        const h = hCSS * dpr

        uniforms.iResolution.value = [w, h]

        const { anchor, dir } = getAnchorAndDir(raysOrigin, w, h)
        uniforms.rayPos.value = anchor
        uniforms.rayDir.value = dir
      }

      const loop = (t) => {
        if (!rendererRef.current || !uniformsRef.current || !meshRef.current) {
          return
        }

        const uniforms = uniformsRef.current
        uniforms.iTime.value = t * 0.001

        if (followMouse && mouseInfluence > 0.0) {
          const smoothing = 0.92

          smoothMouseRef.current.x =
            smoothMouseRef.current.x * smoothing + mouseRef.current.x * (1 - smoothing)
          smoothMouseRef.current.y =
            smoothMouseRef.current.y * smoothing + mouseRef.current.y * (1 - smoothing)

          uniforms.mousePos.value = [smoothMouseRef.current.x, smoothMouseRef.current.y]
        }

        try {
          renderer.render({ scene: mesh })
          animationIdRef.current = requestAnimationFrame(loop)
        } catch (error) {
          console.warn('WebGL rendering error:', error)
        }
      }

      window.addEventListener('resize', updatePlacement)
      updatePlacement()
      if (!cancelled) {
        animationIdRef.current = requestAnimationFrame(loop)
      }

      cleanupFunctionRef.current = () => {
        if (animationIdRef.current) {
          cancelAnimationFrame(animationIdRef.current)
          animationIdRef.current = null
        }

        window.removeEventListener('resize', updatePlacement)

        if (renderer) {
          try {
            const canvas = renderer.gl.canvas
            const loseContextExt = renderer.gl.getExtension('WEBGL_lose_context')
            if (loseContextExt) {
              loseContextExt.loseContext()
            }

            if (canvas && canvas.parentNode) {
              canvas.parentNode.removeChild(canvas)
            }
          } catch (error) {
            console.warn('Error during WebGL cleanup:', error)
          }
        }

        rendererRef.current = null
        uniformsRef.current = null
        meshRef.current = null
      }
    }

    initializeWebGL()

    return () => {
      cancelled = true
      if (cleanupFunctionRef.current) {
        cleanupFunctionRef.current()
        cleanupFunctionRef.current = null
      }
    }
  }, [
    isVisible,
    raysOrigin,
    raysColor,
    raysSpeed,
    lightSpread,
    rayLength,
    pulsating,
    fadeDistance,
    saturation,
    followMouse,
    mouseInfluence,
    noiseAmount,
    distortion,
  ])

  useEffect(() => {
    if (!uniformsRef.current || !containerRef.current || !rendererRef.current) return

    const u = uniformsRef.current
    const renderer = rendererRef.current

    u.raysColor.value = hexToRgb(raysColor)
    u.raysSpeed.value = raysSpeed
    u.lightSpread.value = lightSpread
    u.rayLength.value = rayLength
    u.pulsating.value = pulsating ? 1.0 : 0.0
    u.fadeDistance.value = fadeDistance
    u.saturation.value = saturation
    u.mouseInfluence.value = mouseInfluence
    u.noiseAmount.value = noiseAmount
    u.distortion.value = distortion

    const { clientWidth: wCSS, clientHeight: hCSS } = containerRef.current
    const dpr = renderer.dpr
    const { anchor, dir } = getAnchorAndDir(raysOrigin, wCSS * dpr, hCSS * dpr)
    u.rayPos.value = anchor
    u.rayDir.value = dir
  }, [
    raysColor,
    raysSpeed,
    lightSpread,
    raysOrigin,
    rayLength,
    pulsating,
    fadeDistance,
    saturation,
    mouseInfluence,
    noiseAmount,
    distortion,
  ])

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current || !rendererRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      mouseRef.current = { x, y }
    }

    if (followMouse) {
      window.addEventListener('mousemove', handleMouseMove)
      return () => window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [followMouse])

  return <div ref={containerRef} className={`light-rays-container ${className}`.trim()} />
}

export default LightRays
export { LightRays }

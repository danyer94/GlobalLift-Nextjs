'use client'

import React, { useEffect, useRef } from 'react'
import { Globe2 } from 'lucide-react'

const locations = [
  { name: 'New York', lat: 40.7128, lng: -74.0060 },
  { name: 'London', lat: 51.5074, lng: -0.1278 },
  { name: 'Dubai', lat: 25.2048, lng: 55.2708 },
  { name: 'Singapore', lat: 1.3521, lng: 103.8198 },
  { name: 'Hong Kong', lat: 22.3193, lng: 114.1694 },
  { name: 'Tokyo', lat: 35.6762, lng: 139.6503 },
  { name: 'Sydney', lat: -33.8688, lng: 151.2093 },
  { name: 'São Paulo', lat: -23.5505, lng: -46.6333 }
]

export default function GlobalPresence() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const setCanvasSize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    // Convert lat/lng to x/y coordinates
    const projectPoint = (lat: number, lng: number) => {
      const x = (lng + 180) * (canvas.width / window.devicePixelRatio / 360)
      const y = ((-lat + 90) / 180) * (canvas.height / window.devicePixelRatio)
      return { x, y }
    }

    let frame = 0
    const animate = () => {
      frame++
      ctx.clearRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio)

      // Draw connections with gradient
      locations.forEach((loc1, i) => {
        const point1 = projectPoint(loc1.lat, loc1.lng)
        locations.forEach((loc2, j) => {
          if (i < j) {
            const point2 = projectPoint(loc2.lat, loc2.lng)
            
            // Create curved lines
            ctx.beginPath()
            const controlPoint = {
              x: (point1.x + point2.x) / 2,
              y: (point1.y + point2.y) / 2 - Math.min(150, Math.abs(point1.x - point2.x) / 2)
            }
            ctx.moveTo(point1.x, point1.y)
            ctx.quadraticCurveTo(controlPoint.x, controlPoint.y, point2.x, point2.y)
            
            // Animated gradient
            const gradient = ctx.createLinearGradient(point1.x, point1.y, point2.x, point2.y)
            const alpha1 = 0.15 + Math.sin(frame * 0.02 + i) * 0.1
            const alpha2 = 0.15 + Math.sin(frame * 0.02 + j) * 0.1
            gradient.addColorStop(0, `rgba(183, 147, 74, ${alpha1})`)
            gradient.addColorStop(0.5, 'rgba(183, 147, 74, 0.3)')
            gradient.addColorStop(1, `rgba(183, 147, 74, ${alpha2})`)
            
            ctx.strokeStyle = gradient
            ctx.lineWidth = 1.5
            ctx.stroke()

            // Animated particles along the line
            const particleCount = 3
            for (let p = 0; p < particleCount; p++) {
              const t = (frame * 0.005 + p / particleCount) % 1
              const x = Math.pow(1 - t, 2) * point1.x + 2 * (1 - t) * t * controlPoint.x + Math.pow(t, 2) * point2.x
              const y = Math.pow(1 - t, 2) * point1.y + 2 * (1 - t) * t * controlPoint.y + Math.pow(t, 2) * point2.y
              
              ctx.beginPath()
              ctx.arc(x, y, 1.5, 0, Math.PI * 2)
              ctx.fillStyle = `rgba(183, 147, 74, ${0.8 - t})`
              ctx.fill()
            }
          }
        })
      })

      // Draw points and labels
      locations.forEach((loc, index) => {
        const point = projectPoint(loc.lat, loc.lng)
        
        // Outer glow
        const glowGradient = ctx.createRadialGradient(
          point.x, point.y, 2,
          point.x, point.y, 30
        )
        glowGradient.addColorStop(0, `rgba(183, 147, 74, ${0.3 + Math.sin(frame * 0.05 + index) * 0.2})`)
        glowGradient.addColorStop(0.5, `rgba(183, 147, 74, ${0.1 + Math.sin(frame * 0.05 + index) * 0.1})`)
        glowGradient.addColorStop(1, 'rgba(183, 147, 74, 0)')
        ctx.beginPath()
        ctx.arc(point.x, point.y, 30, 0, Math.PI * 2)
        ctx.fillStyle = glowGradient
        ctx.fill()
        
        // Animated rings
        const ringCount = 2
        for (let i = 0; i < ringCount; i++) {
          const progress = (frame * 0.02 + i / ringCount) % 1
          const radius = progress * 20
          const alpha = 1 - progress
          
          ctx.beginPath()
          ctx.arc(point.x, point.y, radius, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(183, 147, 74, ${alpha * 0.5})`
          ctx.lineWidth = 2
          ctx.stroke()
        }
        
        // Center point with inner glow
        const centerGradient = ctx.createRadialGradient(
          point.x, point.y, 0,
          point.x, point.y, 6
        )
        centerGradient.addColorStop(0, '#B7934A')
        centerGradient.addColorStop(1, 'rgba(183, 147, 74, 0.6)')
        ctx.beginPath()
        ctx.arc(point.x, point.y, 6, 0, Math.PI * 2)
        ctx.fillStyle = centerGradient
        ctx.fill()

        // City name with enhanced styling
        ctx.font = '600 13px Inter'
        ctx.textAlign = 'center'
        
        // Text shadow for depth
        ctx.fillStyle = 'rgba(0, 0, 0, 0.6)'
        ctx.fillText(loc.name, point.x + 1, point.y + 25)
        ctx.fillText(loc.name, point.x - 1, point.y + 25)
        ctx.fillText(loc.name, point.x, point.y + 24)
        ctx.fillText(loc.name, point.x, point.y + 26)
        
        // Main text
        ctx.fillStyle = '#F3F4F6'
        ctx.fillText(loc.name, point.x, point.y + 25)
      })

      requestAnimationFrame(animate)
    }
    animate()

    // Parallax effect on map background
    if (mapRef.current) {
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e
        const { innerWidth, innerHeight } = window
        const moveX = (clientX - innerWidth / 2) * 0.01
        const moveY = (clientY - innerHeight / 2) * 0.01
        mapRef.current!.style.transform = `translate(${moveX}px, ${moveY}px)`
      }
      
      window.addEventListener('mousemove', handleMouseMove)
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('resize', setCanvasSize)
      }
    }
  }, [])

  return (
    <section id="global-presence" className="section-padding bg-[#0B1437] relative overflow-hidden">
      {/* Imagen de la Tierra de fondo desde internet */}
      <div className="absolute inset-0">
        {/* <Image
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
          alt="Earth Background"
          fill
          className="object-cover"
          priority
        /> */}
      </div>

      {/* Ambient background effects adicionales, si se requieren */}
      <div className="absolute inset-0 opacity-[0.15] mix-blend-soft-light"></div>
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center gap-2 mb-4">
            <Globe2 className="w-8 h-8 text-[#B7934A]" />
            <h2 className="heading-secondary">
              Global <span className="text-[#B7934A] relative">
                Presence
                <span className="absolute -bottom-2 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#B7934A] to-transparent"></span>
              </span>
            </h2>
          </div>
          <p className="paragraph max-w-2xl mx-auto">
            With strategic locations across major trade hubs, we ensure seamless
            operations and efficient service delivery worldwide.
          </p>
        </div>

        {/* Map Container */}
        <div className="relative aspect-[2/1] mb-16 rounded-xl p-4 overflow-hidden bg-gradient-to-b from-[#0B1437]/80 to-[#0B1437]/40 backdrop-blur-sm border border-white/5">
          {/* Animación sutil (opcional) */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1E3A8A]/5 to-transparent animate-pulse"></div>
          
          {/* Contenedor con efecto parallax */}
          <div ref={mapRef} className="absolute inset-0 transition-transform duration-200 ease-out">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1437] via-[#0B1437]/30 to-transparent opacity-60"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#0B1437] via-transparent to-[#0B1437] opacity-40"></div>
          </div>
          
          {/* Capa interactiva (canvas para locaciones y conexiones) */}
          <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full world-map-animation"
            />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { value: '8+', label: 'Global Offices' },
            { value: '150+', label: 'Countries Served' },
            { value: '1000+', label: 'Trade Partners' },
            { value: '24/7', label: 'Support Available' }
          ].map((stat, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-white/[0.08] to-transparent backdrop-blur-sm rounded-xl p-6 text-center transform hover:scale-105 transition-all duration-300 border border-white/5 hover:border-[#B7934A]/20"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#B7934A]/0 via-[#B7934A]/5 to-[#B7934A]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              <div className="relative">
                <div className="text-3xl font-bold text-[#B7934A] mb-2">{stat.value}</div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 

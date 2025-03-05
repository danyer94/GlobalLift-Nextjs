'use client'

import React, { useEffect, useRef } from 'react'
import { ArrowRight, Globe } from 'lucide-react'

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    // Points for the world map
    const points = [
      { x: 0.2, y: 0.3 }, { x: 0.4, y: 0.2 }, { x: 0.6, y: 0.25 },
      { x: 0.3, y: 0.4 }, { x: 0.5, y: 0.35 }, { x: 0.7, y: 0.3 },
      { x: 0.25, y: 0.5 }, { x: 0.45, y: 0.45 }, { x: 0.65, y: 0.4 },
      { x: 0.8, y: 0.35 }, { x: 0.35, y: 0.6 }, { x: 0.55, y: 0.55 }
    ]

    // Animation
    let frame = 0
    const animate = () => {
      frame++
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw points and connections
      points.forEach((point, i) => {
        const x = point.x * canvas.width
        const y = point.y * canvas.height
        
        // Draw point
        ctx.beginPath()
        ctx.arc(x, y, 2, 0, Math.PI * 2)
        ctx.fillStyle = '#B7934A'
        ctx.fill()
        
        // Draw connections
        points.forEach((otherPoint, j) => {
          if (i !== j) {
            const distance = Math.hypot(
              otherPoint.x * canvas.width - x,
              otherPoint.y * canvas.height - y
            )
            if (distance < canvas.width * 0.2) {
              ctx.beginPath()
              ctx.moveTo(x, y)
              ctx.lineTo(otherPoint.x * canvas.width, otherPoint.y * canvas.height)
              ctx.strokeStyle = `rgba(183, 147, 74, ${0.1 + Math.sin(frame * 0.02) * 0.05})`
              ctx.stroke()
            }
          }
        })
      })
      
      requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', setCanvasSize)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-30"
      />
      
      {/* Content */}
      <div className="container-custom relative z-10">
        <div className="max-w-3xl">
          <h1 className="heading-primary mb-6 animate-float">
            Global Trade Excellence in
            <span className="text-[#B7934A]"> Import & Export</span>
          </h1>
          <p className="paragraph mb-8 text-xl">
            Connecting businesses worldwide with premium logistics solutions, 
            cutting-edge technology, and unparalleled expertise in international trade.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#contact" className="btn-primary">
              Start Your Journey
              <ArrowRight className="w-5 h-5" />
            </a>
            <a href="#services" className="px-8 py-3 border border-[#B7934A] text-[#B7934A] 
              font-semibold rounded-lg hover:bg-[#B7934A] hover:text-white 
              transition-colors duration-300 inline-flex items-center gap-2">
              Explore Services
              <Globe className="w-5 h-5" />
            </a>
          </div>
          
          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#B7934A] mb-2">150+</div>
              <div className="text-gray-300">Countries Served</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#B7934A] mb-2">$2.5B+</div>
              <div className="text-gray-300">Annual Trade Volume</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#B7934A] mb-2">98%</div>
              <div className="text-gray-300">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0B1437] to-transparent" />
    </section>
  )
} 
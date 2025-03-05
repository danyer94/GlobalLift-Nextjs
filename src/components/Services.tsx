'use client'

import React, { useState } from 'react'
import { Ship, Plane, Building2, FileText, BarChart3, Shield } from 'lucide-react'

const services = [
  {
    icon: Ship,
    title: 'Ocean Freight',
    description: 'Global sea freight solutions with real-time tracking and optimal routing for your cargo.',
    features: ['Container shipping', 'Bulk cargo', 'Port-to-port service', 'Custom routing']
  },
  {
    icon: Plane,
    title: 'Air Freight',
    description: 'Express air freight services ensuring rapid delivery for time-sensitive shipments.',
    features: ['Next-day delivery', 'Charter services', 'Temperature control', 'Priority handling']
  },
  {
    icon: Building2,
    title: 'Warehousing',
    description: 'State-of-the-art warehousing facilities with advanced inventory management.',
    features: ['Climate control', '24/7 security', 'Inventory tracking', 'Distribution services']
  },
  {
    icon: FileText,
    title: 'Customs Clearance',
    description: 'Expert handling of customs documentation and regulatory compliance.',
    features: ['Documentation support', 'Duty calculation', 'Compliance checks', 'Fast clearance']
  },
  {
    icon: BarChart3,
    title: 'Trade Consulting',
    description: 'Strategic consulting services for optimizing your international trade operations.',
    features: ['Market analysis', 'Risk assessment', 'Trade compliance', 'Cost optimization']
  },
  {
    icon: Shield,
    title: 'Cargo Insurance',
    description: 'Comprehensive insurance coverage for your valuable shipments worldwide.',
    features: ['All-risk coverage', 'Claims support', 'Real-time monitoring', 'Value protection']
  }
]

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="services" className="section-padding bg-gradient-to-b from-[#0B1437] to-[#1E3A8A]">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="heading-secondary mb-4">
            Comprehensive <span className="text-[#B7934A]">Import/Export</span> Solutions
          </h2>
          <p className="paragraph max-w-2xl mx-auto">
            From ocean freight to strategic consulting, we provide end-to-end solutions
            tailored to your international trade needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div
                key={service.title}
                className={`bg-white/5 backdrop-blur-sm rounded-xl p-6 transition-all duration-300 
                  ${hoveredIndex === index ? 'transform -translate-y-2' : ''}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <Icon className="w-12 h-12 text-[#B7934A] mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                <p className="text-gray-300 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="text-gray-400 flex items-center">
                      <span className="w-1.5 h-1.5 bg-[#B7934A] rounded-full mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
} 
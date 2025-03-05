'use client'

import React, { useState, useEffect } from 'react'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Chen',
    position: 'Supply Chain Director',
    company: 'TechGlobal Industries',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80',
    quote: 'Their expertise in global logistics has transformed our supply chain efficiency. We\'ve seen remarkable improvements in delivery times and cost savings.',
    rating: 5
  },
  {
    name: 'Michael Rodriguez',
    position: 'Operations Manager',
    company: 'AutoParts International',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80',
    quote: 'The level of professionalism and attention to detail sets them apart. Our automotive parts distribution has never been more reliable.',
    rating: 5
  },
  {
    name: 'Emma Thompson',
    position: 'Logistics Director',
    company: 'PharmaCare Global',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80',
    quote: 'Their cold chain solutions have been crucial for our pharmaceutical shipments. The temperature monitoring and tracking systems are exceptional.',
    rating: 5
  }
]

const companyLogos = [
  {
    name: 'Tech Global',
    image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80'
  },
  {
    name: 'AutoParts International',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80'
  },
  {
    name: 'PharmaCare Global',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80'
  },
  {
    name: 'Logistics Pro',
    image: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&q=80'
  },
  {
    name: 'Global Trade Co',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80'
  },
  {
    name: 'International Shipping',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80'
  }
]

export default function ClientPortfolio() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="clients" className="section-padding bg-[#0B1437]">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="heading-secondary mb-4">
            Trusted by <span className="text-[#B7934A]">Industry Leaders</span>
          </h2>
          <p className="paragraph max-w-2xl mx-auto">
            We're proud to work with Fortune 500 companies and industry leaders
            who trust us with their global trade operations.
          </p>
        </div>

        {/* Testimonials */}
        <div className="mb-20">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Quote Icon */}
              <Quote className="absolute -top-8 -left-8 w-16 h-16 text-[#B7934A] opacity-20" />
              
              {/* Testimonial */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={testimonials[activeTestimonial].image}
                      alt={testimonials[activeTestimonial].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-[#B7934A] fill-current" />
                      ))}
                    </div>
                    <blockquote className="text-xl text-gray-300 italic mb-4">
                      "{testimonials[activeTestimonial].quote}"
                    </blockquote>
                    <div className="text-white font-semibold">
                      {testimonials[activeTestimonial].name}
                    </div>
                    <div className="text-[#B7934A]">
                      {testimonials[activeTestimonial].position}
                    </div>
                    <div className="text-gray-400">
                      {testimonials[activeTestimonial].company}
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Dots */}
              <div className="flex justify-center gap-2 mt-6">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 
                      ${index === activeTestimonial ? 'bg-[#B7934A]' : 'bg-gray-600 hover:bg-gray-500'}`}
                    aria-label={`View testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Company Logos */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {companyLogos.map((company) => (
            <div
              key={company.name}
              className="bg-white/5 backdrop-blur-sm rounded-lg p-6 flex items-center justify-center
                transform transition-transform duration-300 hover:scale-105"
            >
              <img
                src={company.image}
                alt={company.name}
                className="w-full h-12 object-contain filter grayscale hover:grayscale-0 
                  transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 
'use client'

import { useState } from 'react'
import { ArrowRight, TrendingUp, Clock, DollarSign } from 'lucide-react'
import Image from 'next/image'

const caseStudies = [
  {
    title: 'Global Electronics Supply Chain Optimization',
    client: 'Fortune 500 Tech Company',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80',
    metrics: {
      savings: '32%',
      timeReduction: '45%',
      efficiency: '89%'
    },
    description: 'Revolutionized the supply chain for a leading technology company, reducing costs and delivery times while improving reliability.',
    results: [
      'Reduced shipping costs by 32%',
      'Decreased transit time by 45%',
      'Improved delivery reliability to 99.9%',
      'Implemented real-time tracking system'
    ]
  },
  {
    title: 'Automotive Parts Distribution Network',
    client: 'Major European Auto Manufacturer',
    image: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&q=80',
    metrics: {
      savings: '28%',
      timeReduction: '35%',
      efficiency: '94%'
    },
    description: 'Established an efficient distribution network for automotive parts across 25 countries, enhancing delivery speed and reliability.',
    results: [
      'Created hub-and-spoke distribution model',
      'Reduced inventory holding costs by 28%',
      'Improved order fulfillment rate to 99%',
      'Implemented predictive analytics system'
    ]
  },
  {
    title: 'Pharmaceutical Cold Chain Solution',
    client: 'Leading Pharma Corporation',
    image: 'https://images.unsplash.com/photo-1563213126-a4273aed2016?auto=format&fit=crop&q=80',
    metrics: {
      savings: '25%',
      timeReduction: '40%',
      efficiency: '99%'
    },
    description: 'Developed a temperature-controlled logistics solution for sensitive pharmaceutical products across global markets.',
    results: [
      'Maintained 100% temperature compliance',
      'Reduced transportation costs by 25%',
      'Implemented IoT monitoring system',
      'Achieved zero product loss rate'
    ]
  }
]

export default function CaseStudies() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section id="case-studies" className="section-padding bg-gradient-to-b from-[#1E3A8A] to-[#0B1437]">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="heading-secondary mb-4">
            Success <span className="text-[#B7934A]">Stories</span>
          </h2>
          <p className="paragraph max-w-2xl mx-auto">
            Discover how we&apos;ve helped leading companies optimize their global trade operations
            and achieve remarkable results.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Case Study Image */}
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
            <Image
              src={caseStudies[activeIndex].image}
              alt={caseStudies[activeIndex].title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1437] via-transparent to-transparent" />
          </div>

          {/* Case Study Content */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">
              {caseStudies[activeIndex].title}
            </h3>
            <p className="text-[#B7934A] font-semibold mb-4">
              {caseStudies[activeIndex].client}
            </p>
            <p className="paragraph mb-6">
              {caseStudies[activeIndex].description}
            </p>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4">
                <DollarSign className="w-6 h-6 text-[#B7934A] mb-2" />
                <div className="text-2xl font-bold text-white">
                  {caseStudies[activeIndex].metrics.savings}
                </div>
                <div className="text-sm text-gray-400">Cost Savings</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4">
                <Clock className="w-6 h-6 text-[#B7934A] mb-2" />
                <div className="text-2xl font-bold text-white">
                  {caseStudies[activeIndex].metrics.timeReduction}
                </div>
                <div className="text-sm text-gray-400">Time Reduced</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4">
                <TrendingUp className="w-6 h-6 text-[#B7934A] mb-2" />
                <div className="text-2xl font-bold text-white">
                  {caseStudies[activeIndex].metrics.efficiency}
                </div>
                <div className="text-sm text-gray-400">Efficiency</div>
              </div>
            </div>

            {/* Results */}
            <ul className="space-y-3 mb-8">
              {caseStudies[activeIndex].results.map((result, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-300">
                  <ArrowRight className="w-5 h-5 text-[#B7934A] mt-1 flex-shrink-0" />
                  {result}
                </li>
              ))}
            </ul>

            {/* Navigation Dots */}
            <div className="flex gap-2">
              {caseStudies.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 
                    ${index === activeIndex ? 'bg-[#B7934A]' : 'bg-gray-600 hover:bg-gray-500'}`}
                  aria-label={`View case study ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 

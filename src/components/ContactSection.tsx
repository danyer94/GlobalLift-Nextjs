'use client'

import React, { useState } from 'react'
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react'

export default function ContactSection() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus('submitting')
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    setFormStatus('success')
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormStatus('idle')
      setFormData({ name: '', email: '', company: '', message: '' })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <section id="contact" className="section-padding bg-gradient-to-b from-[#0B1437] to-[#1E3A8A]">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="heading-secondary mb-4">
            Get in <span className="text-[#B7934A]">Touch</span>
          </h2>
          <p className="paragraph max-w-2xl mx-auto">
            Ready to optimize your global trade operations? Contact us today for a
            personalized consultation with our expert team.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-white mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 
                    text-white placeholder-gray-400 focus:outline-none focus:border-[#B7934A] 
                    transition-colors"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-white mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 
                    text-white placeholder-gray-400 focus:outline-none focus:border-[#B7934A] 
                    transition-colors"
                  placeholder="john@company.com"
                />
              </div>
              
              <div>
                <label htmlFor="company" className="block text-white mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 
                    text-white placeholder-gray-400 focus:outline-none focus:border-[#B7934A] 
                    transition-colors"
                  placeholder="Company Ltd."
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-white mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 
                    text-white placeholder-gray-400 focus:outline-none focus:border-[#B7934A] 
                    transition-colors resize-none"
                  placeholder="Tell us about your needs..."
                />
              </div>
              
              <button
                type="submit"
                disabled={formStatus !== 'idle'}
                className={`w-full py-4 rounded-lg font-semibold flex items-center justify-center gap-2
                  transition-all duration-300 ${
                    formStatus === 'success'
                      ? 'bg-green-600 hover:bg-green-700'
                      : formStatus === 'submitting'
                      ? 'bg-[#B7934A]/70 cursor-not-allowed'
                      : 'bg-[#B7934A] hover:bg-[#9A7B3E]'
                  }`}
              >
                {formStatus === 'success' ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Message Sent!
                  </>
                ) : formStatus === 'submitting' ? (
                  'Sending...'
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8">
              <h3 className="text-xl font-semibold text-white mb-6">
                Contact Information
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-[#B7934A] mt-1" />
                  <div>
                    <div className="font-medium text-white">Email</div>
                    <a href="mailto:contact@globaltrade.com" className="text-gray-300 hover:text-[#B7934A] transition-colors">
                      contact@globaltrade.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-[#B7934A] mt-1" />
                  <div>
                    <div className="font-medium text-white">Phone</div>
                    <a href="tel:+1234567890" className="text-gray-300 hover:text-[#B7934A] transition-colors">
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-[#B7934A] mt-1" />
                  <div>
                    <div className="font-medium text-white">Address</div>
                    <address className="text-gray-300 not-italic">
                      123 Global Trade Plaza<br />
                      New York, NY 10001<br />
                      United States
                    </address>
                  </div>
                </div>
              </div>
            </div>

            {/* Office Hours */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8">
              <h3 className="text-xl font-semibold text-white mb-4">
                Office Hours
              </h3>
              <div className="space-y-2 text-gray-300">
                <div className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span>9:00 AM - 6:00 PM EST</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span>10:00 AM - 2:00 PM EST</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 
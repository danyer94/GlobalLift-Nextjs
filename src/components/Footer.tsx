'use client'

import React from 'react'
import Link from 'next/link'
import { Facebook, Twitter, Linkedin, Instagram, Globe } from 'lucide-react'

const navigation = {
  company: [
    { name: 'About Us', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'News', href: '#' },
    { name: 'Press', href: '#' }
  ],
  services: [
    { name: 'Ocean Freight', href: '#services' },
    { name: 'Air Freight', href: '#services' },
    { name: 'Warehousing', href: '#services' },
    { name: 'Customs Clearance', href: '#services' }
  ],
  support: [
    { name: 'Contact', href: '#contact' },
    { name: 'FAQ', href: '#' },
    { name: 'Terms', href: '#' },
    { name: 'Privacy', href: '#' }
  ],
  social: [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' }
  ]
}

export default function Footer() {
  return (
    <footer className="bg-[#0B1437] border-t border-white/10">
      <div className="container-custom py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-16">
          {/* Logo and Description */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Globe className="h-8 w-8 text-[#B7934A]" />
              <span className="text-xl font-bold text-white">GlobalTrade</span>
            </Link>
            <p className="text-gray-400 mb-4">
              Your trusted partner in global trade and logistics solutions.
              Connecting businesses worldwide with excellence.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-[#B7934A] transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {navigation.services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-[#B7934A] transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {navigation.support.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-[#B7934A] transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-gray-400">
              © {new Date().getFullYear()} GlobalTrade. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {navigation.social.map((item) => {
                const Icon = item.icon
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-400 hover:text-[#B7934A] transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="sr-only">{item.name}</span>
                    <Icon className="h-6 w-6" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 
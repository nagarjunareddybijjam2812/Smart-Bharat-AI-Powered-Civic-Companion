'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, MapPin, Navigation, Search, Phone, Clock } from 'lucide-react'

const offices = [
  { name: 'District Collector Office', type: 'Revenue', distance: '1.2 km', phone: '080-22250000', hours: 'Mon-Fri 10AM-5PM', lat: 12.9716, lng: 77.5946 },
  { name: 'RTO Office', type: 'Transport', distance: '2.8 km', phone: '080-23456789', hours: 'Mon-Sat 9AM-4PM', lat: 12.9600, lng: 77.6100 },
  { name: 'Passport Seva Kendra', type: 'Civil', distance: '3.5 km', phone: '1800-258-1800', hours: 'Mon-Fri 9AM-5PM', lat: 12.9800, lng: 77.5900 },
  { name: 'Sub-Registrar Office', type: 'Revenue', distance: '4.1 km', phone: '080-22334455', hours: 'Mon-Fri 10AM-4PM', lat: 12.9500, lng: 77.5800 },
]

export default function MapPage() {
  return (
    <div className="min-h-screen">
      <div className="glass-nav sticky top-0 z-40 px-4 py-3">
        <div className="flex items-center gap-3 mb-3">
          <Link href="/dashboard" className="glass p-2 rounded-xl text-on-surface-variant hover:text-on-surface transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="text-on-surface font-semibold flex-1">Smart Map</h1>
          <button className="glass p-2 rounded-xl text-primary" aria-label="My location">
            <Navigation className="w-4 h-4" />
          </button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/50" />
          <input placeholder="Search offices, services..." className="input-glass pl-10 text-sm" aria-label="Search offices" />
        </div>
      </div>

      {/* Map placeholder */}
      <div className="relative h-64 glass-card flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(0,82,204,0.3) 0%, rgba(132,56,162,0.2) 100%)' }} />
        <div className="relative text-center">
          <MapPin className="w-12 h-12 text-primary mx-auto mb-3 animate-bounce" />
          <p className="text-on-surface font-semibold">Interactive Map</p>
          <p className="text-on-surface-variant text-xs mt-1">Google Maps integration ready</p>
          <p className="text-xs text-primary mt-2">Set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to enable</p>
        </div>
        {/* Decorative dots */}
        {offices.map((_, i) => (
          <div key={i} className="absolute w-4 h-4 rounded-full bg-primary shadow-glow-primary animate-pulse"
            style={{ top: `${20 + i * 15}%`, left: `${20 + i * 20}%` }} />
        ))}
      </div>

      <main className="px-4 py-4 max-w-2xl mx-auto">
        <h2 className="text-on-surface font-semibold text-sm mb-3">Nearby Government Offices</h2>
        <div className="space-y-3">
          {offices.map((office, i) => (
            <motion.div
              key={office.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass-card rounded-2xl p-4"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <h3 className="text-on-surface font-semibold text-sm">{office.name}</h3>
                  <span className="badge-info text-[10px] mt-1">{office.type}</span>
                </div>
                <span className="text-primary text-xs font-semibold flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {office.distance}
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-on-surface-variant">
                <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {office.phone}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {office.hours}</span>
              </div>
              <button className="btn-ghost text-xs py-1.5 px-4 mt-3">Get Directions</button>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  )
}

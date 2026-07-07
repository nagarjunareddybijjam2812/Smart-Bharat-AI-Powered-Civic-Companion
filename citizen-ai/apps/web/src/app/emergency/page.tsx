'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Phone, AlertTriangle, Flame, Zap, Heart, Shield } from 'lucide-react'

const emergencyNumbers = [
  { icon: Shield, label: 'Police', number: '100', color: '#0052cc', glow: 'rgba(0,82,204,0.5)' },
  { icon: Flame, label: 'Fire', number: '101', color: '#ff4444', glow: 'rgba(255,68,68,0.5)' },
  { icon: Heart, label: 'Ambulance', number: '108', color: '#02c953', glow: 'rgba(2,201,83,0.5)' },
  { icon: AlertTriangle, label: 'Disaster', number: '1078', color: '#ff9800', glow: 'rgba(255,152,0,0.5)' },
  { icon: Zap, label: 'Electricity', number: '1912', color: '#edb1ff', glow: 'rgba(237,177,255,0.4)' },
  { icon: Phone, label: 'Women Helpline', number: '1091', color: '#8438a2', glow: 'rgba(132,56,162,0.5)' },
]

export default function EmergencyPage() {
  return (
    <div className="min-h-screen">
      <div className="glass-nav sticky top-0 z-40 px-4 py-3">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="glass p-2 rounded-xl text-on-surface-variant hover:text-on-surface transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="text-on-surface font-semibold flex-1">Emergency Services</h1>
        </div>
      </div>

      <main className="px-4 py-6 max-w-2xl mx-auto">
        <div className="glass-card-raised rounded-2xl p-4 mb-6 border-l-4 border-l-error">
          <div className="flex items-center gap-2 text-error font-semibold text-sm mb-1">
            <AlertTriangle className="w-4 h-4" /> Emergency Notice
          </div>
          <p className="text-on-surface-variant text-xs">In case of immediate danger, call the relevant number below. These are 24/7 emergency services.</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {emergencyNumbers.map((emergency, i) => (
            <motion.a
              key={emergency.label}
              href={`tel:${emergency.number}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="glass-card rounded-2xl p-5 flex flex-col items-center text-center active:bg-white/10 cursor-pointer"
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3"
                style={{ background: `${emergency.glow}`, boxShadow: `0 0 20px ${emergency.glow}` }}>
                <emergency.icon className="w-7 h-7 text-white" />
              </div>
              <span className="text-on-surface font-semibold text-sm mb-1">{emergency.label}</span>
              <span className="text-2xl font-extrabold" style={{ color: emergency.color }}>{emergency.number}</span>
              <div className="flex items-center gap-1 mt-2 text-xs text-on-surface-variant">
                <Phone className="w-3 h-3" /> Tap to call
              </div>
            </motion.a>
          ))}
        </div>
      </main>
    </div>
  )
}

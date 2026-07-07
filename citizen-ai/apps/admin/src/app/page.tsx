'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Users, Shield, BarChart3, Settings, FileText,
  Brain, Database, Activity, Sparkles, TrendingUp
} from 'lucide-react'

const adminModules = [
  { icon: Users, label: 'User Management', href: '/users', count: '12.4K', desc: 'Active citizens' },
  { icon: Shield, label: 'Complaint Analytics', href: '/complaints', count: '847', desc: 'Open complaints' },
  { icon: FileText, label: 'Services', href: '/services', count: '534', desc: 'Active services' },
  { icon: Brain, label: 'AI Monitoring', href: '/ai', count: '98%', desc: 'Uptime' },
  { icon: Database, label: 'Knowledge Base', href: '/knowledge', count: '2.3K', desc: 'Documents' },
  { icon: Activity, label: 'System Health', href: '/health', count: '99.9%', desc: 'SLA' },
  { icon: BarChart3, label: 'Analytics', href: '/analytics', count: '—', desc: 'Reports' },
  { icon: Settings, label: 'Settings', href: '/settings', count: '—', desc: 'Configuration' },
]

export default function AdminDashboard() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(0,82,204,0.3)', boxShadow: '0 0 20px rgba(0,82,204,0.5)' }}>
              <Sparkles className="w-5 h-5" style={{ color: '#b2c5ff' }} />
            </div>
            <div>
              <h1 className="text-xl font-bold" style={{ color: '#d8e2ff' }}>CitizenAI Admin</h1>
              <p className="text-xs" style={{ color: '#8d90a0' }}>System Administration Portal</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs" style={{ color: '#40e56c' }}>
            <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
            All systems operational
          </div>
        </div>

        {/* Stats banner */}
        <div className="grid grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Daily Active Users', value: '48,291', trend: '+12%', icon: TrendingUp },
            { label: 'Complaints Resolved', value: '1,234', trend: '+8%', icon: Shield },
            { label: 'AI Queries Today', value: '89,456', trend: '+23%', icon: Brain },
            { label: 'Services Applied', value: '2,891', trend: '+5%', icon: FileText },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl p-5"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(40px)' }}
            >
              <stat.icon className="w-4 h-4 mb-3" style={{ color: '#b2c5ff' }} />
              <div className="text-2xl font-bold mb-0.5" style={{ color: '#d8e2ff' }}>{stat.value}</div>
              <div className="text-xs mb-1" style={{ color: '#8d90a0' }}>{stat.label}</div>
              <span className="text-xs font-semibold" style={{ color: '#40e56c' }}>{stat.trend} today</span>
            </motion.div>
          ))}
        </div>

        {/* Modules grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {adminModules.map((module, i) => (
            <motion.div
              key={module.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -4 }}
            >
              <Link
                href={module.href}
                className="block rounded-2xl p-5 h-full transition-all duration-200"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(40px)' }}
              >
                <module.icon className="w-8 h-8 mb-4" style={{ color: '#b2c5ff' }} />
                <div className="text-2xl font-bold mb-1" style={{ color: '#d8e2ff' }}>{module.count}</div>
                <div className="text-xs mb-0.5" style={{ color: '#8d90a0' }}>{module.desc}</div>
                <div className="text-sm font-semibold" style={{ color: '#d8e2ff' }}>{module.label}</div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

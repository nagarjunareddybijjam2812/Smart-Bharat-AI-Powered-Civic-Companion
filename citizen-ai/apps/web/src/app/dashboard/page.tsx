'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import {
  MessageCircle, FileText, Shield, Bell, MapPin,
  Sparkles, ChevronRight, TrendingUp, Clock,
  CheckCircle2, AlertCircle, Plus, Search
} from 'lucide-react'
import { useAuthStore } from '@/store/auth.store'
import { useQuery } from '@tanstack/react-query'
import { complaintsApi, notificationsApi } from '@/lib/api'

const quickActions = [
  { icon: MessageCircle, label: 'Ask AI', href: '/ai-chat', color: '#8438a2', glow: 'rgba(132,56,162,0.4)' },
  { icon: FileText, label: 'Apply', href: '/services', color: '#0052cc', glow: 'rgba(0,82,204,0.4)' },
  { icon: Shield, label: 'Report', href: '/complaints', color: '#02c953', glow: 'rgba(2,201,83,0.4)' },
  { icon: MapPin, label: 'Near Me', href: '/map', color: '#0052cc', glow: 'rgba(0,82,204,0.4)' },
  { icon: Bell, label: 'Alerts', href: '/notifications', color: '#8438a2', glow: 'rgba(132,56,162,0.4)' },
  { icon: Sparkles, label: 'AI Tips', href: '/ai-chat', color: '#02c953', glow: 'rgba(2,201,83,0.4)' },
]

const staggerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
}

export default function DashboardPage() {
  const router = useRouter()
  const [aiQuery, setAiQuery] = useState('')
  const { user } = useAuthStore()
  const firstName = user?.profile?.firstName || 'Citizen'

  const { data: stats } = useQuery({
    queryKey: ['complaint-stats'],
    queryFn: () => complaintsApi.stats() as any,
  })

  const { data: notifications } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => notificationsApi.list({ pageSize: 5 }) as any,
  })

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top nav */}
      <header className="glass-nav sticky top-0 z-40 px-6 py-4">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-on-primary" />
            </div>
            <span className="font-bold text-on-surface">CitizenAI</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/search" className="glass p-2 rounded-xl hover:bg-white/10 transition-colors" aria-label="Search">
              <Search className="w-4 h-4 text-on-surface-variant" />
            </Link>
            <Link href="/notifications" className="relative glass p-2 rounded-xl hover:bg-white/10 transition-colors" aria-label="Notifications">
              <Bell className="w-4 h-4 text-on-surface-variant" />
              {notifications?.data?.unread > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-error rounded-full" />
              )}
            </Link>
            <Link href="/profile">
              <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-on-primary text-xs font-bold">
                {firstName[0]}
              </div>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 px-6 py-8 max-w-[1440px] mx-auto w-full">
        {/* Hero greeting */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <p className="text-on-surface-variant text-sm mb-1">{greeting},</p>
          <h1 className="text-[clamp(28px,4vw,40px)] font-bold gradient-text-primary tracking-tight">
            {firstName} 👋
          </h1>
          <p className="text-on-surface-variant text-sm mt-1">What can we help you with today?</p>
        </motion.div>

        {/* AI prompt bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (aiQuery.trim()) {
                router.push(`/ai-chat?q=${encodeURIComponent(aiQuery)}`)
              } else {
                router.push('/ai-chat')
              }
            }}
            className="flex items-center gap-3 glass-card-raised rounded-2xl px-5 py-4 w-full hover:bg-white/5 transition-all duration-200 group focus-within:ring-2 focus-within:ring-primary/50"
          >
            <div className="w-8 h-8 rounded-xl ai-orb flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <input
              type="text"
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
              placeholder="Ask me anything about government services..."
              className="bg-transparent border-none outline-none text-on-surface-variant text-sm flex-1 placeholder:text-on-surface-variant/70"
            />
            <button type="submit" className="p-2 rounded-xl hover:bg-white/10 transition-colors">
              <ChevronRight className="w-4 h-4 text-on-surface-variant group-hover:text-primary transition-colors" />
            </button>
          </form>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          variants={staggerVariants}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <h2 className="text-on-surface font-semibold text-sm mb-4 tracking-wide">Quick Actions</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {quickActions.map((action) => (
              <motion.div key={action.label} variants={cardVariant}>
                <Link
                  href={action.href}
                  className="glass-card rounded-2xl p-4 flex flex-col items-center gap-2 hover:bg-white/10 transition-all duration-200 group"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-shadow duration-300 group-hover:scale-105"
                    style={{ background: `${action.glow}`, boxShadow: `0 0 16px ${action.glow}` }}
                  >
                    <action.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xs text-on-surface-variant font-medium text-center leading-tight">
                    {action.label}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={staggerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: 'Open Complaints', value: stats?.data?.open ?? '—', icon: AlertCircle, color: 'text-yellow-400' },
            { label: 'In Progress', value: stats?.data?.inProgress ?? '—', icon: TrendingUp, color: 'text-primary' },
            { label: 'Resolved', value: stats?.data?.resolved ?? '—', icon: CheckCircle2, color: 'text-secondary' },
            { label: 'Total', value: stats?.data?.total ?? '—', icon: Shield, color: 'text-tertiary' },
          ].map((s) => (
            <motion.div key={s.label} variants={cardVariant} className="glass-card rounded-2xl p-5">
              <s.icon className={`w-5 h-5 ${s.color} mb-3`} />
              <div className="text-2xl font-bold text-on-surface mb-1">{s.value}</div>
              <div className="text-xs text-on-surface-variant">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Recent Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-2xl p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-on-surface font-semibold text-sm">Recent Activity</h2>
            <Link href="/notifications" className="text-primary text-xs hover:underline">View all</Link>
          </div>
          {notifications?.data?.items?.length > 0 ? (
            <div className="space-y-3">
              {notifications.data.items.slice(0, 3).map((notif: any) => (
                <div key={notif.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
                  <Bell className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-on-surface text-sm font-medium">{notif.title}</p>
                    <p className="text-on-surface-variant text-xs mt-0.5">{notif.body}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Bell className="w-8 h-8 text-on-surface-variant/30 mx-auto mb-2" />
              <p className="text-on-surface-variant text-sm">No notifications yet</p>
            </div>
          )}
        </motion.div>

        {/* CTA — Floating AI */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="glass-card-raised rounded-2xl p-6 flex items-center gap-5"
        >
          <div className="w-14 h-14 rounded-2xl ai-orb flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-on-surface font-semibold">Get AI-powered recommendations</h3>
            <p className="text-on-surface-variant text-xs mt-1">Discover government schemes you&apos;re eligible for</p>
          </div>
          <Link href="/ai-chat" className="btn-ghost text-xs py-2 px-4 flex-shrink-0">
            Explore
            <ChevronRight className="w-3 h-3" />
          </Link>
        </motion.div>
      </main>

      {/* Bottom navigation */}
      <nav className="glass-nav sticky bottom-0 z-40 px-4 py-3 safe-area-pb">
        <div className="max-w-md mx-auto grid grid-cols-5 gap-1">
          {[
            { icon: Sparkles, label: 'Home', href: '/dashboard', active: true },
            { icon: FileText, label: 'Services', href: '/services', active: false },
            { icon: Shield, label: 'Complaints', href: '/complaints', active: false },
            { icon: Bell, label: 'Alerts', href: '/notifications', active: false },
            { icon: MapPin, label: 'Map', href: '/map', active: false },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center gap-1 py-2 px-1 rounded-xl transition-all duration-200 ${
                item.active ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  )
}

'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useQuery, useMutation } from '@tanstack/react-query'
import { usersApi } from '@/lib/api'
import { useAuthStore } from '@/store/auth.store'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft, User, Mail, Phone, MapPin, Globe,
  Shield, Bell, HelpCircle, LogOut, ChevronRight,
  Edit, Star, FileText, MessageCircle, WalletCards
} from 'lucide-react'
import { authApi } from '@/lib/api'

export default function ProfilePage() {
  const { user, logout } = useAuthStore()
  const router = useRouter()

  const { data: profile } = useQuery({
    queryKey: ['user-profile'],
    queryFn: () => usersApi.me() as any,
    enabled: !!user,
  })

  const handleLogout = async () => {
    await authApi.logout()
    logout()
    router.push('/')
  }

  const profileData = profile?.data || user
  const fullName = `${profileData?.profile?.firstName || ''} ${profileData?.profile?.lastName || ''}`.trim() || 'Citizen'

  const menuSections = [
    {
      title: 'Account',
      items: [
        { icon: User, label: 'Edit Profile', href: '/profile/edit' },
        { icon: Shield, label: 'Privacy & Security', href: '/settings/security' },
        { icon: Globe, label: 'Language', href: '/settings/language' },
      ],
    },
    {
      title: 'Documents',
      items: [
        { icon: WalletCards, label: 'DigiLocker', href: '/profile/digilocker' },
      ],
    },
    {
      title: 'Support',
      items: [
        { icon: Bell, label: 'Notifications', href: '/settings/notifications' },
        { icon: HelpCircle, label: 'Help Center', href: '/help' },
        { icon: MessageCircle, label: 'Feedback', href: '/feedback' },
      ],
    },
  ]

  return (
    <div className="min-h-screen">
      <div className="glass-nav sticky top-0 z-40 px-4 py-3">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="glass p-2 rounded-xl text-on-surface-variant hover:text-on-surface transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="text-on-surface font-semibold flex-1">Profile</h1>
          <Link href="/profile/edit" className="glass p-2 rounded-xl text-on-surface-variant hover:text-on-surface transition-colors">
            <Edit className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <main className="px-4 py-6 max-w-2xl mx-auto space-y-6">
        {/* Profile card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card-raised rounded-3xl p-6 text-center"
        >
          <div className="w-20 h-20 rounded-2xl bg-primary-container flex items-center justify-center text-on-primary text-3xl font-bold mx-auto mb-4 shadow-glow-primary">
            {fullName[0]}
          </div>
          <h2 className="text-on-surface font-bold text-xl mb-1">{fullName}</h2>
          <p className="text-on-surface-variant text-sm mb-1">{profileData?.email || profileData?.phone || 'citizen@example.com'}</p>
          <span className="badge-info text-xs capitalize">{profileData?.role?.toLowerCase() || 'citizen'}</span>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-glass">
            {[
              { icon: FileText, value: '12', label: 'Applications' },
              { icon: Shield, value: '3', label: 'Complaints' },
              { icon: Star, value: '8', label: 'Saved' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <s.icon className="w-4 h-4 text-primary mx-auto mb-1" />
                <div className="text-on-surface font-bold text-lg">{s.value}</div>
                <div className="text-on-surface-variant text-xs">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Menu sections */}
        {menuSections.map((section, si) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + si * 0.1 }}
            className="glass-card rounded-2xl overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-glass">
              <h3 className="text-xs font-semibold text-on-surface-variant tracking-widest uppercase">{section.title}</h3>
            </div>
            {section.items.map((item, i) => (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-4 px-4 py-4 hover:bg-white/5 transition-colors ${i < section.items.length - 1 ? 'border-b border-glass' : ''}`}
              >
                <div className="w-9 h-9 rounded-xl bg-surface-container-high flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-on-surface-variant" />
                </div>
                <span className="text-on-surface text-sm flex-1">{item.label}</span>
                <ChevronRight className="w-4 h-4 text-on-surface-variant/50" />
              </Link>
            ))}
          </motion.div>
        ))}

        {/* Sign out */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <button
            onClick={handleLogout}
            className="w-full glass-card rounded-2xl p-4 flex items-center gap-4 text-error hover:bg-error/10 transition-colors"
          >
            <div className="w-9 h-9 rounded-xl bg-error/10 flex items-center justify-center">
              <LogOut className="w-4 h-4 text-error" />
            </div>
            <span className="font-medium text-sm">Sign Out</span>
          </button>
        </motion.div>

        <p className="text-center text-xs text-on-surface-variant/60 pb-4">
          CitizenAI v1.0.0 · Government of India
        </p>
      </main>
    </div>
  )
}

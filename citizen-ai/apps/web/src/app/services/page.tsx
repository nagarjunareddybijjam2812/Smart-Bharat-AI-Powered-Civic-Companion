'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { servicesApi } from '@/lib/api'
import {
  ArrowLeft, Search, SlidersHorizontal, FileText,
  Heart, ChevronRight, Zap, Loader2
} from 'lucide-react'
import { useAuthStore } from '@/store/auth.store'

const categoryIcons: Record<string, string> = {
  REVENUE: '🏦', HEALTH: '🏥', EDUCATION: '📚', TRANSPORT: '🚗',
  HOUSING: '🏠', SOCIAL_WELFARE: '👨‍👩‍👧', EMPLOYMENT: '💼',
  AGRICULTURE: '🌾', WATER_SANITATION: '💧', ELECTRICITY: '⚡',
  TAXATION: '📋', PASSPORT_VISA: '✈️', CIVIL_REGISTRATION: '📄', OTHER: '🏛️',
}

export default function ServicesPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')

  const { data: services, isLoading } = useQuery({
    queryKey: ['services', search, category],
    queryFn: () => servicesApi.list({ search: search || undefined, category: category || undefined }) as any,
    staleTime: 5 * 60 * 1000,
  })

  const { data: categories } = useQuery({
    queryKey: ['service-categories'],
    queryFn: () => servicesApi.categories() as any,
    staleTime: Infinity,
  })

  return (
    <div className="min-h-screen">
      <div className="glass-nav sticky top-0 z-40 px-4 py-4">
        <div className="flex items-center gap-3 mb-3">
          <Link href="/dashboard" className="glass p-2 rounded-xl text-on-surface-variant hover:text-on-surface transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="text-on-surface font-semibold flex-1">Government Services</h1>
          <button className="glass p-2 rounded-xl text-on-surface-variant" aria-label="Filter">
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/50" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search services..."
            className="input-glass pl-10 text-sm"
            aria-label="Search services"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 py-4 overflow-x-auto no-scrollbar">
        <div className="flex gap-2 w-max">
          <button
            onClick={() => setCategory('')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 whitespace-nowrap ${!category ? 'bg-primary-container text-on-primary-container' : 'glass text-on-surface-variant hover:text-on-surface'}`}
          >
            All Services
          </button>
          {categories?.data?.map((cat: any) => (
            <button
              key={cat.value}
              onClick={() => setCategory(cat.value)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 whitespace-nowrap ${category === cat.value ? 'bg-primary-container text-on-primary-container' : 'glass text-on-surface-variant hover:text-on-surface'}`}
            >
              {categoryIcons[cat.value] || '🏛️'} {cat.label}
            </button>
          ))}
        </div>
      </div>

      <main className="px-4 pb-8 max-w-4xl mx-auto">
        {isLoading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : (
          <div className="space-y-3">
            {services?.data?.items?.map((service: any, i: number) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass-card rounded-2xl p-4 hover:bg-white/10 transition-all duration-200 group"
              >
                <Link href={`/services/${service.id}`} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-container/20 flex items-center justify-center text-xl flex-shrink-0">
                    {categoryIcons[service.category] || '🏛️'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="text-on-surface font-semibold text-sm group-hover:text-primary transition-colors line-clamp-1">{service.name}</h3>
                      {service.isOnline && (
                        <span className="badge-success text-[10px] flex-shrink-0">Online</span>
                      )}
                    </div>
                    <p className="text-on-surface-variant text-xs line-clamp-2 mb-2">{service.description}</p>
                    <div className="flex items-center gap-3 text-xs text-on-surface-variant">
                      <span className="flex items-center gap-1">
                        <Zap className="w-3 h-3" /> {service.processingDays || 7} days
                      </span>
                      {service.fees && <span>₹{service.fees}</span>}
                      <span className="text-primary">{service.department?.name}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-on-surface-variant/50 flex-shrink-0 mt-1 group-hover:text-primary transition-colors" />
                </Link>
              </motion.div>
            ))}
            {services?.data?.items?.length === 0 && (
              <div className="text-center py-16">
                <FileText className="w-10 h-10 text-on-surface-variant/30 mx-auto mb-3" />
                <p className="text-on-surface text-sm font-semibold">No services found</p>
                <p className="text-on-surface-variant text-xs mt-1">Try a different search</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}

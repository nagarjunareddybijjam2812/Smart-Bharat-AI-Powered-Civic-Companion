'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react'

type ToastType = 'success' | 'error' | 'info' | 'warning'

interface Toast {
  id: string
  type: ToastType
  title: string
  message?: string
}

const toastIcons = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertCircle,
  info: Info,
}

const toastColors = {
  success: 'text-secondary',
  error: 'text-error',
  warning: 'text-yellow-400',
  info: 'text-primary',
}

// Simple global toast state
let addToastFn: ((toast: Omit<Toast, 'id'>) => void) | null = null

export function toast(type: ToastType, title: string, message?: string) {
  addToastFn?.({ type, title, message })
}

export function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2)
    setToasts(prev => [...prev, { ...toast, id }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000)
  }, [])

  useEffect(() => {
    addToastFn = addToast
    return () => { addToastFn = null }
  }, [addToast])

  return (
    <div className="fixed bottom-24 right-4 z-[100] space-y-2 max-w-xs w-full">
      <AnimatePresence>
        {toasts.map(t => {
          const Icon = toastIcons[t.type]
          return (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.95 }}
              className="glass-card-raised rounded-2xl p-4 flex items-start gap-3"
            >
              <Icon className={`w-5 h-5 flex-shrink-0 ${toastColors[t.type]}`} />
              <div className="flex-1 min-w-0">
                <p className="text-on-surface text-sm font-semibold">{t.title}</p>
                {t.message && <p className="text-on-surface-variant text-xs mt-0.5">{t.message}</p>}
              </div>
              <button onClick={() => setToasts(prev => prev.filter(x => x.id !== t.id))} className="text-on-surface-variant hover:text-on-surface">
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}

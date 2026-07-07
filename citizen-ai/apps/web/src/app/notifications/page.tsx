'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { notificationsApi } from '@/lib/api'
import { ArrowLeft, Bell, CheckCheck, Loader2 } from 'lucide-react'
import { formatRelativeTime } from '@/lib/utils'

const typeColors: Record<string, string> = {
  COMPLAINT_UPDATE: 'text-yellow-400',
  APPLICATION_UPDATE: 'text-primary',
  DOCUMENT_VERIFICATION: 'text-secondary',
  SYSTEM: 'text-on-surface-variant',
  EMERGENCY: 'text-error',
  SCHEME_ALERT: 'text-tertiary',
  REMINDER: 'text-primary',
}

export default function NotificationsPage() {
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => notificationsApi.list({ pageSize: 50 }) as any,
  })

  const markAllRead = useMutation({
    mutationFn: () => notificationsApi.markRead(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notifications'] }),
  })

  const notifications = data?.data?.items || []

  return (
    <div className="min-h-screen">
      <div className="glass-nav sticky top-0 z-40 px-4 py-3">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="glass p-2 rounded-xl text-on-surface-variant hover:text-on-surface transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="text-on-surface font-semibold flex-1">Notifications</h1>
          {data?.data?.unread > 0 && (
            <button
              onClick={() => markAllRead.mutate()}
              className="flex items-center gap-1.5 text-xs text-primary hover:underline"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              Mark all read
            </button>
          )}
        </div>
      </div>

      <main className="px-4 py-6 max-w-2xl mx-auto">
        {isLoading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : notifications.length === 0 ? (
          <div className="text-center py-16">
            <Bell className="w-12 h-12 text-on-surface-variant/30 mx-auto mb-3" />
            <p className="text-on-surface font-semibold mb-1">All caught up!</p>
            <p className="text-on-surface-variant text-sm">No notifications at the moment</p>
          </div>
        ) : (
          <div className="space-y-2">
            {notifications.map((notif: any, i: number) => (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className={`glass-card rounded-2xl p-4 ${!notif.isRead ? 'border-l-2 border-l-primary' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${notif.isRead ? 'bg-surface-container-high' : 'bg-primary-container/20'}`}>
                    <Bell className={`w-4 h-4 ${typeColors[notif.type] || 'text-primary'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold mb-0.5 ${notif.isRead ? 'text-on-surface-variant' : 'text-on-surface'}`}>
                      {notif.title}
                    </p>
                    <p className="text-xs text-on-surface-variant line-clamp-2">{notif.body}</p>
                    <p className="text-xs text-on-surface-variant/60 mt-1.5">{formatRelativeTime(notif.createdAt)}</p>
                  </div>
                  {!notif.isRead && (
                    <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

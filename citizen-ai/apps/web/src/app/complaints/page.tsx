'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  ArrowLeft, Shield, MapPin, Camera, Upload,
  ChevronRight, Loader2, CheckCircle
} from 'lucide-react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { complaintsApi } from '@/lib/api'
import { getStatusColor, formatRelativeTime } from '@/lib/utils'

const schema = z.object({
  title: z.string().min(5, 'Minimum 5 characters'),
  description: z.string().min(20, 'Please provide more details (min 20 chars)'),
  category: z.string().min(1, 'Select a category'),
  address: z.string().optional(),
})

type FormData = z.infer<typeof schema>

const categories = [
  'Roads & Potholes', 'Water Supply', 'Electricity', 'Garbage Collection',
  'Street Lights', 'Sewage', 'Public Facilities', 'Encroachment', 'Other'
]

export default function ComplaintsPage() {
  const [tab, setTab] = useState<'new' | 'my'>('my')
  const [submitted, setSubmitted] = useState(false)

  const { data: complaints, refetch } = useQuery({
    queryKey: ['my-complaints'],
    queryFn: () => complaintsApi.list() as any,
  })

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const mutation = useMutation({
    mutationFn: (data: FormData) => complaintsApi.create(data),
    onSuccess: () => {
      setSubmitted(true)
      reset()
      setTimeout(() => { setSubmitted(false); setTab('my'); refetch() }, 2000)
    },
  })

  const statusColors: Record<string, string> = {
    OPEN: 'badge-warning',
    IN_PROGRESS: 'badge-info',
    RESOLVED: 'badge-success',
    ESCALATED: 'badge-error',
    CLOSED: 'badge-success',
  }

  return (
    <div className="min-h-screen">
      <div className="glass-nav sticky top-0 z-40 px-4 py-3">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="glass p-2 rounded-xl text-on-surface-variant hover:text-on-surface transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="text-on-surface font-semibold flex-1">Complaints</h1>
        </div>
        <div className="flex mt-3 bg-surface-container-high rounded-xl p-1">
          {(['my', 'new'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg capitalize transition-all duration-200 ${tab === t ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant'}`}
            >
              {t === 'my' ? 'My Complaints' : 'Report New'}
            </button>
          ))}
        </div>
      </div>

      <main className="px-4 py-6 max-w-2xl mx-auto">
        {tab === 'my' ? (
          <div className="space-y-3">
            {complaints?.data?.items?.length === 0 ? (
              <div className="text-center py-16">
                <Shield className="w-12 h-12 text-on-surface-variant/30 mx-auto mb-3" />
                <p className="text-on-surface font-semibold mb-1">No complaints yet</p>
                <p className="text-on-surface-variant text-sm mb-4">Report a civic issue to get started</p>
                <button onClick={() => setTab('new')} className="btn-primary text-sm py-2.5 px-6">
                  Report an Issue
                </button>
              </div>
            ) : (
              complaints?.data?.items?.map((complaint: any) => (
                <motion.div
                  key={complaint.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-card rounded-2xl p-4"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-on-surface font-semibold text-sm">{complaint.title}</h3>
                    <span className={statusColors[complaint.status] || 'badge-info'}>
                      {complaint.status.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-on-surface-variant text-xs mb-3 line-clamp-2">{complaint.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-on-surface-variant">{formatRelativeTime(complaint.createdAt)}</span>
                    <Link href={`/complaints/${complaint.id}`} className="flex items-center gap-1 text-primary text-xs font-medium hover:underline">
                      View Details <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            {submitted ? (
              <div className="text-center py-16">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4"
                >
                  <CheckCircle className="w-8 h-8 text-secondary" />
                </motion.div>
                <h2 className="text-on-surface font-bold text-xl mb-2">Complaint Submitted!</h2>
                <p className="text-on-surface-variant text-sm">We'll notify you of updates</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="space-y-5">
                <div>
                  <label className="text-label-caps text-on-surface-variant block mb-2 tracking-widest uppercase text-xs">Category</label>
                  <select {...register('category')} className="input-glass appearance-none">
                    <option value="">Select category...</option>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  {errors.category && <p className="text-error text-xs mt-1">{errors.category.message}</p>}
                </div>

                <div>
                  <label className="text-label-caps text-on-surface-variant block mb-2 tracking-widest uppercase text-xs">Title</label>
                  <input {...register('title')} placeholder="Brief description of the issue" className="input-glass" />
                  {errors.title && <p className="text-error text-xs mt-1">{errors.title.message}</p>}
                </div>

                <div>
                  <label className="text-label-caps text-on-surface-variant block mb-2 tracking-widest uppercase text-xs">Description</label>
                  <textarea {...register('description')} placeholder="Describe the issue in detail..." rows={5} className="input-glass resize-none" />
                  {errors.description && <p className="text-error text-xs mt-1">{errors.description.message}</p>}
                </div>

                <div>
                  <label className="text-label-caps text-on-surface-variant block mb-2 tracking-widest uppercase text-xs">Location (Optional)</label>
                  <div className="relative">
                    <input {...register('address')} placeholder="Enter address or use GPS" className="input-glass pr-10" />
                    <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/50" />
                  </div>
                </div>

                {/* Media upload */}
                <div>
                  <label className="text-label-caps text-on-surface-variant block mb-2 tracking-widest uppercase text-xs">Attach Photos (Optional)</label>
                  <div className="border-2 border-dashed border-outline-variant/50 rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <Camera className="w-8 h-8 text-on-surface-variant/40 mx-auto mb-2" />
                    <p className="text-on-surface-variant text-sm">Drag & drop or click to upload</p>
                    <p className="text-xs text-on-surface-variant/60 mt-1">JPG, PNG up to 10MB</p>
                  </div>
                </div>

                {mutation.isError && (
                  <div className="bg-error-container/20 border border-error/30 rounded-xl p-3 text-error text-sm">
                    Failed to submit complaint. Please try again.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={mutation.isPending}
                  className="btn-primary w-full py-4 rounded-xl font-semibold disabled:opacity-50"
                >
                  {mutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Submit Complaint'}
                </button>
              </form>
            )}
          </motion.div>
        )}
      </main>
    </div>
  )
}

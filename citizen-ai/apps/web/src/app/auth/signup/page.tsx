'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Sparkles, Eye, EyeOff, ArrowLeft, Loader2, ArrowRight } from 'lucide-react'
import { auth } from '@/lib/firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'

const schema = z.object({
  firstName: z.string().min(2, 'Enter your first name'),
  lastName: z.string().min(1, 'Enter your last name'),
  email: z.string().email('Valid email required'),
  password: z.string().min(8, 'Minimum 8 characters'),
  confirmPassword: z.string(),
}).refine(d => d.password === d.confirmPassword, { message: "Passwords don't match", path: ['confirmPassword'] })

type FormData = z.infer<typeof schema>

export default function SignupPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    setError('')
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password)
      await updateProfile(userCredential.user, {
        displayName: `${data.firstName} ${data.lastName}`,
      })
      router.push('/onboarding')
    } catch (err: any) {
      setError(err?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
          <Link href="/" className="inline-flex items-center gap-2 text-on-surface-variant hover:text-on-surface text-sm mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to home
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card-raised rounded-3xl p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl ai-orb flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-on-surface font-bold text-xl">Create account</h1>
              <p className="text-on-surface-variant text-xs">Join CitizenAI today</p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-label-caps text-on-surface-variant block mb-2 tracking-widest uppercase text-xs">First Name</label>
                <input {...register('firstName')} placeholder="Rahul" className="input-glass" />
                {errors.firstName && <p className="text-error text-xs mt-1">{errors.firstName.message}</p>}
              </div>
              <div>
                <label className="text-label-caps text-on-surface-variant block mb-2 tracking-widest uppercase text-xs">Last Name</label>
                <input {...register('lastName')} placeholder="Sharma" className="input-glass" />
                {errors.lastName && <p className="text-error text-xs mt-1">{errors.lastName.message}</p>}
              </div>
            </div>
            <div>
              <label className="text-label-caps text-on-surface-variant block mb-2 tracking-widest uppercase text-xs">Email</label>
              <input {...register('email')} placeholder="rahul@example.com" className="input-glass" />
              {errors.email && <p className="text-error text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label className="text-label-caps text-on-surface-variant block mb-2 tracking-widest uppercase text-xs">Password</label>
              <div className="relative">
                <input {...register('password')} type={showPassword ? 'text' : 'password'} placeholder="••••••••" className="input-glass pr-10" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-error text-xs mt-1">{errors.password.message}</p>}
            </div>
            <div>
              <label className="text-label-caps text-on-surface-variant block mb-2 tracking-widest uppercase text-xs">Confirm Password</label>
              <input {...register('confirmPassword')} type="password" placeholder="••••••••" className="input-glass" />
              {errors.confirmPassword && <p className="text-error text-xs mt-1">{errors.confirmPassword.message}</p>}
            </div>

            {error && <div className="bg-error-container/20 border border-error/30 rounded-xl p-3 text-error text-sm">{error}</div>}

            <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 rounded-xl font-semibold text-sm disabled:opacity-50">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Create Account <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-on-surface-variant">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-primary hover:underline font-semibold">Sign In</Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

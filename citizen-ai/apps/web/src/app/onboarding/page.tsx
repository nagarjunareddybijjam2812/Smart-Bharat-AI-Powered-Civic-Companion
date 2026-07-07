'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Sparkles, ArrowRight, CheckCircle, MapPin, Globe, User } from 'lucide-react'

const steps = [
  {
    icon: User,
    title: 'Welcome to CitizenAI',
    description: 'Your AI-powered government companion is ready to help you access all government services in one place.',
    color: '#0052cc',
  },
  {
    icon: Globe,
    title: 'Choose your language',
    description: 'CitizenAI supports 22 Indian languages. Select your preferred language for the best experience.',
    color: '#8438a2',
  },
  {
    icon: MapPin,
    title: 'Set your location',
    description: 'Enable location access to find nearby government offices, services, and get localized information.',
    color: '#02c953',
  },
]

export default function OnboardingPage() {
  const [step, setStep] = useState(0)
  const [selectedLang, setSelectedLang] = useState('en')
  const router = useRouter()

  const languages = [
    { code: 'en', name: 'English' }, { code: 'hi', name: 'हिंदी' },
    { code: 'ta', name: 'தமிழ்' }, { code: 'te', name: 'తెలుగు' },
    { code: 'kn', name: 'ಕನ್ನಡ' }, { code: 'ml', name: 'മലയാളം' },
    { code: 'mr', name: 'मराठी' }, { code: 'bn', name: 'বাংলা' },
  ]

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1)
    } else {
      router.push('/dashboard')
    }
  }

  const currentStep = steps[step]

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16">
      {/* Progress dots */}
      <div className="flex gap-2 mb-12">
        {steps.map((_, i) => (
          <motion.div
            key={i}
            className="h-1.5 rounded-full transition-all duration-300"
            animate={{ width: i === step ? '24px' : '6px', backgroundColor: i <= step ? '#b2c5ff' : '#434654' }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-sm text-center"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-20 h-20 rounded-3xl mx-auto mb-8 flex items-center justify-center"
            style={{ background: `${currentStep.color}33`, boxShadow: `0 0 30px ${currentStep.color}44` }}
          >
            <currentStep.icon className="w-10 h-10" style={{ color: currentStep.color }} />
          </motion.div>

          <h1 className="text-2xl font-bold text-on-surface mb-4 tracking-tight">{currentStep.title}</h1>
          <p className="text-on-surface-variant text-sm leading-relaxed mb-8">{currentStep.description}</p>

          {/* Step 1: Language selection */}
          {step === 1 && (
            <div className="grid grid-cols-4 gap-2 mb-6">
              {languages.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => setSelectedLang(lang.code)}
                  className={`py-2 px-1 rounded-xl text-xs font-medium transition-all duration-200 ${
                    selectedLang === lang.code
                      ? 'bg-primary-container text-on-primary-container'
                      : 'glass text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          )}

          {/* Step 2: Location */}
          {step === 2 && (
            <button className="btn-ghost w-full py-3 mb-4 text-sm">
              <MapPin className="w-4 h-4" />
              Enable Location
            </button>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="w-full max-w-sm space-y-3 mt-4">
        <button onClick={handleNext} className="btn-primary w-full py-4 rounded-xl text-sm font-semibold">
          {step < steps.length - 1 ? <>Continue <ArrowRight className="w-4 h-4" /></> : <>Get Started <Sparkles className="w-4 h-4" /></>}
        </button>
        {step < steps.length - 1 && (
          <button onClick={() => router.push('/dashboard')} className="w-full text-center text-on-surface-variant text-xs hover:text-on-surface transition-colors py-2">
            Skip for now
          </button>
        )}
      </div>
    </div>
  )
}

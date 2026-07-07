'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import {
  Sparkles, Shield, Zap, Globe, FileText, Bell,
  MapPin, MessageCircle, ChevronRight, Star, ArrowRight,
  Users, Award, TrendingUp, CheckCircle, Menu, X
} from 'lucide-react'

const features = [
  { icon: MessageCircle, label: 'AI Assistant', desc: 'Ask anything, get instant answers about government services', color: 'tertiary', glow: 'rgba(132,56,162,0.4)' },
  { icon: FileText, label: 'Apply Online', desc: 'Complete applications for 500+ government services', color: 'primary', glow: 'rgba(0,82,204,0.4)' },
  { icon: Shield, label: 'Complaint Tracking', desc: 'Report issues and track resolution in real-time', color: 'secondary', glow: 'rgba(2,201,83,0.4)' },
  { icon: Globe, label: 'Smart Map', desc: 'Find nearby government offices and emergency services', color: 'tertiary', glow: 'rgba(132,56,162,0.3)' },
  { icon: Sparkles, label: 'AI Schemes', desc: 'Get personalized government scheme recommendations', color: 'primary', glow: 'rgba(0,82,204,0.3)' },
  { icon: Bell, label: 'Notifications', desc: 'Never miss a deadline with smart reminders', color: 'secondary', glow: 'rgba(2,201,83,0.3)' },
]

const stats = [
  { value: '50M+', label: 'Citizens Served', icon: Users },
  { value: '500+', label: 'Government Services', icon: Award },
  { value: '98%', label: 'Satisfaction Rate', icon: Star },
  { value: '22', label: 'Languages Supported', icon: Globe },
]

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="text-on-surface-variant hover:text-on-surface text-sm font-medium transition-colors duration-200">
    {children}
  </Link>
)

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">
      {/* Navbar */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-nav' : ''}`}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-16 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center shadow-glow-primary group-hover:shadow-lg transition-shadow duration-300">
              <Sparkles className="w-4 h-4 text-on-primary" />
            </div>
            <span className="font-bold text-on-surface text-lg tracking-tight">CitizenAI</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#services">Services</NavLink>
            <NavLink href="#about">About</NavLink>
            <NavLink href="/help">Help</NavLink>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/auth/login" className="btn-ghost text-sm py-2 px-4">Sign In</Link>
            <Link href="/auth/signup" className="btn-primary text-sm py-2 px-4">Get Started</Link>
          </div>

          {/* Mobile menu */}
          <button
            className="md:hidden p-2 text-on-surface-variant hover:text-on-surface"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass-nav border-t border-glass px-6 py-4 flex flex-col gap-4"
            >
              <NavLink href="#features">Features</NavLink>
              <NavLink href="#services">Services</NavLink>
              <NavLink href="#about">About</NavLink>
              <div className="flex gap-3 pt-2">
                <Link href="/auth/login" className="btn-ghost text-sm py-2 px-4 flex-1 text-center">Sign In</Link>
                <Link href="/auth/signup" className="btn-primary text-sm py-2 px-4 flex-1 text-center">Get Started</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-16 pt-16 pb-24">
        {/* Decorative orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary-container/20 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-tertiary-container/20 blur-[80px] pointer-events-none" />

        <div className="relative max-w-[1440px] mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-8"
          >
            <span className="badge-tertiary text-xs px-4 py-1.5 font-semibold tracking-widest uppercase">
              <Sparkles className="w-3 h-3" />
              AI-Powered • Gemini 2.0 Flash
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-[clamp(48px,8vw,96px)] font-extrabold leading-[1.05] tracking-[-0.04em] mb-8"
          >
            <span className="gradient-text-primary">Governance,</span>
            <br />
            <span className="text-on-surface">Reimagined.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="text-[18px] text-on-surface-variant leading-[1.6] max-w-2xl mx-auto mb-12"
          >
            One platform. Every government service. Powered by AI.
            Apply, track, report, and get assistance — all in one place,
            in your language.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
          >
            <Link href="/auth/signup" className="btn-primary px-8 py-4 text-base rounded-xl w-full sm:w-auto">
              Start For Free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/auth/login" className="btn-ghost px-8 py-4 text-base rounded-xl w-full sm:w-auto">
              Sign In
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.7 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + i * 0.1, duration: 0.4 }}
                className="glass-card rounded-2xl p-6 text-center"
              >
                <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                <div className="text-2xl font-extrabold text-on-surface mb-1">{stat.value}</div>
                <div className="text-xs text-on-surface-variant font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 md:px-16 relative">
        <div className="max-w-[1440px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="badge-info text-xs tracking-widest uppercase mb-4 inline-block">Features</span>
            <h2 className="text-[clamp(32px,5vw,56px)] font-bold gradient-text-primary mb-4 tracking-tight">
              Everything you need.<br />Nothing you don't.
            </h2>
            <p className="text-on-surface-variant text-lg max-w-xl mx-auto">
              CitizenAI brings together every government service into one intelligent, beautiful platform.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature, i) => (
              <motion.div
                key={feature.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="glass-card-raised rounded-2xl p-6 cursor-pointer group"
                style={{ '--glow': feature.glow } as React.CSSProperties}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-shadow duration-300"
                  style={{ background: `${feature.glow}`, boxShadow: `0 0 20px ${feature.glow}` }}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-on-surface font-semibold text-[18px] mb-2 group-hover:text-primary transition-colors">{feature.label}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">{feature.desc}</p>
                <div className="mt-4 flex items-center gap-1 text-primary text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Learn more <ChevronRight className="w-3 h-3" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Chat Section */}
      <section id="services" className="py-24 px-6 md:px-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-container/5 to-tertiary-container/5 pointer-events-none" />
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="badge-tertiary text-xs tracking-widest uppercase mb-6 inline-block">AI Assistant</span>
              <h2 className="text-[clamp(32px,4vw,48px)] font-bold text-on-surface mb-6 tracking-tight leading-tight">
                Your personal government <span className="gradient-text-ai">AI companion</span>
              </h2>
              <p className="text-on-surface-variant text-lg leading-relaxed mb-8">
                Ask questions in any language. Get instant, accurate answers about eligibility, required documents,
                application status, and more. Powered by Gemini 2.0 Flash with deep government knowledge.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Answers in 22 Indian languages',
                  'Cites official government sources',
                  'Remembers your profile and preferences',
                  'Helps draft complaints and applications',
                ].map(item => (
                  <li key={item} className="flex items-center gap-3 text-on-surface-variant text-sm">
                    <CheckCircle className="w-4 h-4 text-secondary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/auth/signup" className="btn-primary inline-flex">
                Try AI Assistant Free
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* AI Chat Preview */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="glass-card-raised rounded-3xl p-6"
            >
              {/* Chat header */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-glass">
                <div className="w-10 h-10 rounded-xl ai-orb flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-on-surface font-semibold text-sm">CitizenAI Assistant</div>
                  <div className="text-xs text-secondary flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse" />
                    Online
                  </div>
                </div>
              </div>
              {/* Mock messages */}
              <div className="space-y-4 mb-4">
                <div className="flex gap-3">
                  <div className="w-7 h-7 rounded-lg ai-orb flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="glass rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-on-surface max-w-[80%]">
                    Hello! How can I help you today? I can assist with government services, applications, or any civic query.
                  </div>
                </div>
                <div className="flex gap-3 justify-end">
                  <div className="bg-primary-container rounded-2xl rounded-tr-sm px-4 py-3 text-sm text-on-primary-container max-w-[80%]">
                    How do I apply for a PAN card?
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-7 h-7 rounded-lg ai-orb flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="glass rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-on-surface max-w-[80%]">
                    You can apply for a PAN card through the NSDL or UTIITSL portal. Here&apos;s what you&apos;ll need:
                    <br /><br />
                    📋 <strong>Required documents:</strong>
                    <br />• Aadhaar Card (proof of identity & address)
                    <br />• Passport photo
                    <br />• Application fee: ₹107 (online)
                    <br /><br />
                    <span className="text-primary text-xs">Source: Income Tax Department, India ✓</span>
                  </div>
                </div>
              </div>
              {/* Input */}
              <div className="flex gap-2">
                <input
                  readOnly
                  placeholder="Ask me anything about government services..."
                  className="input-glass flex-1 text-sm py-2.5"
                />
                <button className="btn-primary p-2.5 rounded-xl">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 md:px-16 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card-raised rounded-3xl p-12 md:p-16 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-container/10 via-transparent to-tertiary-container/10 pointer-events-none rounded-3xl" />
            <div className="relative">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl ai-orb flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-[clamp(28px,4vw,48px)] font-bold gradient-text-primary mb-4 tracking-tight">
                Ready to experience the future of governance?
              </h2>
              <p className="text-on-surface-variant text-lg mb-8 max-w-lg mx-auto">
                Join 50 million+ citizens already using CitizenAI to access government services faster and smarter.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth/signup" className="btn-primary px-10 py-4 text-base rounded-xl">
                  Get Started Free
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/auth/login" className="btn-ghost px-10 py-4 text-base rounded-xl">
                  Sign In
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-glass px-6 md:px-16 py-12">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-primary-container flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-on-primary" />
              </div>
              <span className="font-bold text-on-surface">CitizenAI</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-on-surface-variant">
              <Link href="/help" className="hover:text-on-surface transition-colors">Help</Link>
              <Link href="/about" className="hover:text-on-surface transition-colors">About</Link>
              <Link href="/faq" className="hover:text-on-surface transition-colors">FAQ</Link>
            </div>
            <div className="text-xs text-on-surface-variant">
              © 2026 CitizenAI. Government of India Initiative.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

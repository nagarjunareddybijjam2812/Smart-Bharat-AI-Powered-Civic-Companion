'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Brain, Cpu, MessageSquare, Zap } from 'lucide-react'

export default function AIMonitorPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/" className="p-2 rounded-lg hover:bg-white/5 transition-colors" style={{ color: '#b2c5ff' }}>
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: '#d8e2ff' }}>AI System Monitor</h1>
            <p className="text-sm" style={{ color: '#8d90a0' }}>Gemini integration health, tokens, and telemetry</p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Tokens Used (24h)', value: '1.24M', icon: Cpu, color: '#b2c5ff' },
            { label: 'Active Sessions', value: '3,842', icon: MessageSquare, color: '#40e56c' },
            { label: 'Avg Latency', value: '412ms', icon: Zap, color: '#ffb020' },
            { label: 'Model Uptime', value: '99.99%', icon: Brain, color: '#00b8d9' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl p-5 border flex flex-col items-start"
              style={{ background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(40px)' }}
            >
              <stat.icon className="w-6 h-6 mb-4" style={{ color: stat.color }} />
              <div className="text-3xl font-bold mb-1" style={{ color: '#d8e2ff' }}>{stat.value}</div>
              <div className="text-sm font-medium" style={{ color: '#8d90a0' }}>{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl p-6 border" style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)' }}>
            <h2 className="font-semibold mb-4" style={{ color: '#d8e2ff' }}>Recent RAG Queries</h2>
            <div className="space-y-4">
              {[
                { q: "How to renew my driving license in Delhi?", t: "142 tokens", latency: "312ms" },
                { q: "Water supply timings for Zone B", t: "98 tokens", latency: "215ms" },
                { q: "File a complaint against garbage dumping", t: "215 tokens", latency: "488ms" },
              ].map((query, i) => (
                <div key={i} className="p-3 rounded-xl border flex justify-between items-center" style={{ background: 'rgba(0,0,0,0.2)', borderColor: 'rgba(255,255,255,0.05)' }}>
                  <span className="text-sm font-medium truncate max-w-[60%]" style={{ color: '#b2c5ff' }}>"{query.q}"</span>
                  <div className="flex gap-3 text-xs" style={{ color: '#8d90a0' }}>
                    <span>{query.t}</span>
                    <span>{query.latency}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="rounded-2xl p-6 border flex flex-col justify-center items-center text-center" style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)' }}>
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ background: 'rgba(64,229,108,0.1)' }}>
              <Zap className="w-8 h-8" style={{ color: '#40e56c' }} />
            </div>
            <h3 className="text-lg font-bold mb-2" style={{ color: '#d8e2ff' }}>Vector DB Sync Active</h3>
            <p className="text-sm max-w-sm" style={{ color: '#8d90a0' }}>Supabase pgvector embeddings are fully synchronized with the Google Gemini AI pipeline.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

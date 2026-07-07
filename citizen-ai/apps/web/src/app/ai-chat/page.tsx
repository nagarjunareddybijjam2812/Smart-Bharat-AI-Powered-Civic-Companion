'use client'

import { useState, useRef, useEffect, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import {
  Sparkles, ArrowLeft, Send, Mic, Paperclip,
  RefreshCw, ThumbsUp, ThumbsDown, Copy, ExternalLink,
  X, Loader2, ChevronDown
} from 'lucide-react'
import { aiApi } from '@/lib/api'
import { generateId } from '@/lib/utils'
import { useAuthStore } from '@/store/auth.store'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  sources?: Array<{ index: number; excerpt: string; similarity: number }>
  timestamp: Date
  loading?: boolean
}

const SUGGESTED_PROMPTS = [
  'How do I apply for a PAN card?',
  'What documents do I need for a passport?',
  'Schemes for women entrepreneurs',
  'How to report a road pothole?',
  'Ration card application process',
]

export default function AiChatPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>}>
      <AiChatContent />
    </Suspense>
  )
}

function AiChatContent() {
  const { user } = useAuthStore()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Hello! I'm your CitizenAI Assistant 🇮🇳\n\nI can help you with:\n• Government service applications\n• Scheme eligibility & benefits\n• Document requirements\n• Complaint filing & tracking\n• Policy explanations in simple language\n\nHow can I assist you today?`,
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [conversationId] = useState(() => generateId())
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q')

  // Auto-send initial query if present
  useEffect(() => {
    if (initialQuery) {
      sendMessage(initialQuery)
      // Clean up the URL
      window.history.replaceState({}, '', '/ai-chat')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async (text: string = input) => {
    if (!text.trim() || loading) return
    setInput('')

    const userMsg: Message = { id: generateId(), role: 'user', content: text, timestamp: new Date() }
    const loadingMsg: Message = { id: generateId(), role: 'assistant', content: '', timestamp: new Date(), loading: true }

    setMessages(prev => [...prev, userMsg, loadingMsg])
    setLoading(true)

    try {
      const result = await aiApi.chat(conversationId, text) as any
      const { message, sources } = result.data

      setMessages(prev => prev.map(m =>
        m.loading ? { ...m, loading: false, content: message.content, sources, id: message.id } : m
      ))
    } catch {
      setMessages(prev => prev.map(m =>
        m.loading ? { ...m, loading: false, content: 'Sorry, I encountered an error. Please try again.' } : m
      ))
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  const copyMessage = (content: string) => navigator.clipboard?.writeText(content)

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="glass-nav sticky top-0 z-40 px-4 py-3">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="glass p-2 rounded-xl text-on-surface-variant hover:text-on-surface transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="w-8 h-8 rounded-xl ai-orb flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1">
            <div className="text-on-surface font-semibold text-sm">CitizenAI Assistant</div>
            <div className="text-xs text-secondary flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse" />
              Online · Gemini 2.0 Flash
            </div>
          </div>
          <button className="glass p-2 rounded-xl text-on-surface-variant hover:text-on-surface transition-colors" aria-label="New chat">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 pb-32">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-xl ai-orb flex items-center justify-center flex-shrink-0 mt-1">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              )}

              <div className={`max-w-[85%] ${msg.role === 'user' ? 'order-first' : ''}`}>
                <div
                  className={`rounded-2xl px-4 py-3 ${
                    msg.role === 'user'
                      ? 'bg-primary-container text-on-primary-container rounded-tr-sm'
                      : 'glass text-on-surface rounded-tl-sm'
                  }`}
                >
                  {msg.loading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-3 h-3 animate-spin text-on-surface-variant" />
                      <span className="text-xs text-on-surface-variant">Thinking...</span>
                    </div>
                  ) : (
                    <p className="text-sm leading-relaxed whitespace-pre-line">{msg.content}</p>
                  )}
                </div>

                {/* Sources */}
                {msg.sources && msg.sources.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {msg.sources.map((source) => (
                      <div key={source.index} className="flex items-start gap-2 text-xs text-on-surface-variant bg-surface-container-high/50 rounded-xl px-3 py-2">
                        <ExternalLink className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" />
                        <span>Source {source.index}: {source.excerpt}</span>
                        <span className="ml-auto text-primary font-medium">{source.similarity}%</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Actions */}
                {msg.role === 'assistant' && !msg.loading && (
                  <div className="mt-2 flex items-center gap-1">
                    <button onClick={() => copyMessage(msg.content)} className="p-1.5 rounded-lg text-on-surface-variant/50 hover:text-on-surface-variant hover:bg-white/5 transition-colors" aria-label="Copy message">
                      <Copy className="w-3 h-3" />
                    </button>
                    <button className="p-1.5 rounded-lg text-on-surface-variant/50 hover:text-secondary hover:bg-white/5 transition-colors" aria-label="Helpful">
                      <ThumbsUp className="w-3 h-3" />
                    </button>
                    <button className="p-1.5 rounded-lg text-on-surface-variant/50 hover:text-error hover:bg-white/5 transition-colors" aria-label="Not helpful">
                      <ThumbsDown className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>

              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-on-primary text-xs font-bold flex-shrink-0 mt-1">
                  {user?.profile?.firstName?.[0] || 'U'}
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      {/* Suggested prompts */}
      {messages.length === 1 && (
        <div className="px-4 mb-2">
          <p className="text-xs text-on-surface-variant mb-2">Suggested questions</p>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
            {SUGGESTED_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                onClick={() => sendMessage(prompt)}
                className="glass rounded-full px-4 py-2 text-xs text-on-surface-variant whitespace-nowrap hover:text-on-surface hover:bg-white/10 transition-all duration-200 flex-shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="glass-nav fixed bottom-0 left-0 right-0 px-4 py-3 safe-area-pb">
        <div className="flex items-end gap-2 max-w-3xl mx-auto">
          <button className="glass p-2.5 rounded-xl text-on-surface-variant hover:text-on-surface transition-colors flex-shrink-0 mb-0.5" aria-label="Attach file">
            <Paperclip className="w-4 h-4" />
          </button>
          <div className="flex-1 glass rounded-2xl flex items-end gap-2 px-4 py-2.5 min-h-[44px]">
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() } }}
              placeholder="Ask about any government service..."
              className="flex-1 bg-transparent text-on-surface placeholder-on-surface-variant/60 text-sm outline-none resize-none"
              disabled={loading}
              aria-label="Type your message"
            />
          </div>
          <button
            className="glass p-2.5 rounded-xl text-on-surface-variant hover:text-on-surface transition-colors flex-shrink-0 mb-0.5"
            aria-label="Voice input"
          >
            <Mic className="w-4 h-4" />
          </button>
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading}
            className="btn-primary p-2.5 rounded-xl flex-shrink-0 mb-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Send message"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  )
}

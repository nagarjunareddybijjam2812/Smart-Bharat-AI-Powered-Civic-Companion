'use client'

import { use, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, User, MapPin, Calendar, FileText, CheckCircle, AlertTriangle, Send } from 'lucide-react'

export default function CaseDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params)
  const [remarks, setRemarks] = useState('')

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 rounded-lg hover:bg-white/5 transition-colors" style={{ color: '#b2c5ff' }}>
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold" style={{ color: '#d8e2ff' }}>Case #{params.id}</h1>
                <span className="text-xs font-bold px-2 py-1 rounded" style={{ background: 'rgba(255,82,82,0.1)', color: '#ff5252' }}>HIGH PRIORITY</span>
              </div>
              <p className="text-sm" style={{ color: '#8d90a0' }}>Street light broken in Sector 4</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 rounded-xl text-sm font-semibold transition-colors border hover:bg-white/5" style={{ borderColor: '#ff5252', color: '#ff5252' }}>
              Reject / Escalate
            </button>
            <button className="px-4 py-2 rounded-xl text-sm font-semibold transition-colors" style={{ background: '#40e56c', color: '#000' }}>
              Mark as Resolved
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            <div className="rounded-2xl p-6 border" style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)' }}>
              <h2 className="text-lg font-semibold mb-4" style={{ color: '#d8e2ff' }}>Complaint Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider mb-1 block" style={{ color: '#8d90a0' }}>Description</label>
                  <p className="text-sm leading-relaxed" style={{ color: '#d8e2ff' }}>The street light pole near the main park entrance has been broken for 3 days. It is completely dark at night and posing a safety risk for residents walking in the evening.</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider mb-1 block" style={{ color: '#8d90a0' }}>Location</label>
                    <div className="flex items-center gap-2 text-sm" style={{ color: '#d8e2ff' }}>
                      <MapPin className="w-4 h-4" style={{ color: '#0052cc' }} />
                      Sector 4, Main Park Entrance, Delhi
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider mb-1 block" style={{ color: '#8d90a0' }}>Date Submitted</label>
                    <div className="flex items-center gap-2 text-sm" style={{ color: '#d8e2ff' }}>
                      <Calendar className="w-4 h-4" style={{ color: '#0052cc' }} />
                      July 7, 2026
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl p-6 border" style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)' }}>
              <h2 className="text-lg font-semibold mb-4" style={{ color: '#d8e2ff' }}>Resolution Timeline</h2>
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full border-4 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow" style={{ borderColor: 'rgba(0,0,0,0.5)', background: '#0052cc' }}>
                    <span className="w-2 h-2 rounded-full" style={{ background: '#fff' }} />
                  </div>
                  <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] p-4 rounded-xl border shadow" style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-bold text-sm" style={{ color: '#d8e2ff' }}>Complaint Submitted</div>
                      <time className="font-mono text-xs" style={{ color: '#8d90a0' }}>10:30 AM</time>
                    </div>
                    <div className="text-xs" style={{ color: '#8d90a0' }}>System assigned Case ID #{params.id}</div>
                  </div>
                </div>

                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full border-4 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow" style={{ borderColor: 'rgba(0,0,0,0.5)', background: 'transparent' }}>
                  </div>
                  <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] p-4 rounded-xl border shadow" style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.05)' }}>
                    <div className="font-bold text-sm" style={{ color: '#d8e2ff' }}>Assigned to Officer</div>
                    <div className="text-xs mt-1" style={{ color: '#8d90a0' }}>Pending review</div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl p-6 border" style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)' }}>
              <h2 className="text-sm font-semibold mb-4 uppercase tracking-wider" style={{ color: '#8d90a0' }}>Citizen Profile</h2>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,82,204,0.2)' }}>
                  <User className="w-6 h-6" style={{ color: '#b2c5ff' }} />
                </div>
                <div>
                  <div className="font-bold text-sm" style={{ color: '#d8e2ff' }}>Aarav Sharma</div>
                  <div className="text-xs" style={{ color: '#8d90a0' }}>Verified Citizen (Aadhaar)</div>
                </div>
              </div>
              <button className="w-full py-2 rounded-lg border text-xs font-semibold hover:bg-white/5 transition-colors" style={{ borderColor: 'rgba(255,255,255,0.1)', color: '#b2c5ff' }}>
                View Full Profile
              </button>
            </div>

            <div className="rounded-2xl p-6 border" style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)' }}>
              <h2 className="text-sm font-semibold mb-4 uppercase tracking-wider" style={{ color: '#8d90a0' }}>Officer Remarks</h2>
              <textarea
                className="w-full h-32 p-3 rounded-xl outline-none text-sm resize-none mb-3"
                placeholder="Type your official remarks here. These will be visible to the citizen..."
                value={remarks}
                onChange={e => setRemarks(e.target.value)}
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#d8e2ff' }}
              />
              <button className="w-full py-2 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold transition-colors" style={{ background: '#0052cc', color: '#fff' }}>
                <Send className="w-4 h-4" />
                Post Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

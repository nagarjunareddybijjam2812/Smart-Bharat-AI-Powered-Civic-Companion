'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { CheckCircle, XCircle, Clock, Search, Filter, AlertCircle, FileText, MoreVertical } from 'lucide-react'

const mockCases = [
  { id: '10294', type: 'COMPLAINT', title: 'Street light broken in Sector 4', priority: 'HIGH', status: 'OPEN', date: '2026-07-07', citizen: 'Aarav Sharma' },
  { id: '10295', type: 'APPLICATION', title: 'Income Certificate Request', priority: 'MEDIUM', status: 'UNDER_REVIEW', date: '2026-07-06', citizen: 'Priya Patel' },
  { id: '10296', type: 'COMPLAINT', title: 'Garbage not collected', priority: 'LOW', status: 'OPEN', date: '2026-07-05', citizen: 'Vikram Verma' },
  { id: '10297', type: 'APPLICATION', title: 'Domicile Certificate Request', priority: 'MEDIUM', status: 'ADDITIONAL_INFO_REQUIRED', date: '2026-07-04', citizen: 'Neha Singh' },
]

export default function OfficerDashboard() {
  const [activeTab, setActiveTab] = useState('ALL')

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: '#d8e2ff' }}>Officer Workspace</h1>
            <p className="text-sm" style={{ color: '#8d90a0' }}>Case Management & Approvals Queue</p>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm" style={{ background: 'rgba(255,176,32,0.1)', color: '#ffb020' }}>
              <Clock className="w-4 h-4" />
              12 Pending Cases
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {[
            { label: 'Assigned to Me', value: '12', icon: FileText, color: '#b2c5ff' },
            { label: 'Escalated Issues', value: '3', icon: AlertCircle, color: '#ff5252' },
            { label: 'Resolved Today', value: '8', icon: CheckCircle, color: '#40e56c' },
          ].map((stat) => (
            <div key={stat.label} className="p-6 rounded-2xl border flex items-center justify-between" style={{ background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.1)' }}>
              <div>
                <div className="text-sm font-medium mb-1" style={{ color: '#8d90a0' }}>{stat.label}</div>
                <div className="text-3xl font-bold" style={{ color: '#d8e2ff' }}>{stat.value}</div>
              </div>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.2)' }}>
                <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
              </div>
            </div>
          ))}
        </div>

        {/* Workspace Container */}
        <div className="rounded-2xl border flex overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)', minHeight: '500px' }}>
          
          {/* Sidebar Tabs */}
          <div className="w-64 border-r p-4 space-y-2" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            {['ALL', 'COMPLAINTS', 'APPLICATIONS', 'ESCALATED'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all"
                style={{
                  background: activeTab === tab ? 'rgba(0,82,204,0.3)' : 'transparent',
                  color: activeTab === tab ? '#d8e2ff' : '#8d90a0'
                }}
              >
                {tab.replace('_', ' ')}
              </button>
            ))}
          </div>

          {/* Main List */}
          <div className="flex-1 p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#8d90a0' }} />
                <input
                  type="text"
                  placeholder="Search cases by ID or title..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl outline-none text-sm"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#d8e2ff' }}
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#b2c5ff' }}>
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>

            <div className="space-y-3">
              {mockCases.map((c, i) => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="p-4 rounded-xl border hover:bg-white/5 transition-colors group cursor-pointer"
                  style={{ borderColor: 'rgba(255,255,255,0.08)' }}
                >
                  <Link href={`/cases/${c.id}`} className="block">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-xs font-bold px-2 py-0.5 rounded" style={{
                            background: c.type === 'COMPLAINT' ? 'rgba(255,82,82,0.1)' : 'rgba(0,184,217,0.1)',
                            color: c.type === 'COMPLAINT' ? '#ff5252' : '#00b8d9'
                          }}>
                            {c.type}
                          </span>
                          <span className="text-xs font-mono" style={{ color: '#8d90a0' }}>#{c.id}</span>
                          <span className="text-xs font-medium px-2 py-0.5 rounded" style={{
                            background: c.priority === 'HIGH' ? 'rgba(255,82,82,0.1)' : 'rgba(255,176,32,0.1)',
                            color: c.priority === 'HIGH' ? '#ff5252' : '#ffb020'
                          }}>
                            {c.priority} Priority
                          </span>
                        </div>
                        <h3 className="font-semibold text-lg mb-1" style={{ color: '#d8e2ff' }}>{c.title}</h3>
                        <p className="text-sm" style={{ color: '#8d90a0' }}>Submitted by {c.citizen} on {c.date}</p>
                      </div>
                      <div className="text-right flex flex-col items-end gap-2">
                        <span className="text-xs font-semibold px-2 py-1 rounded" style={{ background: 'rgba(255,255,255,0.05)', color: '#b2c5ff' }}>
                          {c.status.replace('_', ' ')}
                        </span>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-xs hover:underline" style={{ color: '#0052cc' }}>View Details &rarr;</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

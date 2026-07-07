'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, ShieldAlert, CheckCircle, Clock, AlertTriangle, TrendingDown } from 'lucide-react'

const mockComplaints = [
  { id: 'cmp_1', title: 'Street light broken in Sector 4', priority: 'HIGH', status: 'OPEN', dept: 'Electricity', date: '2026-07-07' },
  { id: 'cmp_2', title: 'Water leakage near main road', priority: 'CRITICAL', status: 'ESCALATED', dept: 'Water_Sanitation', date: '2026-07-06' },
  { id: 'cmp_3', title: 'Garbage not collected for 3 days', priority: 'MEDIUM', status: 'IN_PROGRESS', dept: 'Municipal', date: '2026-07-05' },
  { id: 'cmp_4', title: 'Potholes on Highway 9', priority: 'HIGH', status: 'RESOLVED', dept: 'Transport', date: '2026-07-01' },
]

export default function ComplaintsAnalyticsPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/" className="p-2 rounded-lg hover:bg-white/5 transition-colors" style={{ color: '#b2c5ff' }}>
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: '#d8e2ff' }}>Complaint Analytics</h1>
            <p className="text-sm" style={{ color: '#8d90a0' }}>Monitor civic issues and resolution SLA</p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Open Complaints', value: '847', icon: ShieldAlert, color: '#ff5252' },
            { label: 'In Progress', value: '312', icon: Clock, color: '#ffb020' },
            { label: 'Resolved (7d)', value: '1,492', icon: CheckCircle, color: '#40e56c' },
            { label: 'Avg Resolution Time', value: '4.2 days', icon: TrendingDown, color: '#00b8d9' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl p-5 border"
              style={{ background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(40px)' }}
            >
              <stat.icon className="w-5 h-5 mb-3" style={{ color: stat.color }} />
              <div className="text-2xl font-bold mb-1" style={{ color: '#d8e2ff' }}>{stat.value}</div>
              <div className="text-sm" style={{ color: '#8d90a0' }}>{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="rounded-2xl overflow-hidden border" style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)' }}>
          <div className="p-4 border-b flex justify-between items-center" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <h2 className="font-semibold" style={{ color: '#d8e2ff' }}>Recent Critical Escalations</h2>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <th className="px-6 py-4 text-xs font-semibold" style={{ color: '#8d90a0' }}>Issue</th>
                <th className="px-6 py-4 text-xs font-semibold" style={{ color: '#8d90a0' }}>Department</th>
                <th className="px-6 py-4 text-xs font-semibold" style={{ color: '#8d90a0' }}>Priority</th>
                <th className="px-6 py-4 text-xs font-semibold" style={{ color: '#8d90a0' }}>Status</th>
                <th className="px-6 py-4 text-xs font-semibold" style={{ color: '#8d90a0' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {mockComplaints.map((c, i) => (
                <motion.tr
                  key={c.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                  className="hover:bg-white/5 transition-colors"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                >
                  <td className="px-6 py-4 font-medium" style={{ color: '#d8e2ff' }}>{c.title}</td>
                  <td className="px-6 py-4 text-sm" style={{ color: '#8d90a0' }}>{c.dept.replace('_', ' ')}</td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold px-2 py-1 rounded" style={{
                      background: c.priority === 'CRITICAL' ? 'rgba(255,82,82,0.1)' : 'rgba(255,176,32,0.1)',
                      color: c.priority === 'CRITICAL' ? '#ff5252' : '#ffb020'
                    }}>
                      {c.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm" style={{ color: '#d8e2ff' }}>{c.status}</td>
                  <td className="px-6 py-4 text-sm" style={{ color: '#8d90a0' }}>{c.date}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

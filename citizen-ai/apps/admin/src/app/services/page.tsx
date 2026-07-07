'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, FileText, Plus, Settings2, UploadCloud } from 'lucide-react'

const mockServices = [
  { id: 'srv_1', name: 'Birth Certificate', dept: 'Civil Registration', apps: '12,492', status: 'ACTIVE' },
  { id: 'srv_2', name: 'Driving License Renewal', dept: 'Transport', apps: '45,102', status: 'ACTIVE' },
  { id: 'srv_3', name: 'Water Connection', dept: 'Municipal', apps: '8,391', status: 'MAINTENANCE' },
  { id: 'srv_4', name: 'Property Tax Payment', dept: 'Revenue', apps: '89,412', status: 'ACTIVE' },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 rounded-lg hover:bg-white/5 transition-colors" style={{ color: '#b2c5ff' }}>
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold" style={{ color: '#d8e2ff' }}>Services & Schemes</h1>
              <p className="text-sm" style={{ color: '#8d90a0' }}>Manage digital government services</p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors" style={{ background: '#0052cc', color: '#fff' }}>
            <Plus className="w-4 h-4" />
            Add Service
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="col-span-2 rounded-2xl border overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)' }}>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <th className="px-6 py-4 text-xs font-semibold" style={{ color: '#8d90a0' }}>Service Name</th>
                  <th className="px-6 py-4 text-xs font-semibold" style={{ color: '#8d90a0' }}>Department</th>
                  <th className="px-6 py-4 text-xs font-semibold" style={{ color: '#8d90a0' }}>Applications</th>
                  <th className="px-6 py-4 text-xs font-semibold" style={{ color: '#8d90a0' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {mockServices.map((srv, i) => (
                  <motion.tr
                    key={srv.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="hover:bg-white/5 transition-colors"
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                  >
                    <td className="px-6 py-4 font-medium" style={{ color: '#d8e2ff' }}>{srv.name}</td>
                    <td className="px-6 py-4 text-sm" style={{ color: '#8d90a0' }}>{srv.dept}</td>
                    <td className="px-6 py-4 text-sm" style={{ color: '#d8e2ff' }}>{srv.apps}</td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-bold px-2 py-1 rounded" style={{
                        background: srv.status === 'ACTIVE' ? 'rgba(64,229,108,0.1)' : 'rgba(255,176,32,0.1)',
                        color: srv.status === 'ACTIVE' ? '#40e56c' : '#ffb020'
                      }}>
                        {srv.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="rounded-2xl p-6 border flex flex-col gap-6" style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)' }}>
            <h3 className="font-bold text-lg" style={{ color: '#d8e2ff' }}>Quick Actions</h3>
            
            <button className="w-full flex items-center gap-3 p-4 rounded-xl border hover:bg-white/5 transition-all text-left" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(0,82,204,0.2)' }}>
                <UploadCloud className="w-5 h-5" style={{ color: '#b2c5ff' }} />
              </div>
              <div>
                <div className="font-semibold text-sm" style={{ color: '#d8e2ff' }}>Bulk Import Services</div>
                <div className="text-xs mt-0.5" style={{ color: '#8d90a0' }}>Upload CSV or JSON schema</div>
              </div>
            </button>

            <button className="w-full flex items-center gap-3 p-4 rounded-xl border hover:bg-white/5 transition-all text-left" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(0,184,217,0.2)' }}>
                <Settings2 className="w-5 h-5" style={{ color: '#00b8d9' }} />
              </div>
              <div>
                <div className="font-semibold text-sm" style={{ color: '#d8e2ff' }}>Configure RAG Embeddings</div>
                <div className="text-xs mt-0.5" style={{ color: '#8d90a0' }}>Update AI knowledge base</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

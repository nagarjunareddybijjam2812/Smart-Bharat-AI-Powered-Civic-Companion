'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Search, UserPlus, Filter, MoreHorizontal, ArrowLeft } from 'lucide-react'

const mockUsers = [
  { id: 'usr_1', name: 'Aarav Sharma', email: 'aarav@example.com', role: 'CITIZEN', status: 'ACTIVE', joinDate: '2025-10-12' },
  { id: 'usr_2', name: 'Priya Patel', email: 'priya@example.com', role: 'OFFICER', status: 'ACTIVE', joinDate: '2024-03-01' },
  { id: 'usr_3', name: 'Rohan Kumar', email: 'rohan@example.com', role: 'CITIZEN', status: 'SUSPENDED', joinDate: '2025-12-05' },
  { id: 'usr_4', name: 'Neha Singh', email: 'neha.admin@civic.gov', role: 'ADMIN', status: 'ACTIVE', joinDate: '2023-01-15' },
  { id: 'usr_5', name: 'Vikram Verma', email: 'vikram@example.com', role: 'CITIZEN', status: 'ACTIVE', joinDate: '2026-02-20' },
]

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 rounded-lg hover:bg-white/5 transition-colors" style={{ color: '#b2c5ff' }}>
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold" style={{ color: '#d8e2ff' }}>User Management</h1>
              <p className="text-sm" style={{ color: '#8d90a0' }}>Manage citizens, officers, and system administrators</p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors" style={{ background: '#0052cc', color: '#fff' }}>
            <UserPlus className="w-4 h-4" />
            Add User
          </button>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#8d90a0' }} />
            <input
              type="text"
              placeholder="Search by name, email, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl outline-none text-sm"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#d8e2ff' }}
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#b2c5ff' }}>
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>

        {/* Table */}
        <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <th className="px-6 py-4 text-xs font-semibold" style={{ color: '#8d90a0' }}>Name & Email</th>
                <th className="px-6 py-4 text-xs font-semibold" style={{ color: '#8d90a0' }}>Role</th>
                <th className="px-6 py-4 text-xs font-semibold" style={{ color: '#8d90a0' }}>Status</th>
                <th className="px-6 py-4 text-xs font-semibold" style={{ color: '#8d90a0' }}>Joined</th>
                <th className="px-6 py-4 text-xs font-semibold text-right" style={{ color: '#8d90a0' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockUsers.filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase())).map((user, i) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group hover:bg-white/5 transition-colors"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                >
                  <td className="px-6 py-4">
                    <div className="font-medium" style={{ color: '#d8e2ff' }}>{user.name}</div>
                    <div className="text-xs" style={{ color: '#8d90a0' }}>{user.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded text-xs font-medium" style={{
                      background: user.role === 'ADMIN' ? 'rgba(255,82,82,0.1)' : user.role === 'OFFICER' ? 'rgba(0,184,217,0.1)' : 'rgba(255,255,255,0.05)',
                      color: user.role === 'ADMIN' ? '#ff5252' : user.role === 'OFFICER' ? '#00b8d9' : '#b2c5ff'
                    }}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ background: user.status === 'ACTIVE' ? '#40e56c' : '#ff5252' }} />
                      <span className="text-xs" style={{ color: '#d8e2ff' }}>{user.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm" style={{ color: '#8d90a0' }}>{user.joinDate}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-white/10" style={{ color: '#b2c5ff' }}>
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

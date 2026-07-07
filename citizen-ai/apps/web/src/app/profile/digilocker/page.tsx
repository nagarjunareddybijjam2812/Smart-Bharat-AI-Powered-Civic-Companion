'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, WalletCards, FileText, CheckCircle2, Download, ExternalLink, ShieldAlert } from 'lucide-react'

// Mock DigiLocker data
const MOCK_DOCUMENTS = [
  {
    id: 'aadhaar',
    name: 'Aadhaar Card',
    issuer: 'Unique Identification Authority of India',
    number: 'XXXX XXXX 1234',
    date: '14/05/2020',
    verified: true,
    color: 'from-orange-500/20 to-orange-600/10',
    iconColor: 'text-orange-500',
  },
  {
    id: 'pan',
    name: 'PAN Card',
    issuer: 'Income Tax Department',
    number: 'ABCDE1234F',
    date: '21/08/2018',
    verified: true,
    color: 'from-blue-500/20 to-blue-600/10',
    iconColor: 'text-blue-500',
  },
  {
    id: 'dl',
    name: 'Driving License',
    issuer: 'Ministry of Road Transport',
    number: 'DL-1420110012345',
    date: '10/02/2021',
    verified: true,
    color: 'from-green-500/20 to-green-600/10',
    iconColor: 'text-green-500',
  },
  {
    id: 'ssc',
    name: 'Class X Marksheet',
    issuer: 'CBSE',
    number: 'Roll No: 1234567',
    date: '28/05/2015',
    verified: true,
    color: 'from-purple-500/20 to-purple-600/10',
    iconColor: 'text-purple-500',
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
}

export default function DigiLockerPage() {
  return (
    <div className="min-h-screen">
      <div className="glass-nav sticky top-0 z-40 px-4 py-3">
        <div className="flex items-center gap-3">
          <Link href="/profile" className="glass p-2 rounded-xl text-on-surface-variant hover:text-on-surface transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="w-8 h-8 rounded-xl bg-primary-container flex items-center justify-center">
            <WalletCards className="w-4 h-4 text-on-primary" />
          </div>
          <h1 className="text-on-surface font-semibold flex-1">DigiLocker</h1>
        </div>
      </div>

      <main className="px-4 py-8 max-w-2xl mx-auto space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card-raised rounded-3xl p-6 relative overflow-hidden"
        >
          {/* Decorative background glow */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
          
          <div className="relative z-10 flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-green-500/20 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h2 className="text-on-surface font-bold text-lg mb-1">Account Linked</h2>
              <p className="text-on-surface-variant text-sm mb-3">
                Your DigiLocker account is successfully connected. You can seamlessly attach these documents to government applications.
              </p>
              <div className="flex items-center gap-2 text-xs font-medium text-primary bg-primary/10 w-fit px-3 py-1.5 rounded-lg">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>API Mock Mode Active</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-on-surface-variant tracking-wide">ISSUED DOCUMENTS</h3>
            <span className="text-xs bg-surface-container-high px-2 py-1 rounded-md text-on-surface-variant">
              {MOCK_DOCUMENTS.length} items
            </span>
          </div>

          {MOCK_DOCUMENTS.map((doc) => (
            <motion.div key={doc.id} variants={itemVariants} className="group cursor-pointer">
              <div className={`glass-card rounded-2xl p-5 relative overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-300`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${doc.color} opacity-50`} />
                
                <div className="relative z-10 flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center backdrop-blur-md border border-white/10`}>
                        <FileText className={`w-5 h-5 ${doc.iconColor}`} />
                      </div>
                      <div>
                        <h4 className="text-on-surface font-bold text-base">{doc.name}</h4>
                        <p className="text-on-surface-variant text-xs mt-0.5">{doc.issuer}</p>
                      </div>
                    </div>
                    {doc.verified && (
                      <div className="bg-green-500/20 px-2 py-1 rounded flex items-center gap-1 backdrop-blur-md">
                        <CheckCircle2 className="w-3 h-3 text-green-400" />
                        <span className="text-[10px] font-bold text-green-400 uppercase tracking-wider">Verified</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/5">
                    <div>
                      <div className="text-[10px] text-on-surface-variant/70 uppercase tracking-wider mb-0.5">Document No.</div>
                      <div className="text-sm font-mono text-on-surface/90">{doc.number}</div>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 rounded-lg bg-surface-container-high/50 hover:bg-white/10 text-on-surface-variant transition-colors" aria-label="Download">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg bg-surface-container-high/50 hover:bg-white/10 text-on-surface-variant transition-colors" aria-label="View Details">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  )
}

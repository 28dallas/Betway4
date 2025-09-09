'use client'

import { motion } from 'framer-motion'
import { Shield, Clock, DollarSign, AlertTriangle } from 'lucide-react'

export default function ResponsibleGambling() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-amber-900/20 border border-amber-700/50 rounded-lg p-6 mb-8"
    >
      <div className="flex items-center space-x-3 mb-4">
        <Shield className="text-amber-500" size={24} />
        <h3 className="text-lg font-semibold text-white">Responsible Gambling</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="flex items-center space-x-2 text-sm text-gray-300">
          <DollarSign size={16} className="text-amber-500" />
          <span>Set deposit limits</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-300">
          <Clock size={16} className="text-amber-500" />
          <span>Take regular breaks</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-300">
          <AlertTriangle size={16} className="text-amber-500" />
          <span>Gamble responsibly</span>
        </div>
      </div>
      
      <p className="text-sm text-gray-400 mb-3">
        Remember: Gambling should be fun. Never bet more than you can afford to lose.
      </p>
      
      <div className="flex flex-wrap gap-2">
        <button className="text-xs bg-amber-600 hover:bg-amber-700 text-white px-3 py-1 rounded">
          Set Limits
        </button>
        <button className="text-xs bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded">
          Self-Exclusion
        </button>
        <button className="text-xs bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded">
          Get Help
        </button>
      </div>
    </motion.div>
  )
}
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Sidebar from './Sidebar'
import Overview from './Overview'
import Orders from './Orders'
import Rewards from './Rewards'
import Profile from './Profile'
import EbinFinder from './EbinFinder'
import Marketplace from './Marketplace'
import PlaceOrder from './PlaceOrder'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isMobileView, setIsMobileView] = useState(false)

  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    router.push('/login')
  }

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  return (
    <div className="min-h-screen bg-green-50">
      {/* Header */}
      <header className="bg-green-800 text-white p-4 md:hidden">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <button onClick={toggleSidebar}>
            <Menu size={24} />
          </button>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)] md:h-screen">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          isMobileView={isMobileView}
          handleLogout={handleLogout}
        />

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto"
            >
              {activeTab === 'overview' && <Overview />}
              {activeTab === 'orders' && <Orders />}
              {activeTab === 'rewards' && <Rewards />}
              {activeTab === 'profile' && <Profile />}
              {activeTab === 'ebin finder' && <EbinFinder />}
              {activeTab === 'marketplace' && <Marketplace />}
              {activeTab === 'place order' && <PlaceOrder />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
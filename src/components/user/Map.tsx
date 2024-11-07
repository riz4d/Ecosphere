'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts'
import { User, Package, Award, LogOut, ChevronRight, Menu, X } from 'lucide-react'

// Mock data for charts
const ewasteData = [
  { name: 'Electronics', value: 400 },
  { name: 'Batteries', value: 300 },
  { name: 'Appliances', value: 200 },
  { name: 'Other', value: 100 },
]

const contributionData = [
  { month: 'Jan', amount: 65 },
  { month: 'Feb', amount: 59 },
  { month: 'Mar', amount: 80 },
  { month: 'Apr', amount: 81 },
  { month: 'May', amount: 56 },
  { month: 'Jun', amount: 55 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

// Mock data for recycled products
const recycledProducts = [
  { id: 1, name: 'Refurbished RAM 8GB', points: 500, image: '/placeholder.svg?height=100&width=100' },
  { id: 2, name: 'Recycled 1TB HDD', points: 800, image: '/placeholder.svg?height=100&width=100' },
  { id: 3, name: 'Eco-Friendly Mouse', points: 300, image: '/placeholder.svg?height=100&width=100' },
  { id: 4, name: 'Upcycled Keyboard', points: 600, image: '/placeholder.svg?height=100&width=100' },
]

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: '-100%' },
  }

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  useEffect(() => {
    // Add any necessary side effects here
  }, [])

  return (
    <div className="min-h-screen bg-green-50">
      {/* Header */}
      <header className="bg-green-800 text-white p-4 md:hidden">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">ECOSPHERE Dashboard</h1>
          <button onClick={toggleSidebar}>
            <Menu size={24} />
          </button>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)] md:h-screen">
        {/* Sidebar */}
        <AnimatePresence>
          {(isSidebarOpen || typeof window !== 'undefined' && window.innerWidth >= 768) && (
            <motion.aside
              initial="closed"
              animate="open"
              exit="closed"
              variants={sidebarVariants}
              transition={{ duration: 0.3 }}
              className="fixed md:static top-0 left-0 bottom-0 w-64 bg-green-800 text-white p-6 z-50"
            >
              <div className="flex justify-between items-center mb-6 md:mb-10">
                <h2 className="text-2xl font-bold">User Dashboard</h2>
                <button className="md:hidden" onClick={toggleSidebar}>
                  <X size={24} />
                </button>
              </div>
              <nav className="space-y-2">
                {['Overview', 'Orders', 'Rewards', 'Profile'].map((item) => (
                  <motion.button
                    key={item}
                    className={`flex items-center w-full text-left py-2 px-4 rounded-md ${
                      activeTab === item.toLowerCase() ? 'bg-green-700' : 'hover:bg-green-700'
                    }`}
                    onClick={() => {
                      setActiveTab(item.toLowerCase())
                      if (typeof window !== 'undefined' && window.innerWidth < 768) setIsSidebarOpen(false)
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item}
                    <ChevronRight className="ml-auto" size={16} />
                  </motion.button>
                ))}
              </nav>
              <motion.button
                className="flex items-center w-full text-left py-2 px-4 rounded-md mt-8 hover:bg-green-700"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogOut size={18} className="mr-2" />
                Logout
              </motion.button>
            </motion.aside>
          )}
        </AnimatePresence>

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
              {activeTab === 'overview' && (
                <div>
                  <h3 className="text-2xl font-bold mb-6">Overview</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="bg-white p-6 rounded-lg shadow-md"
                    >
                      <h4 className="text-lg font-semibold mb-4">E-Waste Contributions</h4>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={ewasteData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {ewasteData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="bg-white p-6 rounded-lg shadow-md"
                    >
                      <h4 className="text-lg font-semibold mb-4">Monthly Contributions</h4>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={contributionData}>
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="amount" fill="#10B981" />
                        </BarChart>
                      </ResponsiveContainer>
                    </motion.div>
                  </div>
                </div>
              )}

              {activeTab === 'orders' && (
                <div>
                  <h3 className="text-2xl font-bold mb-6">Order Tracking</h3>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white shadow-md rounded-lg p-6"
                  >
                    <div className="flex items-center mb-4">
                      <Package className="text-green-600 mr-2" />
                      <span className="font-semibold">Order #12345</span>
                    </div>
                    <p className="text-gray-600 mb-2">Status: In Transit</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <motion.div
                        className="bg-green-600 h-2.5 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: '60%' }}
                        transition={{ duration: 1, delay: 0.5 }}
                      ></motion.div>
                    </div>
                  </motion.div>
                </div>
              )}

              {activeTab === 'rewards' && (
                <div>
                  <h3 className="text-2xl font-bold mb-6">Rewards</h3>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white p-6 rounded-lg shadow-md text-center mb-8"
                  >
                    <Award className="text-yellow-500 w-16 h-16 mx-auto mb-4" />
                    <p className="text-4xl font-bold text-yellow-600 mb-2">1,250</p>
                    <p className="text-gray-600">Total Reward Points</p>
                  </motion.div>
                  <h4 className="text-xl font-semibold mb-4">Redeem Points for Recycled Products</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {recycledProducts.map((product) => (
                      <motion.div
                        key={product.id}
                        className="bg-white p-4 rounded-lg shadow-md"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: 0.1 * (product.id - 1),
                        }}
                      >
                        <img src={product.image} alt={product.name} className="w-full h-32 object-cover mb-4 rounded" />
                        <h5 className="font-semibold mb-2">{product.name}</h5>
                        <p className="text-green-600 font-bold mb-2">{product.points} points</p>
                        <button className="bg-green-600 text-white px-4 py-2 rounded-full text-sm hover:bg-green-700 transition-colors">
                          Redeem
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'profile' && (
                <div>
                  <h3 className="text-2xl font-bold mb-6">User Information</h3>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white shadow-md rounded-lg p-6"
                  >
                    <div className="flex items-center mb-4">
                      <User className="text-green-600 mr-2" />
                      <span className="font-semibold">John Doe</span>
                    </div>
                    <p className="text-gray-600 mb-2">Email: john.doe@example.com</p>
                    <p className="text-gray-600 mb-2">Member Since: January 1, 2023</p>
                    <p className="text-gray-600">Total Contributions: 1,050 kg</p>
                  </motion.div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
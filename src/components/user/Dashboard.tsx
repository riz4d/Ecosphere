'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts'
import { User, Package, Award, LogOut, ChevronRight, Menu, X, Bell, MapPin } from 'lucide-react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'

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
  { month: 'May', value: 56 },
  { month: 'Jun', value: 55 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']
const recycledProducts = [
  { id: 1, name: 'Refurbished RAM 8GB', points: 500, image: '/products/ram.jpg?height=100&width=100' },
  { id: 2, name: 'Recycled 1TB HDD', points: 800, image: '/products/hdd.jpg?height=100&width=100' },
  { id: 3, name: 'Eco-Friendly Mouse', points: 300, image: '/products/mouse.jpg?height=100&width=100' },
  { id: 4, name: 'Upcycled Keyboard', points: 600, image: '/products/key.jpg?height=100&width=100' },
]

const recentOrders = [
  { id: 1, orderNumber: '#12345', status: 'In Transit', date: '2023-06-15' },
  { id: 2, orderNumber: '#12346', status: 'Delivered', date: '2023-06-10' },
  { id: 3, orderNumber: '#12347', status: 'Processing', date: '2023-06-18' },
]

const notifications = [
  { id: 1, message: 'Your order #12345 has been shipped', date: '2023-06-16' },
  { id: 2, message: 'New recycling event in your area', date: '2023-06-14' },
  { id: 3, message: 'You\'ve earned 100 reward points', date: '2023-06-12' },
]

const ebinLocations = [
  { id: 1, name: 'City Center E-Bin', lat: 40.7128, lng: -74.0060 },
  { id: 2, name: 'Tech Park E-Bin', lat: 40.7282, lng: -74.0776 },
  { id: 3, name: 'Green Square E-Bin', lat: 40.7589, lng: -73.9851 },
]

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [mapCenter, setMapCenter] = useState({ lat: 40.7128, lng: -74.0060 })

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY" 
  })

  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: '-100%' },
  }

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  useEffect(() => {
    // In a real application, you would get the user's location here
    // and set it as the map center
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
          {(isSidebarOpen || window.innerWidth >= 768) && (
            <motion.aside
              initial="closed"
              animate="open"
              exit="closed"
              variants={sidebarVariants}
              transition={{ duration: 0.3 }}
              className="fixed md:static top-0 left-0 bottom-0 w-64 bg-green-800 text-white p-6 z-50"
            >
              <div className="flex justify-between items-center mb-6 md:mb-10">
                <h2 className="text-2xl font-bold">Dashboard</h2>
                <button className="md:hidden" onClick={toggleSidebar}>
                  <X size={24} />
                </button>
              </div>
              <nav className="space-y-2">
                {['Overview', 'Orders', 'Rewards', 'Profile', 'Ebin Finder'].map((item) => (
                  <motion.button
                    key={item}
                    className={`flex items-center w-full text-left py-2 px-4 rounded-md ${
                      activeTab === item.toLowerCase() ? 'bg-green-700' : 'hover:bg-green-700'
                    }`}
                    onClick={() => {
                      setActiveTab(item.toLowerCase())
                      if (window.innerWidth < 768) setIsSidebarOpen(false)
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
                  
                  {/* Recent Orders */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="bg-white p-6 rounded-lg shadow-md mt-6"
                  >
                    <h4 className="text-lg font-semibold mb-4">Recent Orders</h4>
                    <div className="space-y-4">
                      {recentOrders.map((order) => (
                        <div key={order.id} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{order.orderNumber}</p>
                            <p className="text-sm text-gray-600">{order.date}</p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                            order.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Notifications */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="bg-white p-6 rounded-lg shadow-md mt-6"
                  >
                    <h4 className="text-lg font-semibold mb-4">Notifications</h4>
                    <div className="space-y-4">
                      {notifications.map((notification) => (
                        <div key={notification.id} className="flex items-start">
                          <Bell className="text-green-600 mr-2 mt-1 flex-shrink-0" size={16} />
                          <div>
                            <p className="text-sm">{notification.message}</p>
                            <p className="text-xs text-gray-600">{notification.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
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
                      <span className="font-semibold">Riza</span>
                    </div>
                    <p className="text-gray-600 mb-2">Email: riza@example.com</p>
                    <p className="text-gray-600 mb-2">Member Since: January 1, 2023</p>
                    <p className="text-gray-600">Total Contributions: 1,050 kg</p>
                  </motion.div>
                </div>
              )}

              {activeTab === 'ebin finder' && (
                <div>
                  <h3 className="text-2xl font-bold mb-6">E-Bin Finder</h3>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white shadow-md rounded-lg p-6"
                  >
                    {isLoaded ? (
                      <GoogleMap
                        mapContainerStyle={{ width: '100%', height: '400px' }}
                        center={mapCenter}
                        zoom={12}
                      >
                        {ebinLocations.map((location) => (
                          <Marker
                            key={location.id}
                            position={{ lat: location.lat, lng: location.lng }}
                            title={location.name}
                          />
                        ))}
                      </GoogleMap>
                    ) : (
                      <div>Loading map...</div>
                    )}
                    <div className="mt-4">
                      <h4 className="text-lg font-semibold mb-2">Nearby E-Bins</h4>
                      <ul className="space-y-2">
                        {ebinLocations.map((location) => (
                          <li key={location.id} className="flex items-start">
                            <MapPin className="text-green-600 mr-2 mt-1 flex-shrink-0" size={16} />
                            <span>{location.name}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
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
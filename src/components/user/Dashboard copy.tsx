'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts'
import { User, Package, Award, LogOut, ChevronRight, Menu, X, Bell, MapPin, ShoppingCart, Calendar, Clock } from 'lucide-react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

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
  { id: 1, name: 'Refurbished RAM 8GB', points: 500, image: '/placeholder.svg?height=100&width=100' },
  { id: 2, name: 'Recycled 1TB HDD', points: 800, image: '/placeholder.svg?height=100&width=100' },
  { id: 3, name: 'Eco-Friendly Mouse', points: 300, image: '/placeholder.svg?height=100&width=100' },
  { id: 4, name: 'Upcycled Keyboard', points: 600, image: '/placeholder.svg?height=100&width=100' },
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

const marketplaceProducts = [
  { id: 1, name: 'Recycled Laptop Stand', price: 1200, image: '/placeholder.svg?height=100&width=100' },
  { id: 2, name: 'Upcycled Desk Organizer', price: 800, image: '/placeholder.svg?height=100&width=100' },
  { id: 3, name: 'Eco-Friendly Phone Case', price: 500, image: '/placeholder.svg?height=100&width=100' },
  { id: 4, name: 'Refurbished Bluetooth Speaker', price: 1500, image: '/placeholder.svg?height=100&width=100' },
]

export default function Component() {
  const [activeTab, setActiveTab] = useState('overview')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isMobileView, setIsMobileView] = useState(false)
  const [mapCenter, setMapCenter] = useState({ lat: 40.7128, lng: -74.0060 })
  const [isLoading, setIsLoading] = useState(false)

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
    if (typeof window !== 'undefined') {
      const handleResize = () => setIsMobileView(window.innerWidth < 768)
      handleResize() // Initial check
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  const router = useRouter()
  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    router.push('/login')
  }

  const handlePlaceOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const orderData = Object.fromEntries(formData.entries())
    const userId = localStorage.getItem('userid');
    if (userId) {
      orderData.userId = userId;
    }
    try {
      const response = await fetch('http://localhost/api/placeorder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      })

      if (!response.ok) {
        throw new Error('Failed to place order')
      }

      toast({
        title: "Order Placed Successfully!",
        description: "Thank you for contributing to e-waste recycling. We'll be in touch soon.",
      })
      setActiveTab('orders')
    } catch (error) {
      console.error('Error placing order:', error)
      toast({
        title: "Error",
        description: "Failed to place order. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

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
          {(isSidebarOpen || !isMobileView) && (
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
                {['Overview', 'Orders', 'Rewards', 'Profile', 'Ebin Finder', 'Marketplace', 'Place Order'].map((item) => (
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
                onClick={handleLogout}
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
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={100}
                          height={100}
                          className="w-full h-32 object-cover mb-4 rounded"
                        />
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

              {activeTab === 'marketplace' && (
                <div>
                  <h3 className="text-2xl font-bold mb-6">Marketplace</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {marketplaceProducts.map((product) => (
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
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={100}
                          height={100}
                          className="w-full h-32 object-cover mb-4 rounded"
                        />
                        <h5 className="font-semibold mb-2">{product.name}</h5>
                        <p className="text-green-600 font-bold mb-2">₹{product.price}</p>
                        <button className="bg-green-600 text-white px-4 py-2 rounded-full text-sm hover:bg-green-700 transition-colors flex items-center justify-center w-full">
                          <ShoppingCart className="mr-2" size={16} />
                          Add to Cart
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'place order' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-2xl font-bold mb-6">Place E-Waste Collection Order</h3>
                  <form onSubmit={handlePlaceOrder} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
                    <div>
                      <label htmlFor="wasteType" className="block text-sm font-medium text-gray-700 mb-1">
                        E-Waste Type
                      </label>
                      <Select name="wasteType">
                        <SelectTrigger>
                          <SelectValue placeholder="Select e-waste type" />
                        </SelectTrigger>
                        <SelectContent className='bg-white'>
                          <SelectItem value="electronics">Electronics</SelectItem>
                          <SelectItem value="batteries">Batteries</SelectItem>
                          <SelectItem value="appliances">Appliances</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <Textarea
                        id="description"
                        name="description"
                        placeholder="Briefly describe the e-waste items"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                          Preferred Collection Date
                        </label>
                        <div className="relative">
                          <Input type="date" id="date" name="date" required />
                          <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                          Preferred Time Slot
                        </label>
                        <div className="relative">
                          <Input type="time" id="time" name="time" required />
                          <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Collection Address
                      </label>
                      <div className="relative">
                        <Textarea
                          id="address"
                          name="address"
                          placeholder="Enter your full address"
                          required
                        />
                        <MapPin className="absolute right-3 top-3 text-gray-400" size={18} />
                      </div>
                    </div>

                    <motion.button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    whileHover={{ scale: .95 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={isLoading}
                  >
                      {isLoading ? 'Placing Order...' : 'Place Order'}
                    </motion.button>
                  </form>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
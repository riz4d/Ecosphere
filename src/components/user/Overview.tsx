import { motion } from 'framer-motion'
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts'
import { Bell } from 'lucide-react'

// Mock data (you can move this to a separate file)
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

export default function Overview() {
  return (
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
  )
}
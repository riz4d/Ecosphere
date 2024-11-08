'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Package } from 'lucide-react'
import { initializeApp } from 'firebase/app'
import { getDatabase, ref, onValue } from 'firebase/database'

// Initialize Firebase (replace with your config)
const firebaseConfig = {
  apiKey: "AIzaSyACfCmDYTQOT6rbkZJdqLryqIvYLtZWXmI",
  authDomain: "ecosphere-ad059.firebaseapp.com",
  databaseURL: "https://ecosphere-ad059-default-rtdb.firebaseio.com",
  projectId: "ecosphere-ad059",
  storageBucket: "ecosphere-ad059.firebasestorage.app",
  messagingSenderId: "533056162099",
  appId: "1:533056162099:web:895f4f1e961caceecb1646"
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)

interface Order {
  id: string
  address: string
  date: string
  description: string
  time: string
  userId: string
  wasteType: string
  status: number
}

export default function Component() {
  const [orders, setOrders] = useState<Order[]>([])
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    // Fetch user ID from local storage
    const storedUserId = localStorage.getItem('userid')
    setUserId(storedUserId)

    if (storedUserId) {
      const ordersRef = ref(database, 'orders')
      onValue(ordersRef, (snapshot) => {
        const data = snapshot.val()
        const loadedOrders: Order[] = []
        for (const phoneNumber in data) {
          for (const orderId in data[phoneNumber]) {
            if (data[phoneNumber][orderId].userId === storedUserId) {
              loadedOrders.push({
                id: orderId,
                ...data[phoneNumber][orderId],
              })
            }
          }
        }
        setOrders(loadedOrders)
      })
    }
  }, [])

  if (!userId) {
    return <div className="text-center mt-8">Please log in to view your orders.</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h3 className="text-2xl font-bold mb-6">Your Orders</h3>
      {orders.length === 0 ? (
        <div className="text-center mt-8">You have no orders yet.</div>
      ) : (
        orders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white shadow-md rounded-lg p-6 mb-4"
          >
            <div className="flex items-center mb-4">
              <Package className="text-green-600 mr-2" />
              <span className="font-semibold">Order #{order.id.slice(0, 8)}</span>
            </div>
            <p className="text-gray-600 mb-2">Address: {order.address}</p>
            <p className="text-gray-600 mb-2">Date: {order.date}</p>
            <p className="text-gray-600 mb-2">Time: {order.time}</p>
            <p className="text-gray-600 mb-2">Waste Type: {order.wasteType}</p>
            <p className="text-gray-600 mb-2">Description: {order.description}</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
              <motion.div
                className="bg-green-600 h-2.5 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${order.status}%` }}
                transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
              ></motion.div>
            </div>
          </motion.div>
        ))
      )}
    </div>
  )
}
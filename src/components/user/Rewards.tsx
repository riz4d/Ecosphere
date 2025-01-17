'use client'

import { motion } from 'framer-motion'
import { Award } from 'lucide-react'
import Image from 'next/image'
import { initializeApp } from 'firebase/app'
import { getDatabase, ref, onValue } from 'firebase/database'
import { useState, useEffect } from 'react'

const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  databaseURL: "your-database-url",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)

const recycledProducts = [
  { id: 1, name: 'Refurbished RAM 8GB', points: 500, image: '/products/ram.jpg?height=100&width=100' },
  { id: 2, name: 'Recycled 1TB HDD', points: 800, image: '/products/hdd.jpg?height=100&width=100' },
  { id: 3, name: 'Eco-Friendly Mouse', points: 300, image: '/products/mouse.jpg?height=100&width=100' },
  { id: 4, name: 'Upcycled Keyboard', points: 600, image: '/products/key.jpg?height=100&width=100' },
]

export default function Rewards() {
  const [rewardPoints, setRewardPoints] = useState(0)

  useEffect(() => {
    const userId = localStorage.getItem('userid')
    if (userId) {
      const userRef = ref(database, `users/${userId}`)
      onValue(userRef, (snapshot) => {
        const userData = snapshot.val()
        if (userData && userData.rewardPoints) {
          setRewardPoints(userData.rewardPoints)
        }
      })
    }
  }, [])

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6">Rewards</h3>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 rounded-lg shadow-md text-center mb-8"
      >
        <Award className="text-yellow-500 w-16 h-16 mx-auto mb-4" />
        <p className="text-4xl font-bold text-yellow-600 mb-2">{rewardPoints}</p>
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
            <button 
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                rewardPoints >= product.points
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              disabled={rewardPoints < product.points}
            >
              Redeem
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
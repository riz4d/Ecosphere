'use client'

import { motion } from 'framer-motion'
import { User } from 'lucide-react'
import { initializeApp } from 'firebase/app'
import { getDatabase, ref, onValue } from 'firebase/database'
import { useEffect, useState } from 'react'

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

interface Profile {
  name: string
  email: string
  number: string
}

export default function Profile() {
  const [profile, setProfile] = useState<Profile | null>(null)

  useEffect(() => {
    const userId = localStorage.getItem('userid')
    if (userId) {
      const userRef = ref(database, `users/${userId}`)
      onValue(userRef, (snapshot) => {
        const data = snapshot.val()
        if (data) {
          setProfile({
            name: data.name,
            email: data.email,
            number: data.number
          })
        }
      })
    }
  }, [])

  if (!profile) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-slate-200 h-10 w-10"></div>
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 bg-slate-200 rounded"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                <div className="h-2 bg-slate-200 rounded col-span-1"></div>
              </div>
              <div className="h-2 bg-slate-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
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
          <span className="font-semibold">{profile.name}</span>
        </div>
        <p className="text-gray-600 mb-2">Email: {profile.email}</p>
        <p className="text-gray-600 mb-2">Phone: {profile.number}</p>
      </motion.div>
    </div>
  )
}
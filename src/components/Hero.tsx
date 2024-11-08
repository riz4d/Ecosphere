'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Leaf } from 'lucide-react'
import Link from 'next/link'
export default function HeroSection() {
  const [positions, setPositions] = useState<{ x: number; y: number; scale: number; rotate: number }[]>([]);

  useEffect(() => {
    const initialPositions = [...Array(20)].map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      scale: 0,
      rotate: Math.random() * 360
    }));
    setPositions(initialPositions);
  }, []);

  return (
    <motion.section 
      className="h-screen flex flex-col justify-center items-center bg-gradient-to-b from-green-100 to-green-200 overflow-hidden relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2 }}
      >
        {positions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              x: pos.x,
              y: pos.y,
              scale: pos.scale,
              rotate: pos.rotate
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              scale: [null, Math.random() + 0.5],
              rotate: [null, Math.random() * 360]
            }}
            transition={{
              duration: Math.random() * 10 + 20,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
          >
            <Leaf className="text-green-500 w-8 h-8" />
          </motion.div>
        ))}
      </motion.div>

      <div className="text-center z-10 px-4 max-w-4xl mx-auto">
        <motion.h1 
          className="text-5xl md:text-7xl font-bold text-green-800 mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Welcome to ECOSPHERE
        </motion.h1>
        <motion.p 
          className="text-xl md:text-2xl text-green-700 mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Join us in creating a sustainable future. Explore our eco-friendly services and make a positive impact on the environment.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <Link 
          href={"login"}>
          <motion.button
            className="bg-green-600 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-green-700 transition-colors shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.button>
          </Link>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.5 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
        >
          <Leaf className="text-green-600 w-8 h-8" />
        </motion.div>
      </motion.div>
    </motion.section>
  )
}
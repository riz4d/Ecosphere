'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Leaf, Recycle, Users, Globe } from 'lucide-react'
import Image from 'next/image'
import { useRef } from 'react'

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
}

const TeamMember = ({ name, role, image }: TeamMemberProps) => (
  <motion.div
    className="flex flex-col items-center p-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Image
      src={image}
      alt={name}
      width={150}
      height={150}
      className="rounded-full mb-4"
    />
    <h3 className="text-xl font-semibold text-green-800">{name}</h3>
    <p className="text-gray-600">{role}</p>
  </motion.div>
)

interface ValueCardProps {
  icon: React.ComponentType;
  title: string;
  description: string;
  index: number;
}

const ValueCard = ({ icon: Icon, title, description, index }: ValueCardProps) => {
  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col justify-between"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
    >
      <div>
        <Icon className="w-12 h-12 text-green-600 mb-4" />
        <h3 className="text-xl font-semibold text-green-800 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  )
}

const AnimatedWord = ({ word }: { word: string }) => {
  const letters = Array.from(word)
  return (
    <div className="inline-block">
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="inline-block"
        >
          {letter}
        </motion.span>
      ))}
    </div>
  )
}

export default function AboutPage() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  return (
    <div className="min-h-screen bg-green-50">
      <main className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <motion.section
          ref={ref}
          className="mb-24 relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.div style={{ y }} className="absolute inset-0 z-0">
            <Image
              src="/placeholder.svg?height=400&width=800"
              alt="Nature background"
              layout="fill"
              objectFit="cover"
              className="opacity-20"
            />
          </motion.div>
          <div className="relative z-10">
            <h2 className="text-4xl sm:text-5xl font-bold text-green-800 mb-8 text-center">
              Our Mission
            </h2>
            <div className="relative bg-white bg-opacity-80 rounded-lg p-8 shadow-lg">
              <motion.p
                className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                At ECOSPHERE, we are committed to creating innovative, sustainable solutions that empower individuals and communities to reduce their environmental impact. Our goal is to foster a global ecosystem of eco-conscious citizens working together for a cleaner, greener planet.
              </motion.p>
            </div>
          </div>
          <motion.div
            className="mt-12 flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.5 }}
          >
            {['Innovate', 'Sustain', 'Empower'].map((word, index) => (
              <motion.div
                key={word}
                className="bg-green-600 text-white px-6 py-3 rounded-full text-lg font-semibold"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {word}
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        <motion.section
          className="mb-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-green-800 mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <ValueCard
              icon={Leaf}
              title="Sustainability"
              description="We prioritize eco-friendly practices in everything we do, from our services to our internal operations."
              index={0}
            />
            <ValueCard
              icon={Recycle}
              title="Innovation"
              description="We constantly seek new ways to improve recycling processes and reduce waste through cutting-edge technology."
              index={1}
            />
            <ValueCard
              icon={Users}
              title="Community"
              description="We believe in the power of collective action and strive to build a global community of environmental stewards."
              index={2}
            />
            <ValueCard
              icon={Globe}
              title="Global Impact"
              description="Our vision extends beyond local communities; we aim to create positive change on a global scale."
              index={3}
            />
          </div>
        </motion.section>

        <motion.section
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-green-800 mb-12">Join Our Mission</h2>
          <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Together, we can make a significant impact on our planet's health. Start your eco-friendly journey with ECOSPHERE today.
          </p>
          <motion.button
            className="bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Involved
          </motion.button>
        </motion.section>
      </main>
    </div>
  )
}
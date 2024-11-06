'use client'

import { motion } from 'framer-motion'
import { Truck, Recycle, MapPin, Book, Users, ShoppingBag } from 'lucide-react'
import Link from 'next/link'

const FeatureCard = ({ icon, title, description, link }) => (
  <motion.div
    className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col justify-between"
    whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
  >
    <div>
      <div className="flex items-center mb-4">
        {icon}
        <h3 className="text-xl font-semibold ml-3">{title}</h3>
      </div>
      <p className="text-gray-600 mb-4">{description}</p>
    </div>
    <Link href={link} className="text-green-600 hover:text-green-700 font-medium inline-flex items-center group">
      Learn More 
      <svg 
        className="w-4 h-4 ml-2 transform transition-transform group-hover:translate-x-1" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  </motion.div>
)

export default function HomePage() {
  return (
    <div className="space-y-16 py-12">
      <motion.section 
        className="text-center max-w-4xl mx-auto px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-6">Welcome to ECOSPHERE</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Join us in creating a sustainable future. Explore our eco-friendly services and make a positive impact on the environment.
        </p>
      </motion.section>

      <motion.section 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-8 lg:px-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <FeatureCard
          icon={<Truck className="w-8 h-8 text-green-600" />}
          title="Door-Picking Service"
          description="Schedule a pickup for your recyclables right from your doorstep. Our eco-friendly trucks will collect your items at your convenience."
          link="/door-picking"
        />
        <FeatureCard
          icon={<ShoppingBag className="w-8 h-8 text-green-600" />}
          title="Recycled Products Market"
          description="Shop for eco-friendly products made from recycled materials. Support sustainable businesses and reduce your environmental footprint."
          link="/market"
        />
        <FeatureCard
          icon={<MapPin className="w-8 h-8 text-green-600" />}
          title="E-bin Finder"
          description="Locate the nearest e-waste bins in your area. Properly dispose of electronic waste and contribute to a cleaner environment."
          link="/e-bin-finder"
        />
        <FeatureCard
          icon={<Truck className="w-8 h-8 text-green-600" />}
          title="Truck Tracking"
          description="Track our recycling trucks in real-time. Know exactly when your recyclables will be collected or when a truck is near you."
          link="/truck-tracking"
        />
        <FeatureCard
          icon={<Book className="w-8 h-8 text-green-600" />}
          title="Awareness Hub"
          description="Learn about environmental issues and how you can help. Access resources, articles, and tips for sustainable living."
          link="/awareness"
        />
        <FeatureCard
          icon={<Users className="w-8 h-8 text-green-600" />}
          title="About Us"
          description="Discover our mission and the team behind ECOSPHERE. Learn about our commitment to creating a more sustainable world."
          link="/about"
        />
      </motion.section>

      <motion.section 
        className="text-center bg-green-50 py-16 px-4 rounded-lg shadow-inner"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <h2 className="text-3xl font-semibold text-green-800 mb-6">Join the ECOSPHERE Community</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Start your eco-friendly journey today and be part of the change. Together, we can make a significant impact on our planet's health.
        </p>
        <motion.button
          className="bg-green-600 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-green-700 transition-colors shadow-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started
        </motion.button>
      </motion.section>
    </div>
  )
}
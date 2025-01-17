'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, LogOut, Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  handleLogout: () => void
}

export default function Sidebar({ activeTab, setActiveTab, handleLogout }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    'Overview',
    'Orders',
    'Rewards',
    'Profile',
    'Ebin Finder',
    'Marketplace',
    'Place Order'
  ]

  const NavContent = () => (
    <>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <motion.button
            key={item}
            className={`flex items-center w-full text-left py-2 px-4 rounded-md ${
              activeTab === item.toLowerCase() ? 'bg-green-700' : 'hover:bg-green-700'
            }`}
            onClick={() => {
              setActiveTab(item.toLowerCase())
              setIsOpen(false)
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
        onClick={() => {
          handleLogout()
          setIsOpen(false)
        }}
      >
        <LogOut size={18} className="mr-2" />
        Logout
      </motion.button>
    </>
  )

  return (
    <>
      <aside className="hidden md:block w-64 bg-green-800 text-white p-6 h-screen">
        <div className="mb-10">
          <h2 className="text-2xl font-bold">Dashboard</h2>
        </div>
        <NavContent />
      </aside>
      <nav className="md:hidden fixed top-0 left-0 right-0 bg-green-800 text-white p-4 z-50 flex justify-between items-center">
        <h2 className="text-xl font-bold">Dashboard</h2>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <button className="flex items-center" aria-label="Toggle menu">
              <Menu size={24} />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-green-800 text-white pt-16">
            <NavContent />
          </SheetContent>
        </Sheet>
      </nav>
      <div className="md:hidden h-16"></div>
    </>
  )
}
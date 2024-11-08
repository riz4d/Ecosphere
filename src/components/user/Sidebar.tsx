import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, LogOut, X } from 'lucide-react'

const sidebarVariants = {
  open: { x: 0 },
  closed: { x: '-100%' },
}

export default function Sidebar({
  activeTab,
  setActiveTab,
  isSidebarOpen,
  setIsSidebarOpen,
  isMobileView,
  handleLogout
}) {
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  return (
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
  )
}
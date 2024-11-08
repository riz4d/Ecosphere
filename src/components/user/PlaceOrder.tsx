'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

export default function PlaceOrder() {
  const [isLoading, setIsLoading] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)

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
      const response = await fetch('http://ecosphere-backend-mu.vercel.app/api/placeorder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      })

      if (!response.ok) {
        throw new Error('Failed to place order')
      }

      setOrderPlaced(true)
      toast({
        title: "Order Placed Successfully!",
        description: "Thank you for contributing to e-waste recycling. We'll be in touch soon.",
      })
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

  if (orderPlaced) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center py-12"
      >
        <h3 className="text-2xl font-bold mb-4">Order Successfully Placed!</h3>
        <p className="text-lg text-gray-600 mb-8">Thank you for contributing to e-waste recycling. We'll be in touch soon with further details.</p>
        <Button 
          onClick={() => setOrderPlaced(false)} 
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          Place Another Order
        </Button>
      </motion.div>
    )
  }

  return (
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
          whileHover={{ scale: 0.95 }}
          whileTap={{ scale: 0.95 }}
          disabled={isLoading}
        >
          {isLoading ? 'Placing Order...' : 'Place Order'}
        </motion.button>
      </form>
    </motion.div>
  )
}
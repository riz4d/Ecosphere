'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Leaf } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

export default function RegistrationPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordsMatch, setPasswordsMatch] = useState(true)
  const [phoneError, setPhoneError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handlePhoneChange = (value: string | undefined) => {
    setPhoneNumber(value || '')
    setPhoneError('')
  }

  const validateForm = () => {
    let isValid = true
    if (!phoneNumber) {
      setPhoneError('Please enter a valid phone number')
      isValid = false
    }
    if (password !== confirmPassword) {
      setPasswordsMatch(false)
      isValid = false
    }
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsLoading(true)
    try {
      const response = await fetch(`http://172.20.10.7/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, phoneNumber }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError("Oops, we haven't got JSON!")
      }

      const data = await response.json()
      if (data.status === true) {
        toast.success('Registration successful!')
        router.push('/login')
      } else {
        toast.error(data.message || 'Registration failed. Please try again.')
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`An error occurred: ${error.message}`)
      } else {
        toast.error('An unexpected error occurred. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <motion.div 
        className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Leaf className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-green-800">
            Join ECOSPHERE
          </h1>
        </motion.div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Label htmlFor="name">Name</Label>
            <Input 
              type="text" 
              id="name" 
              name="name" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Label htmlFor="email">Email</Label>
            <Input 
              type="email" 
              id="email" 
              name="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Label htmlFor="phone">Phone Number</Label>
            <PhoneInput
              international
              countryCallingCodeEditable={false}
              defaultCountry="AE"
              value={phoneNumber}
              onChange={handlePhoneChange}
              className="mt-1"
              inputComponent={Input}
              required
            />
            {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Label htmlFor="password">Password</Label>
            <Input 
              type="password" 
              id="password" 
              name="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input 
              type="password" 
              id="confirmPassword" 
              name="confirmPassword" 
              required
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value)
                setPasswordsMatch(e.target.value === password)
              }}
              className={!passwordsMatch ? 'border-red-500' : ''}
            />
            {!passwordsMatch && (
              <p className="mt-1 text-xs text-red-500">Passwords do not match</p>
            )}
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            whileHover={{ scale: .95 }}
            whileTap={{ scale: 0.95 }}
            disabled={isLoading}
          >
              {isLoading ? 'Registering...' : 'Register'}
            </motion.button>
          </motion.div>
        </form>
        <motion.p 
          className="mt-6 text-center text-sm text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-green-600 hover:text-green-500">
            Log In
          </Link>
        </motion.p>
      </motion.div>
    </div>
  )
}
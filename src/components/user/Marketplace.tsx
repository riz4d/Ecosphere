import { motion } from 'framer-motion'
import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'

const marketplaceProducts = [
  { id: 1, name: 'Refurbished RAM 8GB', price: 500, image: '/products/ram.jpg?height=100&width=100' },
  { id: 2, name: 'Recycled 1TB HDD', price: 800, image: '/products/hdd.jpg?height=100&width=100' },
  { id: 3, name: 'Eco-Friendly Mouse', price: 300, image: '/products/mouse.jpg?height=100&width=100' },
  { id: 4, name: 'Upcycled Keyboard', price: 600, image: '/products/key.jpg?height=100&width=100' },
]

export default function Marketplace() {
  return (
    <div>
      <h3 className="text-2xl font-bold mb-6">Marketplace</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {marketplaceProducts.map((product) => (
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
            <p className="text-green-600 font-bold mb-2">₹{product.price}</p>
            <button className="bg-green-600 text-white px-4 py-2 rounded-full text-sm hover:bg-green-700 transition-colors flex items-center justify-center w-full">
              <ShoppingCart className="mr-2" size={16} />
              Add to Cart
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
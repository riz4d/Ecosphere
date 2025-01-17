import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'
import { useState } from 'react'

const ebinLocations = [
  { id: 1, name: 'Bengaluru E-Bin', lat: 40.7128, lng: -74.0060 },
  { id: 2, name: 'Tech Park E-Bin', lat: 40.7282, lng: -74.0776 },
  { id: 3, name: 'Chennai E-Bin', lat: 40.7589, lng: -73.9851 },
]

export default function EbinFinder() {
  const [mapCenter] = useState({ lat: 40.7128, lng: -74.0060 })

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY" 
  })

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6">E-Bin Finder</h3>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-md rounded-lg p-6"
      >
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '400px' }}
            center={mapCenter}
            zoom={12}
          >
            {ebinLocations.map((location) => (
              <Marker
                key={location.id}
                position={{ lat: location.lat, lng: location.lng }}
                title={location.name}
              />
            ))}
          </GoogleMap>
        ) : (
          <div>Loading map...</div>
        )}
        <div className="mt-4">
          <h4 className="text-lg font-semibold mb-2">Nearby E-Bins</h4>
          <ul className="space-y-2">
            {ebinLocations.map((location) => (
              <li key={location.id} className="flex items-start">
                <MapPin className="text-green-600 mr-2 mt-1 flex-shrink-0" size={16} />
                <span>{location.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  )
}
import { useState, useEffect } from 'react'

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 10,
  maximumAge: 1000 * 3600 * 24,
}   

export const useGeoLocation =  (options = {}) => {
  const [location, setLocation] = useState()
  const [error, setError] = useState('')

  const handleSuccess = (pos) => {
    const { latitude, longitude } = pos.coords

    setLocation({
      latitude,
      longitude,
    })
  }

  const handleError = (err) => {
    setError(err.message)
  }

  useEffect(() => {
    const { geolocation } = navigator

    if (!geolocation) {
      setError('Geolocation is not supported.')
      return
    }
    console.log('test')
    geolocation.getCurrentPosition(handleSuccess, handleError, geolocationOptions)
  }, [])

  return { location, error  }
}
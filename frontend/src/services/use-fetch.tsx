import { useEffect, useState } from 'react'
import { API_BASE_URL } from '../constants'

export function useFetch<T>(path: string) {
  const [data, setData] = useState<{
    data: T | null
    error: Error | null | unknown
    loading: boolean
  }>({
    data: null,
    error: null,
    loading: true,
  })

  const fetchUrl = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/${path}`)
      const data = await response.json()
      setData({
        data,
        error: null,
        loading: false,
      })
    } catch (error) {
      setData({
        data: null,
        error,
        loading: false,
      })
    }
  }

  useEffect(() => {
    fetchUrl()
  }, [path])

  return data
}

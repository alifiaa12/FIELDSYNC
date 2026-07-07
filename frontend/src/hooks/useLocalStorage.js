import { useCallback, useState } from 'react'

// State synced to localStorage under `key`, JSON-serialized.
// Returns [value, setValue] where setValue also persists.
export function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    const raw = localStorage.getItem(key)
    if (raw === null) return initial
    try {
      return JSON.parse(raw)
    } catch {
      return initial
    }
  })

  const set = useCallback(
    next => {
      setValue(prev => {
        const resolved = typeof next === 'function' ? next(prev) : next
        localStorage.setItem(key, JSON.stringify(resolved))
        return resolved
      })
    },
    [key],
  )

  return [value, set]
}

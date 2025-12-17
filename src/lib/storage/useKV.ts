import { useCallback, useEffect, useRef, useState } from 'react'

function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    if (raw === null) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

function writeStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // ignore write errors (quota, privacy)
  }
}

export function getKV<T>(key: string, fallback: T): T {
  return readStorage<T>(key, fallback)
}

export function setKV<T>(key: string, value: T): void {
  writeStorage<T>(key, value)
}

export function useKV<T>(key: string, initial: T): [T, (next: T | ((prev: T) => T)) => void] {
  const initialRef = useRef(initial)
  const [value, setValue] = useState<T>(() => readStorage<T>(key, initialRef.current))

  useEffect(() => {
    // If storage was empty initially, ensure it persists the initial value
    if (localStorage.getItem(key) === null) {
      writeStorage<T>(key, value)
    }
  }, [])

  const update = useCallback((next: T | ((prev: T) => T)) => {
    setValue((prev) => {
      const resolved = typeof next === 'function' ? (next as (p: T) => T)(prev) : next
      writeStorage<T>(key, resolved)
      return resolved
    })
  }, [key])

  useEffect(() => {
    // Sync across tabs/windows
    const onStorage = (e: StorageEvent) => {
      if (e.key === key && e.newValue != null) {
        try {
          const parsed = JSON.parse(e.newValue)
          setValue(parsed as T)
        } catch {
          // ignore parse errors
        }
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [key])

  return [value, update]
}

export function deleteKV(key: string): void {
  try {
    localStorage.removeItem(key)
  } catch {
    // ignore
  }
}

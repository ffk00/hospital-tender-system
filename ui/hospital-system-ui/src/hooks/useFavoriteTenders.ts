import { useState, useCallback, useEffect } from 'react'

const STORAGE_KEY = 'favoriteTenderIds'

function readFavorites(): number[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function useFavoriteTenders() {
  const [favoriteIds, setFavoriteIds] = useState<number[]>(readFavorites)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteIds))
  }, [favoriteIds])

  const isFavorite = useCallback(
    (id: number) => favoriteIds.includes(id),
    [favoriteIds],
  )

  const toggleFavorite = useCallback((id: number) => {
    setFavoriteIds((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id],
    )
  }, [])

  return { favoriteIds, isFavorite, toggleFavorite }
}

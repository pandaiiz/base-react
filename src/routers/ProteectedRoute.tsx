import { Navigate } from 'react-router-dom'
import { useSystemStore } from '@/stores/system.store'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isLoggedIn = useSystemStore((state) => state.isLoggedIn)
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

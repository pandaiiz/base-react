import { useSystemStore } from '@/stores/system.store'
import React from 'react'

interface PermissionProps {
  permissionName: string
  children: React.ReactNode
}

const Permission: React.FC<PermissionProps> = ({ permissionName, children }) => {
  const { hasPermission } = useSystemStore((state) => ({
    hasPermission: state.hasPermission
  }))

  if (!hasPermission(permissionName)) {
    return null
  }

  return <>{children}</>
}

export default Permission

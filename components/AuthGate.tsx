// components/AuthGate.tsx
'use client'

import { ReactNode } from 'react'
import { useAuth } from '../hooks/useAuth'

type Props = {
  children: ReactNode
  requiredRole?: 'admin' | 'member'
}

export default function AuthGate({ children, requiredRole = 'admin' }: Props) {
  const { user, role, loading } = useAuth()

  if (loading) return <div>Loading...</div>
  if (!user) return <div>Please log in to continue.</div>
  if (role !== requiredRole) return <div>Access denied.</div>

  return <>{children}</>
}

// app/admin/login.tsx
'use client'

import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../lib/firebase'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.refresh() // Reloads the page so auth state is rechecked
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="p-8 max-w-md mx-auto mt-20 border rounded shadow">
      <h1 className="text-xl font-bold mb-4">Admin Login</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          className="w-full border p-2 rounded"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          className="w-full border p-2 rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
          type="submit"
        >
          Sign In
        </button>
      </form>
      <p className="mt-4 text-sm text-center">
        <a href="https://goldlabel.pro" className="underline">
          Back to goldlabel.pro
        </a>
      </p>
    </div>
  )
}

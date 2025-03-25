// components/LoginForm.tsx
'use client'

import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../lib/firebase'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    try {
      await signInWithEmailAndPassword(auth, email, password)
      setSuccess(true)
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full border p-2"
          required
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full border p-2"
          required
        />
      </div>
      <button type="submit" className="px-4 py-2 bg-black text-white">
        Log In
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-600 text-sm">Login successful!</p>}
    </form>
  )
}

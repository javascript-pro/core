// components/SignupForm.tsx
'use client'

import { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { auth, db } from '../lib/firebase'

export default function SignupForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        role: 'member',
      })

      setSuccess(true)
      setEmail('')
      setPassword('')
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <form onSubmit={handleSignup} className="space-y-4">
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
        Sign Up
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-600 text-sm">Signup successful!</p>}
    </form>
  )
}

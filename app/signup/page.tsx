'use client'

import { useState } from 'react'
import { signUp } from '#/lib/auth'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      await signUp(email, password)
      setMsg('Signed up successfully!')
    } catch (err: any) {
      setMsg(err.message)
    }
  }

  return (
    <main className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          className="border p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="bg-black text-white p-2">Sign Up</button>
      </form>
      {msg && <p className="mt-4 text-sm">{msg}</p>}
    </main>
  )
}

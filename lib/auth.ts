// src/lib/auth.ts
import { auth, db } from './firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'

export async function signUp(email: string, password: string) {
  const userCred = await createUserWithEmailAndPassword(auth, email, password)
  const { uid } = userCred.user

  // Create user in Firestore
  await setDoc(doc(db, 'users', uid), {
    email,
    role: 'member',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })

  return userCred.user
}

export async function signIn(email: string, password: string) {
  const userCred = await signInWithEmailAndPassword(auth, email, password)
  return userCred.user
}

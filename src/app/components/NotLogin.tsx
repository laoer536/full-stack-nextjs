'use client'

import { signIn } from 'next-auth/react'

export default function NotLogin() {
  return (
    <button style={{ border: '1px solid black' }} onClick={() => signIn()}>
      click to login
    </button>
  )
}

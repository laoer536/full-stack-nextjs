'use client'

import { FormEvent, useState } from 'react'
import { signIn } from 'next-auth/react'
import styles from './page.module.scss'

function SignInPage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const result = await signIn('email', { email, callbackUrl: '/' })
    if (result?.error) {
      setMessage('Failed to sign in. Please check your email and try again.')
    } else {
      setMessage('Check your email for the sign-in link.')
    }
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Sign in to MyApp</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          autoComplete={'true'}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Sign in
        </button>
      </form>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  )
}

export default SignInPage

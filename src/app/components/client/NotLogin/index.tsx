'use client'
import React from 'react'
import styles from './index.module.scss'
import { signIn } from 'next-auth/react'

function NotLogin() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>You are not logged in</h1>
      <p className={styles.message}>Please log in to access this page.</p>
      <button className={styles.loginButton} onClick={() => signIn()}>
        Go to Login
      </button>
    </div>
  )
}

export default NotLogin

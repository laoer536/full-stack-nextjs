'use client'

import { useState } from 'react'
import styles from './index.module.scss'
import { myFetch } from '@/utils'

export default function AddUserForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({})

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(String(email).toLowerCase())
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: { name?: string; email?: string } = {}

    if (!name) {
      newErrors.name = 'Name is required'
    }

    if (!email) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(email)) {
      newErrors.email = 'Invalid email format'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const response = await myFetch(
      '/api/user/users',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      },
      true,
    )
    if (response.ok) {
      setName('')
      setEmail('')
      setErrors({})
      // 重新获取用户列表
      // await fetchUsers()
      location.reload()
      alert('Add user successfully!')
    } else {
      console.error('Failed to add user')
    }
  }

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.title}>添加用户</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <div className={styles.error}>{errors.name}</div>}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <div className={styles.error}>{errors.email}</div>}
        </div>
        <button type="submit" className={styles.button} disabled={!name || !email}>
          Submit
        </button>
      </form>
    </div>
  )
}

import styles from './page.module.scss'
import type { User } from '@prisma/client'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { useFetch } from '@/utils'
// import { useSession } from 'next-auth/react'   use in client component

// async function getData() {
//   const res = await fetch('http://localhost:3000/api/user/users')
//   const users = await res.json()
//   return users as User[]
// }

export default async function Home() {
  const users = await useFetch<User[]>('/api/user/users') // useFetch add
  const session = await getServerSession(authOptions)
  return (
    <main className={styles.main}>
      {JSON.stringify(session, null, 2)}-----info
      <div>用户列表</div>
      <div>
        {users.map((item) => (
          <div key={item.email}>{item.email}</div>
        ))}
      </div>
    </main>
  )
}

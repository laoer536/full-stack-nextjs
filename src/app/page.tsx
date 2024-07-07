import styles from './page.module.scss'
import type { User } from '@prisma/client'
import { myFetch } from '@/utils'
import AuthRequire from '@/app/components/server/AuthRequire'

export default async function Home() {
  const users = await myFetch<User[]>('/api/user/users') // useFetch add
  return (
    <AuthRequire>
      <main className={styles.main}>
        <div>用户列表</div>
        <div>
          {users.map((item) => (
            <div key={item.email}>{item.email}</div>
          ))}
        </div>
      </main>
    </AuthRequire>
  )
}

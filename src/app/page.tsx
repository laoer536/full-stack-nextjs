// 'use client'

// import type { User } from '@prisma/client'
// import { myFetch } from '@/utils'
import styles from './page.module.scss'
import AuthRequire from '@/app/components/server/AuthRequire'
import { prisma } from '@/lib/collection/mysql'
import ArticleCard from '@/app/components/server/ArticleCard'
import UserList from '@/app/components/server/UserList'

export default async function Home() {
  const users = await prisma.user.findMany()
  // if is client
  // const [users, setUsers] = useState<User[]>([])
  // useEffect(() => {
  //   myFetch<User[]>('/api/user/users', {}).then((res) => setUsers(res))
  // }, [])
  const posts = await prisma.post.findMany({ include: { author: true } })
  return (
    <AuthRequire>
      <main className={styles.main}>
        <h2 className={styles.title}>用户列表</h2>
        <UserList users={users} />
        <h2 className={styles.title}>文章列表</h2>
        {posts.map((post) => (
          <ArticleCard
            key={post.id}
            username={post?.author?.name || ''}
            title={post.title}
            content={post?.content || ''}
            updatedAt={post.updatedAt.toString()}
          />
        ))}
      </main>
    </AuthRequire>
  )
}

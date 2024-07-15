// 'use client'

// import type { User } from '@prisma/client'
// import { myFetch } from '@/utils'
import styles from './page.module.scss'
import AuthRequire from '@/app/components/server/AuthRequire'
import { prisma } from '@/lib/collection/mysql'
import ArticleCard from '@/app/components/server/ArticleCard'

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
        <div>用户列表</div>
        <div>
          {users.map((item) => (
            <div key={item.email}>{item.email}</div>
          ))}
        </div>
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

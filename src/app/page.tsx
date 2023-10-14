import styles from './page.module.scss'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/collection/mysql'

async function getData() {
  return prisma.user.findMany()
}

export default async function Home() {
  console.log(await getData())
  const session = await getServerSession(authOptions)
  return <main className={styles.main}>{JSON.stringify(session, null, 2)}-----info</main>
}

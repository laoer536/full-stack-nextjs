import { prisma } from '@/collection/mysql'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'

export async function GET(request: Request) {
  const users = await prisma.user.findMany()
  const session = await getServerSession(authOptions)
  if (session) {
    return Response.json(users)
  } else {
    return Response.json({ message: 'Not logged in.' }, { status: 401 })
  }
}

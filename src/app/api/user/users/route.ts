import { prisma } from '@/lib/collection/mysql'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'

export async function GET(request: Request) {
  const session = await getServerSession(authOptions)
  if (session) {
    const users = await prisma.user.findMany()
    return Response.json(users)
  } else {
    return Response.json({ message: 'Not logged in.' }, { status: 401 })
  }
}

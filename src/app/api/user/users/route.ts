import { prisma } from '@/lib/collection/mysql'
export async function GET(request: Request) {
  const users = await prisma.user.findMany()
  return Response.json(users)
}

import { prisma } from '@/lib/collection/mysql'
export async function GET(request: Request) {
  const users = await prisma.user.findMany()
  return Response.json(users)
}

export async function POST(request: Request) {
  const newUser = (await request.json()) as { name: string; email: string }
  await prisma.user.createMany({ data: newUser })
  return Response.json(request.body)
}

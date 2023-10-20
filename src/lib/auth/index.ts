import { NextAuthOptions } from 'next-auth'
import EmailProvider from 'next-auth/providers/email'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '@/lib/collection/mysql'
import { getServerSession } from 'next-auth/next'
import { NextRequest } from 'next/server'
export const authOptions: NextAuthOptions = {
  providers: [
    // GitHubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    EmailProvider({
      server: {
        host: 'smtp.163.com',
        port: 465,
        auth: {
          user: process.env.NEXT_PUBLIC_NODEMAILER_AUTH_EMAIL,
          pass: process.env.NEXT_PUBLIC_NODEMAILER_AUTH_PASS,
        },
      },
      from: 'laoer536@163.com',
    }),
  ],
  adapter: PrismaAdapter(prisma),
}

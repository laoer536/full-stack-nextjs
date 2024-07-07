import { NextAuthOptions } from 'next-auth'
import EmailProvider from 'next-auth/providers/email'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '@/lib/collection/mysql'
// @ts-ignore
import nodemailer from 'nodemailer'
import { pages } from 'next/dist/build/templates/app-page'
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
      sendVerificationRequest: async ({ identifier: email, url, provider }) => {
        // const { host } = new URL(url)
        const transport = nodemailer.createTransport(provider.server)
        await transport.sendMail({
          to: email,
          from: provider.from,
          subject: 'Your sign-in link for MyApp',
          html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.5;">
              <h2 style="color: #333;">Sign in to MyApp</h2>
              <p>Click the link below to sign in:</p>
              <a href="${url}" style="display: inline-block; padding: 10px 20px; margin: 10px 0; font-size: 16px; color: #fff; background-color: #0070f3; text-decoration: none; border-radius: 5px;">Sign in</a>
              <p>If you did not request this email, you can safely ignore it.</p>
              <p>Thanks,<br/>The MyApp Team</p>
            </div>
          `,
        })
      },
    }),
  ],
  pages: {
    signIn: '/auth/email-signin',
  },
  adapter: PrismaAdapter(prisma),
}

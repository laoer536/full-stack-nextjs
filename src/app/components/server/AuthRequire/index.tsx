import { Fragment, ReactNode } from 'react'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import NotLogin from '@/app/components/client/NotLogin'

async function AuthRequire({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions)
  return <Fragment>{session ? children : <NotLogin />}</Fragment>
}

export default AuthRequire

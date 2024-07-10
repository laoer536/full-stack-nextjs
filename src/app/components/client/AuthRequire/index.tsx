'use client'
import { useSession } from 'next-auth/react'
import { Fragment, ReactNode } from 'react'
import NotLogin from '@/app/components/client/NotLogin'

function AuthRequire({ children }: { children: ReactNode }) {
  const session = useSession()
  return (
    session.status !== 'loading' && <Fragment>{session.status === 'authenticated' ? children : <NotLogin />}</Fragment>
  )
}

export default AuthRequire

'use client'

import Image from "next/image"
import { useSession, signIn, signOut } from "next-auth/react"

export default function LoginButton() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        <Image 
          src={session.user?.image ?? ''}
          alt="Profile Picture"
          width={300}
          height={300}
        />
        {session.user?.name} <br />
        Signed in as {session.user?.email} <br />
        {session.expires}
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}
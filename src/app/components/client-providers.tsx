'use client'

import { SessionProvider } from "next-auth/react"

interface ClientProvidersProps {
  children: React.ReactNode
}
const ClientProviders = ({ children }: ClientProvidersProps): React.ReactNode => {
  return (
    <SessionProvider>{children}</SessionProvider>
  )
}

export default ClientProviders
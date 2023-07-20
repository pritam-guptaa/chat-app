'use client'

import Button from '@/components/ui/Button'
import {authOptions} from '@/lib/auth'
import {getServerSession} from 'next-auth'

const page = async({}) => {

  const session = await getServerSession(authOptions)
  return <Button> hell</Button>
}

export default page
import { FC, useState } from 'react'
import Button from '@/components/ui/Button'

interface pageProps {    
  
}

const Page: FC<pageProps> = ({}) => {
    const [isLoading, setIsloading] = useState<boolean>()

  return <>
    <div className='flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
        <div className='w-full flex flex-col items-center max-w-md space-y-8 '>
            logo
            <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>Sign in to your account</h2>
        </div>

        <Button isLoading={isLoading}></Button>
    </div>
  </>
}

export default Page
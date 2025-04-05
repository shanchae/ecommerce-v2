'use client'
import Link from 'next/link'
import Form from 'next/form'
import React from 'react'
import { ClerkLoaded, SignInButton, UserButton, useUser } from '@clerk/nextjs'
import { PackageIcon, TrolleyIcon } from '@sanity/icons'
import { SignedIn } from '@clerk/clerk-react'

const Header = () => {
   const user = useUser().user

    const createClearPasskey = async () => {
        try {
            const response = await user?.createPasskey()
            console.log(response)

        } catch (error) {
            console.error('Error creating passkey:', JSON.stringify(error, null, 2))
        }
    }

  return (
    <header className='flex flex-wrap jsutify-between items-center px-4 py-2'>
        {/* Top row */}
        <div className='flex  flex-wrap justify-between items-center'>
            <Link href='/' className='flex font-bold text-blue-500 hover:opacity-50 cursor-pointer mx-auto sm:mx-0'>
                    Shopr
            </Link>

           <Form action='/search' className='w-full sm:w-auto sm:flex-1 sm:mx-4 mt-2 sm:mt-0'>
                <input type="text" name='query' placeholder='Search for products' className='bg-gray-100 text-gray-800 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-full max-w-4xl'/>
            </Form> 

            <div className='flex items-center space-x-4 mt-4 sm:flex-none sm:mt-0 flex-none'>
                <Link href='/basket' className='flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                    <TrolleyIcon className='w-6 h-6'/>
                    <span>My Basket</span>
                </Link>

                <ClerkLoaded>
                          <SignedIn>
                              <Link href='/account' className='flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                                  <PackageIcon className='w-6 h-6' />
                                  <span>My Orders</span>
                              </Link>
                          </SignedIn>


                    { user ?
                        (<div className='flex items-center space-x-2'>
                            <UserButton/> 

                            <div className='hidden sm:block text-xs'>
                                <p className='hidden sm:block text-xs'>Welcome Back</p>
                                <p className='font-bold'>
                                    {user.fullName} 
                                </p>
                            </div>
                        </div>)
                        : (
                            <SignInButton mode='modal' />
                        )
                    }

                    { user?.passkeys.length === 0 &&
                        <button onClick={createClearPasskey} className='bg-white hover:bg-blue-700 hover:text-white animate-pulse text-blue-500 font-bold py-2 px-4 rounded border border-blue-300'>
                            Create Passkey

                        </button>
                    }
                </ClerkLoaded>
            </div>
        </div>
    </header>
  )
}

export default Header
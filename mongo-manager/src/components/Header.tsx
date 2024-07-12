import Image from 'next/image'
import React from 'react'

const Header = () => {
  return (
    <header>
        <nav className='w-screen shadow-md' id="header">
            <div className='max-w-7xl px-4 py-4 mx-auto'>
                <div className='grid grid-cols-6'>
                    <div className='col-span-4 flex items-end gap-4 font-satisfy'>
                        <Image src='/mongo-logo.png' alt='Mongo Manager' width={50} height={50} />
                        <h1 className='text-4xl text-gray-800'>Mongo Manager</h1>
                        <span className='text-lg text-gray-800 ml-2'>Manage your MongoDB the Browser way ...</span>
                    </div>
                </div>
            </div>
            <div className='w-full border-b-[0.1rem] border-gray-200' />
        </nav>
    </header>
  )
}

export default Header
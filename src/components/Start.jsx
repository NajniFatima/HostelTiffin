import React from 'react';
import final from '../assets/final.svg'

const Start = () => {
  return (
    <div className='w-full h-screen bg-gradient-to-b from-colorDB to-colorB '>
        <div className='w-full h-screen flex justify-center items-center'>
            <img className='h-28' src={final} />
        </div>
    </div>
  )
}

export default Start
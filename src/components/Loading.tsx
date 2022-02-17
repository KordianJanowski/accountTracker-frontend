import React from 'react'

const Loading: React.FC = () => {
  return (
    <div className='absolute w-full h-full top-0 left-0 text-white flex justify-center items-center'>
      <svg xmlns="http://www.w3.org/2000/svg" className="animate-ping -mt-20 h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
      </svg>
    </div>
  )
}

export default Loading
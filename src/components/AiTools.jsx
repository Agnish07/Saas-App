// AiTools.jsx
import React from 'react'
import { AiToolsData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'

const AiTools = () => {
  const navigate = useNavigate()
  const { user } = useUser()

  return (
    <div className='px-4 sm:px-20 xl:px-32 my-24 bg-[#252525] py-16'>
      <div className='text-center'>
        <h2 className='text-[#E6E6E6] text-[42px] font-semibold'>AI Tools</h2>
        <p className='text-[#A8A8A8] max-w-lg mx-auto'>
          Discover intelligent tools crafted to enhance creativity and productivity.
        </p>
      </div>

      <div className='flex flex-wrap mt-10 justify-center'>
        {AiToolsData.map((tool, index) => (
          <div
            key={index}
            className='p-8 m-4 max-w-xs rounded-lg bg-[#1F1F1F] border border-[#2A2A2A] shadow-sm hover:-translate-y-1 transition-transform duration-200 cursor-pointer'
            onClick={() => user && navigate(tool.path)}
          >
            <div
              className='w-12 h-12 p-3 rounded-md flex items-center justify-center'
              style={{ backgroundColor: '#2A2A2A' }}
            >
              <tool.Icon className='w-6 h-6 text-[#BFBFBF]' />
            </div>

            <h3 className='mt-6 mb-3 text-lg font-semibold text-[#E6E6E6]'>{tool.title}</h3>
            <p className='text-[#9E9E9E] text-sm max-w-[95%]'>{tool.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AiTools

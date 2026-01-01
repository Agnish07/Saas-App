import { Sparkles,Edit, Hash, Eraser } from 'lucide-react';
import React from 'react'
import { useState } from 'react';

const RemoveBackground = () => {

  const [input, setInput] = useState("");


  const onSubmitHandler = async (e) => {
    e.preventDefault();
  };
  
  return (
    <div className="h-full overflow-y-auto p-6 text-[#E6E6E6] bg-[#252525]">
      <div className="w-full max-w-[1200px] mx-auto flex items-start gap-6">
        {/* LEFT (form) */}
        <form
          onSubmit={onSubmitHandler}
          className="w-1/2 min-w-[420px] p-6 bg-[#191919] rounded-lg border border-[#2A2A2A] flex flex-col"
        >
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-[#E6E6E6]" />
            <h1 className="text-xl font-semibold m-0">Background Remover</h1>
          </div>

          <label className="mt-6 text-sm font-medium text-[#B0B0B0]">Upload Image</label>
          <input
            onChange={(e) => setInput(e.target.files[0])}
            type="file"
            accept='image/*'
            className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md 
                       bg-[#2A2A2A] text-[#E6E6E6] placeholder-[#7A7A7A]
                       border border-[#3A3A3A] focus:border-[#4A4A4A] transition"
          />

        <p className='text-xs text-gray-500 font-light mt-1'>Supports jpg, png and other image formats</p>

          <div className="mt-auto">
            <button
              type="submit"
              className="w-full flex justify-center items-center gap-2 bg-[#313131] text-[#E6E6E6] 
                      px-4 py-2 mt-6 text-sm rounded-lg border border-[#3A3A3A]
                      hover:bg-[#3F3F3F] transition cursor-pointer"
            >
              <Eraser className="w-5" />
              Remove Background
            </button>
          </div>
        </form>

        {/* RIGHT (preview) */}
        <div className="w-1/2 min-w-[420px] p-6 bg-[#191919] rounded-lg border border-[#2A2A2A] flex flex-col">
          <div className="flex items-center gap-3">
            <Eraser className="w-5 h-5 text-[#E6E6E6]" />
            <h1 className="text-xl font-semibold m-0 text-[#E6E6E6]">Processed Image</h1>
          </div>

          <div className="flex-1 flex justify-center items-center">
            <div className="text-sm flex flex-col items-center gap-5 text-[#9E9E9E]">
              <Eraser className="w-9 h-9 text-[#7A7A7A]" />
              <p className="text-center">Upload an image and click "Remove Background" to get started</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RemoveBackground

import { Sparkles,Edit, Hash } from 'lucide-react';
import React from 'react'
import { useState } from 'react';

const BlogTitles = () => {
  
    const blogCategories = [
      'General', 'Technology', 'Business', 'Health', 'Lifestyle', 'Education', 'Travel', 'Food'
    ];
  
    const [selectedCategory, setSelectedCategory] = useState('General');
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
            <h1 className="text-xl font-semibold m-0">Title Generator</h1>
          </div>

          <label className="mt-6 text-sm font-medium text-[#B0B0B0]">Keyword</label>
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md 
                       bg-[#2A2A2A] text-[#E6E6E6] placeholder-[#7A7A7A]
                       border border-[#3A3A3A] focus:border-[#4A4A4A] transition"
            placeholder="Enter your article topic..."
          />

          <label className="mt-4 text-sm font-medium text-[#B0B0B0]">Category</label>

          <div className="mt-3 flex gap-3 flex-wrap">
            {blogCategories.map((item) => (
              <button
                type="button"
                onClick={() => setSelectedCategory(item)}
                key={item}
                className={`text-xs px-4 py-1 rounded-full cursor-pointer transition border 
                    ${
                      selectedCategory === item
                        ? "bg-[#3A3A3A] text-[#E6E6E6] border-[#4A4A4A]"
                        : "text-[#9E9E9E] border-[#3A3A3A] hover:bg-[#2A2A2A]"
                    }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="mt-auto">
            <button
              type="submit"
              className="w-full flex justify-center items-center gap-2 bg-[#313131] text-[#E6E6E6] 
                      px-4 py-2 mt-6 text-sm rounded-lg border border-[#3A3A3A]
                      hover:bg-[#3F3F3F] transition cursor-pointer"
            >
              <Hash className="w-5" />
              Generate Title
            </button>
          </div>
        </form>

        {/* RIGHT (preview) */}
        <div className="w-1/2 min-w-[420px] p-6 bg-[#191919] rounded-lg border border-[#2A2A2A] flex flex-col">
          <div className="flex items-center gap-3">
            <Hash className="w-5 h-5 text-[#E6E6E6]" />
            <h1 className="text-xl font-semibold m-0 text-[#E6E6E6]">Preview</h1>
          </div>

          <div className="flex-1 flex justify-center items-center">
            <div className="text-sm flex flex-col items-center gap-5 text-[#9E9E9E]">
              <Hash className="w-9 h-9 text-[#7A7A7A]" />
              <p className="text-center">Enter a topic and click “Generate Title to get started</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogTitles

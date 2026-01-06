import { Edit, Sparkles } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import ReactMarkdown from 'react-markdown'
import remarkGfm from "remark-gfm";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const WriteArticle = () => {
  const articleLength = [
    { length: 800, text: "Short (500–800 words)" },
    { length: 1200, text: "Medium (800–1200 words)" },
    { length: 1600, text: "Long (1200–1600 words)" },
  ];

  const [selectedLength, setSelectedLength] = useState(articleLength[0]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const prompt = `Write an article about ${input} in ${selectedLength.text}`;

      const { data } = await axios.post(
        "/api/ai/generate-article",
        { prompt, length: selectedLength.length },
        {
          headers: { Authorization: `Bearer ${await getToken()}` },
        }
      );

      if (data.success) {
        setContent(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
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
            <h1 className="text-xl font-semibold m-0">Article Configuration</h1>
          </div>

          <label className="mt-6 text-sm font-medium text-[#B0B0B0]">
            Article Topic
          </label>
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md 
                       bg-[#2A2A2A] text-[#E6E6E6] placeholder-[#7A7A7A]
                       border border-[#3A3A3A] focus:border-[#4A4A4A] transition"
            placeholder="Enter your article topic..."
          />

          <label className="mt-4 text-sm font-medium text-[#B0B0B0]">
            Article Length
          </label>

          <div className="mt-3 flex gap-3 flex-wrap">
            {articleLength.map((item, index) => (
              <button
                type="button"
                onClick={() => setSelectedLength(item)}
                key={index}
                className={`text-xs px-4 py-1 rounded-full cursor-pointer transition border 
                    ${
                      selectedLength.text === item.text
                        ? "bg-[#3A3A3A] text-[#E6E6E6] border-[#4A4A4A]"
                        : "text-[#9E9E9E] border-[#3A3A3A] hover:bg-[#2A2A2A]"
                    }`}
              >
                {item.text}
              </button>
            ))}
          </div>

          <div className="mt-auto">
            <button
              disabled={loading}
              type="submit"
              className="w-full flex justify-center items-center gap-2 bg-[#313131] text-[#E6E6E6] 
                      px-4 py-2 mt-6 text-sm rounded-lg border border-[#3A3A3A]
                      hover:bg-[#3F3F3F] transition cursor-pointer"
            >
              {loading ? (
                <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
              ) : (
                <Edit className="w-5" />
              )}
              Generate Article
            </button>
          </div>
        </form>

        {/* RIGHT (preview) */}
        <div className="w-1/2 min-w-[420px] p-6 bg-[#191919] rounded-lg border border-[#2A2A2A] flex flex-col">
          <div className="flex items-center gap-3">
            <Edit className="w-5 h-5 text-[#E6E6E6]" />
            <h1 className="text-xl font-semibold m-0 text-[#E6E6E6]">
              Preview
            </h1>
          </div>

          {!content ? (
            <div className="flex-1 flex justify-center items-center">
              <div className="text-sm flex flex-col items-center gap-5 text-[#9E9E9E]">
                <Edit className="w-9 h-9 text-[#7A7A7A]" />
                <p className="text-center">
                  Enter a topic and click “Generate Article” to get started
                </p>
              </div>
            </div>
          ) : (
            <div className="mt-4 flex-1 overflow-y-auto text-[#E6E6E6] text-sm">
  <ReactMarkdown
    remarkPlugins={[remarkGfm]}
    components={{
      h1: ({ children }) => (
        <h1 className="text-2xl font-semibold mb-4 text-white">
          {children}
        </h1>
      ),
      h2: ({ children }) => (
        <h2 className="text-xl font-semibold mt-6 mb-3 text-[#E6E6E6]">
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="text-lg font-medium mt-5 mb-2 text-[#E6E6E6]">
          {children}
        </h3>
      ),
      p: ({ children }) => (
        <p className="mb-4 leading-relaxed text-[#CFCFCF]">
          {children}
        </p>
      ),
      ul: ({ children }) => (
        <ul className="list-disc pl-6 mb-4 text-[#CFCFCF]">
          {children}
        </ul>
      ),
      li: ({ children }) => (
        <li className="mb-1">{children}</li>
      ),
    }}
  >
    {content}
  </ReactMarkdown>
</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WriteArticle;

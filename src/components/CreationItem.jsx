import React, { useState } from "react";
import Markdown from "react-markdown";

const CreationItem = ({ item }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="p-4 max-w-5xl text-sm 
      bg-[#1d1d1d] border border-[#2A2A2A] 
      rounded-lg cursor-pointer hover:bg-[#171717] transition"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex justify-between items-center gap-4">
        <div>
          <h2 className="text-[#E6E6E6] font-medium">{item.prompt}</h2>
          <p className="text-[#9E9E9E] text-xs mt-1">
            {item.type} • {new Date(item.created_at).toLocaleDateString()}
          </p>
        </div>

        <button
          className="px-4 py-1 rounded-full 
            text-xs font-medium
            bg-[#2A2A2A] 
            text-[#E6E6E6] 
            border border-[#313131]
            hover:bg-[#3A3A3A] transition"
        >
          {item.type}
        </button>
      </div>

      {expanded && (
        <div>
          {item.type === "image" ? (
            <div>
              <img
                src={item.content}
                alt="image"
                className="mt-3 w-full max-w-md"
              />
            </div>
          ) : (
            <div className="mt-3 h-full overflow-y-scroll text-sm text-[#d0d0d0]">
              <div className="reset-tw">
                <Markdown>{item.content}</Markdown>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreationItem;

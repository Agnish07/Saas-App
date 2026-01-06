import { Sparkles, Scissors } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveObject = () => {
  const [image, setImage] = useState(null);
  const [object, setObject] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!image || !object.trim()) {
      toast.error("Image and object description are required");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("image", image);
      formData.append("object", object);

      const { data } = await axios.post(
        "/api/ai/remove-image-object",
        formData,
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      if (data.success) {
        setResult(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full overflow-y-auto p-6 text-[#E6E6E6] bg-[#252525]">
      <div className="w-full max-w-[1200px] mx-auto flex gap-6">

        {/* LEFT FORM */}
        <form
          onSubmit={onSubmitHandler}
          className="w-1/2 min-w-[420px] p-6 bg-[#191919] rounded-lg border border-[#2A2A2A] flex flex-col"
        >
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-6 h-6" />
            <h1 className="text-xl font-semibold">Object Remover</h1>
          </div>

          <label className="text-sm text-[#B0B0B0]">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="mt-2 w-full text-sm rounded-md bg-[#2A2A2A]
              border border-[#3A3A3A]
              file:bg-[#313131] file:text-[#E6E6E6]
              file:border-0 file:px-3 file:py-1 file:rounded
              hover:file:bg-[#3F3F3F]"
          />

          <label className="mt-4 text-sm text-[#B0B0B0]">
            Describe Object to Remove
          </label>
          <textarea
            value={object}
            onChange={(e) => setObject(e.target.value)}
            rows={3}
            placeholder="e.g. speaker, logo, person"
            className="mt-2 p-2 bg-[#2A2A2A] text-sm rounded-md
              border border-[#3A3A3A] outline-none"
          />

          <div className="mt-auto pt-6">
            <button
              disabled={loading}
              type="submit"
              className="w-full flex justify-center items-center gap-2
                bg-[#313131] border border-[#3A3A3A]
                hover:bg-[#3F3F3F]
                text-sm py-2 rounded-lg"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <Scissors className="w-5 h-5" />
              )}
              Remove Object
            </button>
          </div>
        </form>

        {/* RIGHT PREVIEW */}
        <div className="w-1/2 min-w-[420px] p-6 bg-[#191919] rounded-lg border border-[#2A2A2A] flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <Scissors className="w-5 h-5" />
            <h1 className="text-xl font-semibold">Processed Image</h1>
          </div>

          {!result ? (
            <div className="flex-1 flex justify-center items-center text-[#9E9E9E] text-sm">
              Upload an image and remove an object to preview
            </div>
          ) : (
            <img
              src={result}
              alt="Processed"
              className="rounded-lg w-full h-full object-contain"
            />
          )}
        </div>

      </div>
    </div>
  );
};

export default RemoveObject;

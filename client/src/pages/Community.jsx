import { useAuth, useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Community = () => {
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useUser();
  const { getToken } = useAuth();

  const fetchCreations = async () => {
    try {
      const { data } = await axios.get(
        "/api/user/get-published-creations",
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      if (data.success) {
        setCreations(data.creations);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const imageLikeToggle = async (id)=>{
    try {

      const { data } = await axios.post(
        "/api/user/toggle-like-creation",
        {id},
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      if(data.success){
        toast.success(data.message)
        await fetchCreations()
      }
      else{
        toast.error(data.message)
      }
      
    } catch (error) {
        toast.error(error.message)
    }
  }

  useEffect(() => {
    if (user) fetchCreations();
  }, [user]);

  if (loading) {
    return (
      <div className="flex-1 h-full flex items-center justify-center text-[#9E9E9E]">
        Loading community creations...
      </div>
    );
  }

  return !loading ? (
    <div className="flex-1 h-full p-6 bg-[#252525] text-[#E6E6E6] flex flex-col gap-4">
      <h1 className="text-xl font-semibold">Community Creations</h1>

      {/* MASONRY CONTAINER */}
      <div
        className="
          w-full h-full rounded-xl bg-[#191919] border border-[#2A2A2A]
          overflow-y-auto p-4
          columns-1 sm:columns-2 lg:columns-3
          gap-4
        "
      >
        {creations.map((creation) => (
          <div
            key={creation.id}
            className="
              relative mb-4 break-inside-avoid
              rounded-lg overflow-hidden bg-[#111] group
            "
          >
            {/* IMAGE */}
            <img
              src={creation.content}
              alt=""
              className="w-full h-auto object-cover"
              loading="lazy"
            />

            {/* OVERLAY */}
            <div
              className="
                absolute inset-0 flex flex-col justify-end
                p-3 gap-2
                bg-gradient-to-b from-transparent to-black/80
                opacity-0 group-hover:opacity-100 transition
              "
            >
              <p className="text-sm line-clamp-2">
                {creation.prompt}
              </p>

              <div className="flex items-center justify-end gap-2">
                <span className="text-sm">
                  {creation.likes?.length ?? 0}
                </span>
                <Heart
                  onClick={()=> imageLikeToggle(creation.id)}
                  className={`w-5 h-5 cursor-pointer ${
                    creation.likes?.includes(user?.id)
                      ? "fill-red-500 text-red-500"
                      : "text-[#E6E6E6]"
                  }`}
                />
              </div>
            </div>
          </div>
        ))}

        {!creations.length && (
          <div className="text-center text-[#9E9E9E] py-10">
            No community creations yet.
          </div>
        )}
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center h-full">
        <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></span>
    </div>
  )
};

export default Community;

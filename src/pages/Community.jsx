import { useUser } from '@clerk/clerk-react'
import React, { useEffect, useState } from 'react'
import { dummyPublishedCreationData } from '../assets/assets'
import { Heart } from 'lucide-react'

const Community = () => {

  const [creations, setCreations] = useState([])
  const { user } = useUser()

  const fetchCreations = async () => {
    setCreations(dummyPublishedCreationData)
  }

  useEffect(() => {
    if (user) fetchCreations()
  }, [user])

  return (
    <div className="flex-1 h-full p-6 bg-[#252525] text-[#E6E6E6] flex flex-col gap-4">

      <h1 className="text-xl font-semibold">Community Creations</h1>

      {/* Grid container */}
      <div className="h-full w-full rounded-xl bg-[#191919] border border-[#2A2A2A] 
                      overflow-y-auto p-4
                      grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        {creations.map((creation, index) => (
          <div
            key={index}
            className="relative group w-full aspect-square rounded-lg overflow-hidden bg-[#111]"
          >
            {/* Image */}
            <img
              src={creation.content}
              alt=""
              className="w-full h-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 flex flex-col justify-end 
                            p-3 gap-2
                            bg-gradient-to-b from-transparent to-black/80
                            opacity-0 group-hover:opacity-100 transition">

              <p className="text-sm text-[#E6E6E6] line-clamp-2">
                {creation.prompt}
              </p>

              <div className="flex items-center justify-end gap-2">
                <span className="text-sm text-[#E6E6E6]">
                  {creation.likes.length}
                </span>

                <Heart
                  className={`w-5 h-5 cursor-pointer transition-transform hover:scale-110
                    ${
                      creation.likes.includes(user?.id)
                        ? 'fill-red-500 text-red-500'
                        : 'text-[#E6E6E6]'
                    }`}
                />
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

export default Community

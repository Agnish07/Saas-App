import { Protect } from "@clerk/clerk-react";
import { Gem, Sparkles } from "lucide-react";
import React, { useEffect, useState } from "react";
import CreationItem from "../components/CreationItem";
import { dummyCreationData } from '../assets/assets';


const Dashboard = () => {
  const [creations, setCreations] = useState([]);

  const getDashboardData = async () => {
    setCreations(dummyCreationData);
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <div className="h-full overflow-y-scroll p-6 bg-[#252525]">

      <div className="flex justify-start gap-4 flex-wrap">
        
        {/* Total Creations */}
        <div className="flex justify-between items-center w-72 p-4 px-6 
                        bg-[#191919] rounded-xl border border-[#2A2A2A]">
          <div className="text-[#E6E6E6]">
            <p className="text-sm text-[#9E9E9E]">Total Creations</p>
            <h2 className="text-xl font-semibold text-[#E6E6E6]">
              {creations.length}
            </h2>
          </div>
          <div className="bg-[#2A2A2A] p-2 rounded-lg">
            <Sparkles className="w-5 h-5 text-[#E6E6E6]" />
          </div>
        </div>

        {/* Plan */}
        <div className="flex justify-between items-center w-72 p-4 px-6 
                        bg-[#191919] rounded-xl border border-[#2A2A2A]">
          <div className="text-[#E6E6E6]">
            <p className="text-sm text-[#9E9E9E]">Active Plan</p>
            <h2 className="text-xl font-semibold text-[#E6E6E6]">
              <Protect plan="premium" fallback="Free">Premium</Protect>
            </h2>
          </div>
          <div className="bg-[#2A2A2A] p-2 rounded-lg">
            <Gem className="w-5 h-5 text-[#E6E6E6]" />
          </div>
        </div>

      </div>

      <div className="flex flex-col gap-3">
          <p className="mt-6 mb-4 ">
            Recent Creations
          </p>

          {
            creations.map((item)=> <CreationItem key={item.id} item={item}/>)
          }
      </div>


    </div>
  );
};

export default Dashboard;

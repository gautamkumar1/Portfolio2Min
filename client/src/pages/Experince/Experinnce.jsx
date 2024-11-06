import React, { useEffect } from "react"
import {useExperienceStore} from "../../Zustand/Expreince Store/useExperienceStore"
import { useParams } from "react-router-dom";
export default function Experience() {
  const { username } = useParams();
  console.log(`username : ${username}`);

  const { data, loading, source, fetchExpData} = useExperienceStore();
  console.log(`data : ${JSON.stringify(data)}`);
  console.log(`source : ${source}`);
// console.log(`idAndCompanyRole : ${JSON.stringify(idAndCompanyRole)}`);

  useEffect(() => {
    fetchExpData(username);
  }, [fetchExpData, username]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-[#000814] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="relative mb-12">
          <h2 className="text-3xl font-bold inline-flex items-center gap-2">
            Work Experience            
          </h2>
        </div>

        <div className="relative pl-8 space-y-12">
          {/* Timeline line */}
          <div className="absolute left-[11px] top-2 bottom-0 w-0.5 bg-gray-700" />

          {/* Loop through each experience entry */}
          {data.map((experience) => (
            <div key={experience._id} className="relative">
              {/* Timeline dot */}
              <div className="absolute left-[-33px] w-6 h-6 rounded-full border-2 border-white bg-[#000814] flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">
                  {experience.companyAndRole}
                </h3>
                <p className="text-gray-400">{experience.duration}</p>
                
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Key Responsibilities:</h4>
                  <ul className="space-y-2 text-gray-400">
                    <li>• {experience.responsibilities}</li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

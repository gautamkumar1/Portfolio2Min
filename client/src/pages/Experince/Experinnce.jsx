import React from "react"
export default function Experinnce() {
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

          {/* First Experience */}
          <div className="relative">
            {/* Timeline dot */}
            <div className="absolute left-[-33px] w-6 h-6 rounded-full border-2 border-white bg-[#000814] flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">
                Full-Stack Intern @ <span className="text-green-400">Align InfoTech</span>
              </h3>
              <p className="text-gray-400">Feb 2022 - March 2022</p>
              
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Key Responsibilities:</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>• Designed and developed web applications using JavaScript and React.</li>
                  <li>• Built and maintained server-side APIs with Node.js and Express.</li>
                  <li>• Collaborated with cross-functional teams to deliver high-quality products.</li>
                  <li>• Ensured applications are responsive and performant.</li>
                  <li>• Participated in Agile ceremonies and contributed to project planning.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Second Experience */}
          <div className="relative">
            {/* Timeline dot */}
            <div className="absolute left-[-33px] w-6 h-6 rounded-full border-2 border-white bg-[#000814] flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">
                Web and Salesforce Developer @ <span className="text-green-400">IT-NetworkZ Infosystems</span>
              </h3>
              <p className="text-gray-400">Feb 2022 - April 2022</p>
              
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Key Responsibilities:</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>• Write modern, performant, maintainable code for a diverse array of client and internal projects.</li>
                  <li>• Work alongside creative directors to lead the research, development, and architecture of technical solutions to fulfill business requirements.</li>
                  <li>• Collaborate with designers, project managers, and other engineers to transform creative concepts into production realities for clients and stakeholders.</li>
                  <li>• Worked with Respective mentors where I learned about the Customer-Relationship Model of Salesforce.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
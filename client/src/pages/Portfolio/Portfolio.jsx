import React from "react";
import Introduction from "../Introduction/Introduction";
import Skills from "../Skills/Skills";
import Projects from "../Projects/Projects";
import Experinnce from "../Experince/Experinnce";
import GetInToTouch from "../GetInToTouch/GetInToTouch";
import Education from "../Education/Education";

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-[#000814] text-gray-100 p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Introduction Section*/}
        <Introduction />
      </div>

      {/* Education Section */}
      <div>
        <Education />
      </div>

      {/* Skills Section */}
      <div>
        <Skills />
      </div>

      {/* Experience Section */}
      <div>
        <Experinnce />
      </div>

      {/* Projects Section */}
      <div>
        <Projects />
      </div>

      {/* Get In Touch Section */}
      <div>
        <GetInToTouch />
      </div>
    </div>
  );
}

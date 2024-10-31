import { Github, Mail, Phone, Linkedin, Twitter } from "lucide-react"
import { Badge } from "../../../components/ui/badge"
import userDp from "../../assets/dummydp.jpg"
import Skills from "../Skills/Skills"
import Projects from "../Projects/Projects"
import Experinnce from "../Experince/Experinnce"
import GetInToTouch from "../GetInToTouch/GetInToTouch"
import Education from "../Education/Education"


export default function Portfolio() {
  return (
    <div className="min-h-screen bg-[#000814] text-gray-100 p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col-reverse sm:flex-row justify-between items-center sm:items-start gap-6 sm:gap-4">
          {/* Left Content */}
          <div className="space-y-4 text-center sm:text-left w-full sm:w-auto">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Gautam Kumar</h1>

            {/* Badges */}
            {/* Updated Badge Section */}
            <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
              <Badge
                variant="secondary"
                className="bg-white hover:bg-gray-100 text-black px-4 py-1 rounded-full font-medium transition-colors duration-200 shadow-sm"
              >

                <span className="font-bold">#OpenToWork</span>
              </Badge>
              <Badge
                variant="secondary"
                className="bg-white hover:bg-gray-100 text-black px-4 py-1 rounded-full font-medium transition-colors duration-200 shadow-sm"
              >
                <span className="font-bold">Hire Me!</span>
              </Badge>
            </div>

            {/* Role Description */}
            <p className="text-gray-400 text-base sm:text-lg font-medium">
              Full Stack Developer focused on learning through experimentation and product development.
            </p>

            {/* Location */}
            <div className="flex items-center gap-2 text-gray-300 justify-center sm:justify-start">
              <div className="w-4 h-4 rounded-full border-2 border-green-300 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-green-300" />
              </div>
              <span className="text-sm text-gray-400 sm:text-base">Noida, UP, India</span>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 pt-4 flex-wrap justify-center sm:justify-start">
              {[
                { icon: Mail, href: "#" },
                { icon: Phone, href: "#" },
                { icon: Github, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Twitter, href: "#" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="p-2 bg-[#1e293b] rounded-md hover:bg-green transition-colors hover:text-green-200 focus:ring-2 focus:ring-green-500 focus:outline-none"
                  aria-label={`Social link ${index + 1}`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Profile Image */}
          <div className="flex-shrink-0">
            <img
              src={userDp}
              alt="Profile photo"
              width={160}
              height={160}
              className="rounded-2xl border-2 border-cyan-800/30 shadow-xl"
            />
          </div>
        </div>

        {/* About Section */}
        <section className="mt-8 sm:mt-12">
          <h2 className="text-2xl font-bold mb-4 text-center sm:text-left">About</h2>
          <p className="text-gray-300 leading-relaxed text-center sm:text-left">
            Passionate Software Developer with a strong foundation in full-stack development.
            Proven track record in designing and implementing scalable, resilient, and
            user-centric applications. Adept at leveraging modern technologies to solve
            complex problems and deliver impactful solutions.
          </p>
        </section>

      </div>
      {/* Education Section */}
      <div>
        <Education />
      </div>
      {/* Skills */}
      <div>
        <Skills />
      </div>
      {/* Experience */}
      <div>
        <Experinnce />
      </div>
      {/* Projects */}
      <div>
        <Projects />
      </div>
      {/* Get In To Touch */}
      <div>
        <GetInToTouch />
      </div>
    </div>
  )
}
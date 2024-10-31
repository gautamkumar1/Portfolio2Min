import { Badge } from "../../../components/ui/badge"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card"
import { Github, Globe } from "lucide-react"
import { Link } from "react-router-dom"

const projects = [
  {
    id: 1,
    title: "Project Alpha",
    description: "A cutting-edge web application for managing personal finances.",
    image: "https://via.placeholder.com/300x200",
    techStack: ["React", "Node.js", "MongoDB", "Express"],
    githubLink: "https://github.com/yourusername/project-alpha",
    liveLink: "https://project-alpha.example.com",
  },
  {
    id: 2,
    title: "Beta Dashboard",
    description: "An intuitive dashboard for visualizing complex data sets.",
    image: "https://via.placeholder.com/300x200",
    techStack: ["Vue.js", "D3.js", "Firebase", "Tailwind CSS"],
    githubLink: "https://github.com/yourusername/beta-dashboard",
    liveLink: "https://beta-dashboard.example.com",
  },
  {
    id: 3,
    title: "Gamma API",
    description: "A robust RESTful API for seamless integration with various platforms.",
    image: "https://via.placeholder.com/300x200",
    techStack: ["Python", "FastAPI", "PostgreSQL", "Docker"],
    githubLink: "https://github.com/yourusername/gamma-api",
    liveLink: "https://api.gamma-project.example.com",
  },
]

export default function Projects() {
  return (
    <section className="bg-[#000814] text-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">My Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card key={project.id} className="bg-[#101825] border-gray-700">
              <CardHeader className="p-0">
                <img
                  loading="lazy"
                  src={project.image}
                  alt={`${project.title} preview`}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="text-xl font-semibold mb-2">{project.title}</CardTitle>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map((tech) => (
                    <Badge key={tech} variant="secondary"
                      className="bg-[#1e293b] hover:bg-[#2d3c51] text-gray-200 px-3 sm:px-4 py-1 text-xs sm:text-sm rounded-full 
                    transition-all duration-200 border border-gray-700/50 hover:border-gray-600/50 hover:transform hover:scale-105">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between p-6 pt-0">
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="border-[#101825] text-gray-300 hover:bg-[#101825] hover:text-white"
                >
                  <Link
                    to={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="border-[#101825] text-gray-300 hover:bg-[#101825] hover:text-white"
                >
                  <Link
                    to={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    <Globe className="mr-2 h-4 w-4" />
                    Live Demo
                  </Link>
                </Button>

              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
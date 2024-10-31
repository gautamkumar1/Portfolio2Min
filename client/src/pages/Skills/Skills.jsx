import { Badge } from "../../../components/ui/badge"

export default function Skills() {
  const skillCategories = [
    {
      title: "Languages",
      items: ["JavaScript", "TypeScript", "Python", "Java", "C", "C++"]
    },
    {
      title: "Frameworks & Libraries",
      items: ["React", "Node.js", "Express", "Next.js", "Redux", "Tailwind CSS", "Socket.io", "Shadcn UI"]
    },
    {
      title: "Databases",
      items: ["MySQL", "MongoDB", "Redis", "PostgreSQL"]
    },
    {
      title: "Tools",
      items: ["Git", "Docker", "Kubernetes", "AWS"]
    }
  ];

  return (
    <div className="min-h-screen bg-[#000814] text-white p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="relative">
          <h2 className="text-3xl font-bold text-center lg:text-left mb-12">
            Skills
          </h2>
        </div>

        {/* Skills Grid */}
        <div className="grid gap-6 sm:gap-8">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="space-y-3 bg-[#1F2836]/50 p-4 sm:p-6 rounded-xl backdrop-blur-sm border border-gray-800/50 hover:border-gray-700/50 transition-colors"
            >
              <h3 className="text-base sm:text-lg font-semibold flex gap-2 items-center text-gray-100">
                {category.title}
              </h3>

              <div className="flex flex-wrap gap-2 sm:gap-3">
                {category.items.map((item) => (
                  <Badge
                    key={item}
                    variant="secondary"
                    className="bg-[#1e293b] hover:bg-[#2d3c51] text-gray-200 px-3 sm:px-4 py-1 text-xs sm:text-sm rounded-full 
                  transition-all duration-200 border border-gray-700/50 hover:border-gray-600/50 hover:transform hover:scale-105"
                  >
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Optional: Add a subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#000814] via-transparent to-transparent opacity-50 pointer-events-none" />
      </div>
    </div>

  )
}
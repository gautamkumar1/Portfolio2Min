import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { Textarea } from "../../../../components/ui/textarea";
import { Loader } from "lucide-react";
import { toast } from "sonner";

export default function UserProjects() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    techstack: [],
    githubRepo: '',
    liveLink: '',
    projectImage: '',
  });
  const [tech, setTech] = useState('');
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTechChange = (e) => {
    setTech(e.target.value);
  };

  const addTech = () => {
    if (tech) {
      setFormData((prev) => ({
        ...prev,
        techstack: [...prev.techstack, tech],
      }));
      setTech('');
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please upload a project image.");
      return;
    }

    const submissionData = new FormData();
    submissionData.append('title', formData.title);
    submissionData.append('description', formData.description);
    submissionData.append('githubRepo', formData.githubRepo);
    submissionData.append('liveLink', formData.liveLink);
    submissionData.append('techstack', JSON.stringify(formData.techstack));
    submissionData.append('projectImage', file);

    setIsLoading(true);
    try {
      const response = await fetch("/api/user/projects/addProjects", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: submissionData,
      });

      const result = await response.json();
      if (response.ok) {
        setFormData((prev) => ({ ...prev, projectImage: result.projectImageUrl }));
        toast.success("Project added successfully!");
      } else {
        toast.error("Failed to added project.");
      }
    } catch (error) {
      console.error("Error added project:", error);
      toast.error("An error occurred while adding the project.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex items-center justify-center p-4 overflow-y-auto">
      <Card className="w-full max-w-2xl mx-auto bg-gray-800 border-gray-700 text-gray-100">
        <CardHeader>
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-600 animate-gradient-x">
              Showcase Your Projects
            </h1>
            <p className="text-gray-400 mt-2 text-sm">
              Share your best work and let your skills shine
            </p>
          </div>
          <CardTitle className="text-2xl text-gray-100">Projects Section</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-gray-300">Project Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Enter your project title"
                value={formData.title}
                onChange={handleChange}
                required
                className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description" className="text-gray-300">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Provide a detailed description of your project"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                required
                className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="techstack" className="text-gray-300">Tech Stack</Label>
              <div className="flex gap-2">
                <Input
                  id="techstack"
                  placeholder="e.g., React, Node.js"
                  value={tech}
                  onChange={handleTechChange}
                  className="bg-gray-700 border-gray-600 text-gray-100 flex-grow focus:ring-blue-500 focus:border-blue-500"
                />
                <Button
                  type="button"
                  onClick={addTech}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2"
                >
                  Add
                </Button>
              </div>
            </div>
            {formData.techstack.length > 0 && (
              <div className="space-y-2">
                <Label className="text-gray-300">Added Tech Stack</Label>
                <div className="flex flex-wrap gap-2">
                  {formData.techstack.map((item, index) => (
                    <span key={index} className="bg-gray-700 px-2 py-1 rounded text-sm text-gray-100 border border-gray-600">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="projectImage" className="text-gray-300">Project Image</Label>
              <Input
                type="file"
                id="projectImage"
                onChange={handleFileChange}
                className="bg-gray-700 border-gray-600 text-gray-100"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="githubRepo" className="text-gray-300">GitHub Repository</Label>
              <Input
                id="githubRepo"
                name="githubRepo"
                type="url"
                placeholder="https://github.com/username/repository"
                value={formData.githubRepo}
                onChange={handleChange}
                className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="liveLink" className="text-gray-300">Live Link</Label>
              <Input
                id="liveLink"
                name="liveLink"
                type="url"
                placeholder="https://project-live-link.com"
                value={formData.liveLink}
                onChange={handleChange}
                className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? <Loader className="animate-spin" /> : "Submit"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

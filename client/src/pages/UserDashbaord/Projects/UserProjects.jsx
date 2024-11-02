import { useState } from 'react';
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { Textarea } from "../../../../components/ui/textarea";

export default function UserProjects() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    techstack: '', // input for tech stack
    githubRepo: '',
    liveLink: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Here you would typically send the data to your backend
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
            {/* Title Input */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-gray-300">Project Title</Label>
              <Input
                id="title"
                name="title"
                placeholder=" Enter your project title"
                value={formData.title}
                onChange={handleChange}
                required
                className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            {/* Description Input */}
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
            {/* Tech Stack Input */}
            <div className="space-y-2">
              <Label htmlFor="techstack" className="text-gray-300">Tech Stack</Label>
              <Input
                id="techstack"
                name="techstack"
                placeholder="e.g., React, Node.js, MongoDB"
                value={formData.techstack}
                onChange={handleChange}
                className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            {/* GitHub Repo Input */}
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
            {/* Live Link Input */}
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
          >
            Submit
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

import { useState } from 'react'
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../../../components/ui/card"
import { Input } from "../../../../components/ui/input"
import { Label } from "../../../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../components/ui/select"
import { Textarea } from "../../../../components/ui/textarea"

export default function Introduction() {
  const [formData, setFormData] = useState({
    fullName: '',
    status: '',
    title: '',
    socialLinks: {
      linkedin: '',
      twitter: '',
      github: '',
    },
    imageUrl: '',
    about: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSocialChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [name]: value }
    }))
  }

  const handleStatusChange = (value) => {
    setFormData(prev => ({ ...prev, status: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
    // Here you would typically send the data to your backend
  }

  return (
    <div className="w-full flex items-center justify-center p-4 overflow-y-auto">
      <Card className="w-full max-w-2xl mx-auto bg-gray-800 border-gray-700 text-gray-100">
        <CardHeader>
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 animate-gradient-x">
              Craft Your Professional Profile
            </h1>
            <p className="text-gray-400 mt-2 text-sm">
              Share your story, showcase your potential
            </p>
          </div>
          <CardTitle className="text-2xl text-gray-100">Introduction Section</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-gray-300">Full Name</Label>
                <Input 
                  id="fullName" 
                  name="fullName" 
                  placeholder="Enter your full name"
                  value={formData.fullName} 
                  onChange={handleChange} 
                  required 
                  className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status" className="text-gray-300">Status</Label>
                <Select onValueChange={handleStatusChange} value={formData.status}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-gray-100">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="available" className="hover:bg-gray-700 text-green-400">#openToWork</SelectItem>
                    <SelectItem value="busy" className="hover:bg-gray-700 text-green-400" >Hire Me!</SelectItem>
                    <SelectItem value="offline" className="hover:bg-gray-700 text-green-400">Open to Opportunity</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="title" className="text-gray-300">Title</Label>
              <Input 
                id="title" 
                name="title" 
                placeholder="ex. Full Stack Developer"
                value={formData.title} 
                onChange={handleChange} 
                required 
                className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-300">Social Links</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input 
                  placeholder="LinkedIn" 
                  name="linkedin" 
                  value={formData.socialLinks.linkedin} 
                  onChange={handleSocialChange} 
                  className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                />
                <Input 
                  placeholder="Twitter" 
                  name="twitter" 
                  value={formData.socialLinks.twitter} 
                  onChange={handleSocialChange} 
                  className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                />
                <Input 
                  placeholder="GitHub" 
                  name="github" 
                  value={formData.socialLinks.github} 
                  onChange={handleSocialChange} 
                  className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="imageUrl" className="text-gray-300">Image URL</Label>
              <Input 
                id="imageUrl" 
                name="imageUrl" 
                placeholder="Enter image URL"
                value={formData.imageUrl} 
                onChange={handleChange} 
                type="url" 
                className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="about" className="text-gray-300">About</Label>
              <Textarea 
                id="about" 
                name="about" 
                placeholder="Tell us about yourself"
                value={formData.about} 
                onChange={handleChange} 
                rows={4} 
                className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
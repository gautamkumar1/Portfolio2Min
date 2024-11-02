import { useState } from 'react'
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../../../components/ui/card"
import { Input } from "../../../../components/ui/input"
import { Label } from "../../../../components/ui/label"

export default function UserSkills() {
  const [formData, setFormData] = useState({
    Languages: [],
    Tools: [],
    Databases: [],
    FrameworksAndLibraries: [],
    skillCategory: '',
    skill: ''
  })

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      skill: e.target.value
    }))
  }

  const handleSelectChange = (e) => {
    setFormData(prev => ({
      ...prev,
      skillCategory: e.target.value,
      skill: ''
    }))
  }

  const addSkill = () => {
    const { skillCategory, skill } = formData
    if (skill && skillCategory) {
      setFormData(prev => ({
        ...prev,
        [skillCategory]: [...prev[skillCategory], skill],
        skill: ''
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
    // Send data to backend
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-900">
      <Card className="w-full max-w-2xl mx-auto bg-gray-800 border-gray-700 text-gray-100">
        <CardHeader>
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 animate-gradient-x">
              Unleash Your Expertise
            </h1>
            <p className="text-gray-400 mt-2 text-sm">
              Define and showcase your proficiency across Languages, Tools, Databases, and Frameworks & Libraries.
            </p>
          </div>
          <CardTitle className="text-2xl text-gray-100">Skills Section</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {/* Dropdown for Skill Category */}
              <div className="space-y-2">
                <Label htmlFor="skillCategory" className="text-gray-300">Select Skill Category</Label>
                <select 
                  id="skillCategory" 
                  name="skillCategory" 
                  value={formData.skillCategory} 
                  onChange={handleSelectChange} 
                  required 
                  className="w-full bg-gray-700 border-gray-600 text-gray-100 p-2 rounded focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Choose a category</option>
                  <option value="Languages">Languages</option>
                  <option value="Tools">Tools</option>
                  <option value="Databases">Databases</option>
                  <option value="FrameworksAndLibraries">Frameworks & Libraries</option>
                </select>
              </div>
              
              {/* Skills Input */}
              {formData.skillCategory && (
                <div className="space-y-2">
                  <Label htmlFor="skill" className="text-gray-300">Add a Skill</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="skill" 
                      name="skill" 
                      placeholder={`Enter your ${formData.skillCategory} skill`} 
                      value={formData.skill} 
                      onChange={handleChange} 
                      required
                      className="flex-grow bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <Button 
                      type="button" 
                      onClick={addSkill} 
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2"
                    >
                      Add
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Display Added Skills */}
              {Object.keys(formData).map((category) =>
                Array.isArray(formData[category]) && formData[category].length > 0 ? (
                  <div key={category} className="space-y-2">
                    <Label className="text-gray-300">{category}</Label>
                    <div className="flex flex-wrap gap-2">
                      {formData[category].map((skill, index) => (
                        <span key={index} className="bg-gray-700 px-2 py-1 rounded text-sm text-gray-100 border border-gray-600">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null
              )}
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

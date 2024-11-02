import { useState } from 'react';
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { Textarea } from "../../../../components/ui/textarea";

export default function UserExperience() {
  const [formData, setFormData] = useState({
    companyAndRole: '', 
    duration: '',       
    responsibilities: '' 
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
            Elevate Your Experience
            </h1>
            <p className="text-gray-400 mt-2 text-sm">
            Showcase experiences to impress and inspire your professional journey.
            </p>
          </div>
          <CardTitle className="text-2xl text-gray-100">Experience Section</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
          

            {/* Experience Section */}
            <div className="mt-2">
              
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="companyAndRole" className="text-gray-300">Company & Role</Label>
                  <Input
                    id="companyAndRole"
                    name="companyAndRole"
                    value={formData.companyAndRole}
                    onChange={handleChange}
                    placeholder="e.g., Excellence Technologies@Full-Stack Developer"
                    required
                    className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration" className="text-gray-300">Duration</Label>
                  <Input
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="e.g., 2 years"
                    required
                    className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="responsibilities" className="text-gray-300">Responsibilities</Label>
                  <Textarea
                    id="responsibilities"
                    name="responsibilities"
                    value={formData.responsibilities}
                    onChange={handleChange}
                    rows={3}
                    required
                    className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
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

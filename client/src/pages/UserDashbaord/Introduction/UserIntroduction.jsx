import { useState, useEffect } from 'react';
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../components/ui/select";
import { Textarea } from "../../../../components/ui/textarea";
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export default function UserIntroduction() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [introId, setIntroId] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    status: '',
    title: '',
    location: '',
    socialLinks: {
      gmail: '',
      phone: '',
      github: '',
      linkedin: '',
      twitter: '',
    },
    image: '',
    about: '',
  });

  useEffect(() => {
    // Fetch existing data if it exists (for update)
    const fetchData = async () => {
      try {
        const response = await fetch("/api/user/getIntro", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.ok) {
          const responseData = await response.json();
          const data = responseData.data;

          setIntroId(data._id);
          
          // Set all form fields, including nested socialLinks
          setFormData({
            fullName: data.fullName || '',
            status: data.status || '',
            title: data.title || '',
            location: data.location || '',
            socialLinks: {
              gmail: data.socialLinks.gmail || '',
              phone: data.socialLinks.phone || '',
              github: data.socialLinks.github || '',
              linkedin: data.socialLinks.linkedin || '',
              twitter: data.socialLinks.twitter || '',
            },
            image: data.image || '',
            about: data.about || '',
          });
          setIsUpdate(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [name]: value },
    }));
  };

  const handleStatusChange = (value) => {
    setFormData((prev) => ({ ...prev, status: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(`Form data: ${JSON.stringify(formData)}`);
    
    try {
      const response = await fetch(isUpdate ? `/api/user/${introId}` : "/api/user/createIntro", {
        method: isUpdate ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();
      
      if (response.ok) {
        toast.success(isUpdate ? "Updated successfully" : "Saved successfully");
        window.location.reload();
      } else {
        console.error("Error:", responseData);
        
        // Displaying the main error message
        toast.error(responseData.message || "Error saving data");

        // Loop through each error in `errors` object to show detailed messages
        if (responseData.errors) {
          Object.values(responseData.errors).forEach(error => {
            toast.error(error.message);  // Display each validation error message
          });
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error creating introduction");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="w-full flex items-center justify-center p-4 overflow-y-auto">
      <Card className="w-full max-w-2xl mx-auto bg-gray-800 border-gray-700 text-gray-100">
        <CardHeader>
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 animate-gradient-x">
              {isUpdate ? "Update Your Profile" : "Craft Your Professional Profile"}
            </h1>
            <p className="text-gray-400 mt-2 text-sm">
              Share your story, showcase your potential
            </p>
          </div>
          <CardTitle className="text-2xl text-gray-100">{isUpdate ? "Edit Introduction" : "Introduction Section"}</CardTitle>
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
                    <SelectItem value="Hire Me!" className="hover:bg-gray-700 text-green-400">Hire Me!</SelectItem>
                    <SelectItem value="Open to Opportunity" className="hover:bg-gray-700 text-green-400">Open to Opportunity</SelectItem>
                    <SelectItem value="Busy" className="hover:bg-gray-700 text-green-400">Busy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="title" className="text-gray-300">Title</Label>
              <Input 
                id="title" 
                name="title" 
                placeholder="e.g., Full Stack Developer"
                value={formData.title} 
                onChange={handleChange} 
                required 
                className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location" className="text-gray-300">Location</Label>
              <Input 
                id="location" 
                name="location" 
                placeholder="e.g., Noida,Up,India"
                value={formData.location} 
                onChange={handleChange} 
                required 
                className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-300">Social Links</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input 
                  placeholder="Gmail" 
                  name="gmail" 
                  value={formData.socialLinks?.gmail || ''} 
                  onChange={handleSocialChange} 
                  className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                />
                <Input 
                  placeholder="Phone" 
                  name="phone" 
                  value={formData.socialLinks?.phone || ''}  
                  onChange={handleSocialChange} 
                  className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                />
                <Input 
                  placeholder="GitHub" 
                  name="github" 
                  value={formData.socialLinks?.github || ''} 
                  onChange={handleSocialChange} 
                  className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                />
                <Input 
                  placeholder="LinkedIn" 
                  name="linkedin" 
                  value={formData.socialLinks?.linkedin  || ''} 
                  onChange={handleSocialChange} 
                  className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                />
                <Input 
                  placeholder="Twitter" 
                  name="twitter" 
                  value={formData.socialLinks?.twitter || ''} 
                  onChange={handleSocialChange} 
                  className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="image" className="text-gray-300">Image URL</Label>
              <Input 
                id="image" 
                name="image" 
                placeholder="Enter github profile image url - https://avatars.githubusercontent.com/<username>"
                value={formData.image} 
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
            disabled={!formData.fullName} // Button disabled if no data entered
          >
            {isLoading ? 'Loading...' : isUpdate ? 'Update' : 'Save'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

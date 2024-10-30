
import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Textarea } from "../../../components/ui/textarea"
import { ScrollArea } from "../../../components/ui/scroll-area"

// Sample feedback data
const initialFeedbacks = [
  { id: 1, name: "John Doe", message: "Great service! Very satisfied with the product." },
  { id: 2, name: "Jane Smith", message: "The customer support was excellent. Thank you!" },
  { id: 3, name: "Mike Johnson", message: "Could use some improvements in the user interface." },
  { id: 4, name: "Sarah Williams", message: "Fast delivery and good quality. Will order again." },
  { id: 5, name: "Chris Brown", message: "Decent experience overall, but there's room for improvement." },
]

export default function FeedbackSection() {
  const [feedbacks, setFeedbacks] = useState(initialFeedbacks)
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = (t) => {
    e.preventDefault()
    if (name && message) {
      const newFeedback = {
        id: feedbacks.length + 1,
        name,
        message,
      }
      setFeedbacks([...feedbacks, newFeedback])
      setName("")
      setMessage("")
    }
  }

  return (
    <div className="container mx-auto p-4 bg-[#0C0A09]">
      <div className="col-span-2 flex justify-center mb-6">
        <h1 className="text-2xl font-bold text-center">&#8203;</h1>
      </div>
      <h1 className="text-3xl font-bold mb-6 text-center text-white">Share Your Thoughts on Portfolio2Min!</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="flex-1 border-zinc-700">
          <CardHeader>
            <CardTitle className="text-white">Recent Feedbacks</CardTitle>
            <CardDescription>See what others are saying about us</CardDescription>
          </CardHeader>
          <CardContent className="border-zinc-700">
            <ScrollArea className="h-[400px] md:h-[600px]">
              {feedbacks.map((feedback) => (
                <Card key={feedback.id} className="mb-4">
                  <CardHeader>
                    <CardTitle className="text-white ">{feedback.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{feedback.message}</p>
                  </CardContent>
                </Card>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
        <Card className="flex-1 border-zinc-700">
          <CardHeader>
            <CardTitle className="text-white">Submit Your Feedback</CardTitle>

          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name" className="text-white">Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="message" className="text-white">Your Feedback</Label>
                  <Textarea
                    id="message"
                    placeholder="Share your thoughts..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-white text-black hover:bg-white hover:text-black" onClick={handleSubmit}>
              Submit Feedback
            </Button>



          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
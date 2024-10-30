import { useState, React } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { Avatar, AvatarFallback } from "../../../components/ui/avatar";

export default function Feedback() {
  // Simulated feedback data
  const [feedbacks, setFeedbacks] = useState([
    { id: 1, username: "Gautam", message: "Great experience using this platform!" },
    { id: 2, username: "Ananya", message: "The new features are really helpful." },
    { id: 3, username: "Rohit_Tech", message: "Would love to see more tutorials." },
    { id: 4, username: "Amit", message: "The new features are really helpful." },
  ]);

  const [newFeedback, setNewFeedback] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newFeedback.trim()) return;

    // Add new feedback at the beginning of the list
    setFeedbacks([
      {
        id: feedbacks.length + 1,
        username: "current_user", // Replace with dynamic username in real app
        message: newFeedback.trim(),
      },
      ...feedbacks,
    ]);
    setNewFeedback("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="col-span-2 flex justify-center mb-6">
        <h1 className="text-2xl font-bold text-center">Share Your Thoughts on Portfolio2Min!</h1>
      </div>
      <div className="grid gap-6 md:grid-cols-2 max-w-3xl w-full">
        
        {/* Existing Feedback Display */}
        <Card className="md:order-1">
          <CardHeader>
            <CardTitle>Recent Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Add a scrollable container with a fixed max height */}
            <div className="space-y-4 max-h-[400px] overflow-y-auto">
              {feedbacks.map((feedback) => (
                <div key={feedback.id} className="flex items-start gap-3 p-4 rounded-lg border">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{feedback.username[0].toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">@{feedback.username}</p>
                    <p className="text-sm text-muted-foreground">{feedback.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Feedback Submission Form */}
        <Card className="md:order-2">
          <CardHeader>
            <CardTitle>Submit Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  placeholder="Your username"
                  defaultValue="current_user"
                  disabled
                  className="max-w-[200px]"
                />
              </div>
              <div className="space-y-2">
                <Textarea
                  placeholder="Write your feedback here..."
                  value={newFeedback}
                  onChange={(e) => setNewFeedback(e.target.value)}
                  className="min-h-[150px]"
                />
              </div>
              <Button type="submit" className="w-full">
                Submit Feedback
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

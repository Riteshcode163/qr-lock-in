import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Camera, CheckCircle2, History } from "lucide-react";
import { toast } from "sonner";

const StudentLogin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const [attendanceMarked, setAttendanceMarked] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const mockAttendanceHistory = [
    { date: "2025-11-01", time: "09:15 AM", subject: "Data Structures", status: "Present" },
    { date: "2025-11-01", time: "11:30 AM", subject: "Database Systems", status: "Present" },
    { date: "2025-10-31", time: "09:20 AM", subject: "Data Structures", status: "Present" },
    { date: "2025-10-31", time: "02:00 PM", subject: "Web Development", status: "Present" },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && rollNo) {
      setIsLoggedIn(true);
      toast.success(`Welcome, ${name}!`);
    }
  };

  const handleScan = () => {
    setShowScanner(true);
    setTimeout(() => {
      setShowScanner(false);
      setAttendanceMarked(true);
      toast.success("Attendance marked successfully!", {
        description: "Device IP has been recorded."
      });
    }, 2000);
  };

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto space-y-6">
            <Card className="border-2 animate-fade-in">
              <CardHeader>
                <CardTitle className="text-2xl">Welcome, {name}</CardTitle>
                <CardDescription>Roll Number: {rollNo}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {!attendanceMarked ? (
                  <div className="space-y-4">
                    <Button 
                      size="lg" 
                      className="w-full gap-2"
                      onClick={handleScan}
                      disabled={showScanner}
                    >
                      <Camera className="w-5 h-5" />
                      {showScanner ? "Scanning..." : "Scan QR Code"}
                    </Button>
                    
                    {showScanner && (
                      <div className="bg-muted p-8 rounded-lg flex flex-col items-center gap-4 animate-fade-in">
                        <Camera className="w-16 h-16 text-primary animate-pulse" />
                        <p className="text-muted-foreground">Camera activated. Please scan the QR code...</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-primary/10 border-2 border-primary rounded-lg p-6 flex items-center gap-4 animate-scale-in">
                    <CheckCircle2 className="w-12 h-12 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-lg">Attendance Marked Successfully</h3>
                      <p className="text-sm text-muted-foreground">Device IP recorded. Time: {new Date().toLocaleTimeString()}</p>
                    </div>
                  </div>
                )}

                <Button 
                  variant="outline" 
                  className="w-full gap-2"
                  onClick={() => setShowHistory(!showHistory)}
                >
                  <History className="w-5 h-5" />
                  {showHistory ? "Hide" : "View"} Attendance History
                </Button>

                {showHistory && (
                  <Card className="animate-fade-in">
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-4">My Attendance History</h3>
                      <div className="space-y-3">
                        {mockAttendanceHistory.map((record, index) => (
                          <div key={index} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                            <div>
                              <p className="font-medium">{record.subject}</p>
                              <p className="text-sm text-muted-foreground">{record.date} • {record.time}</p>
                            </div>
                            <span className="text-sm font-medium text-primary">{record.status}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <Card className="border-2 animate-fade-in">
            <CardHeader>
              <CardTitle className="text-2xl">Student Login</CardTitle>
              <CardDescription>Enter your details to mark attendance</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name" 
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="rollno">Roll Number</Label>
                  <Input 
                    id="rollno" 
                    placeholder="Enter your roll number"
                    value={rollNo}
                    onChange={(e) => setRollNo(e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Login
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default StudentLogin;

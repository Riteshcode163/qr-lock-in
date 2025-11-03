import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { QrCode, Users } from "lucide-react";
import { toast } from "sonner";
import { QRCodeSVG } from "qrcode.react";

interface AttendanceRecord {
  studentName: string;
  rollNo: string;
  timestamp: string;
  deviceIP: string;
}

const FacultyLogin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [password, setPassword] = useState("");
  const [qrData, setQrData] = useState("");
  const [sessionId, setSessionId] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && subject && password) {
      setIsLoggedIn(true);
      toast.success(`Welcome, ${name}!`);
    }
  };

  const handleGenerateQR = () => {
    const newSessionId = `SESSION-${Date.now()}`;
    const timestamp = new Date().toLocaleString();
    const qrContent = JSON.stringify({
      sessionId: newSessionId,
      subject: subject,
      faculty: name,
      timestamp: timestamp,
    });
    
    setSessionId(newSessionId);
    setQrData(qrContent);
    
    // Store session in localStorage
    const sessions = JSON.parse(localStorage.getItem("attendanceSessions") || "[]");
    sessions.push({
      sessionId: newSessionId,
      subject: subject,
      faculty: name,
      timestamp: timestamp,
      active: true,
    });
    localStorage.setItem("attendanceSessions", JSON.stringify(sessions));
    
    toast.success("QR Code generated successfully!", {
      description: "Students can now scan to mark attendance."
    });
  };

  const getSessionAttendance = (): AttendanceRecord[] => {
    if (!sessionId) return [];
    const allAttendance = JSON.parse(localStorage.getItem("attendance") || "[]");
    return allAttendance.filter((record: any) => record.sessionId === sessionId);
  };

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl">Faculty Dashboard</CardTitle>
                <CardDescription>Welcome, {name} | Subject: {subject}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Button 
                  size="lg" 
                  className="w-full gap-2"
                  onClick={handleGenerateQR}
                >
                  <QrCode className="w-5 h-5" />
                  Generate QR Code for Class
                </Button>

                {qrData && (
                  <div className="bg-card border-2 border-primary rounded-lg p-8 flex flex-col items-center gap-4">
                    <div className="bg-white p-6 rounded-lg">
                      <QRCodeSVG value={qrData} size={200} level="H" />
                    </div>
                    <div className="text-center">
                      <h3 className="font-semibold text-lg">QR Code Generated Successfully</h3>
                      <p className="text-sm text-muted-foreground">Session ID: {sessionId}</p>
                      <p className="text-sm text-muted-foreground">Students can scan now</p>
                    </div>
                  </div>
                )}

                <Card className="border">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Users className="w-5 h-5 text-primary" />
                      <h3 className="font-semibold text-lg">Current Class Attendance</h3>
                    </div>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-3 font-semibold">Student Name</th>
                            <th className="text-left p-3 font-semibold">Roll No</th>
                            <th className="text-left p-3 font-semibold">Time</th>
                            <th className="text-left p-3 font-semibold">Device IP</th>
                          </tr>
                        </thead>
                        <tbody>
                          {getSessionAttendance().length === 0 ? (
                            <tr>
                              <td colSpan={4} className="text-center py-8 text-muted-foreground">
                                No attendance marked yet
                              </td>
                            </tr>
                          ) : (
                            getSessionAttendance().map((record, index) => (
                              <tr key={index} className="border-b hover:bg-muted/50">
                                <td className="p-3">{record.studentName}</td>
                                <td className="p-3 text-muted-foreground">{record.rollNo}</td>
                                <td className="p-3 text-muted-foreground">{new Date(record.timestamp).toLocaleTimeString()}</td>
                                <td className="p-3 text-muted-foreground font-mono text-sm">{record.deviceIP}</td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
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
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl">Faculty Login</CardTitle>
              <CardDescription>Access your faculty dashboard</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="faculty-name">Faculty Name</Label>
                  <Input 
                    id="faculty-name" 
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input 
                    id="subject" 
                    placeholder="Enter subject name"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

export default FacultyLogin;

import { useState, useRef } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Camera, CheckCircle2, History } from "lucide-react";
import { toast } from "sonner";
import { Html5Qrcode } from "html5-qrcode";

interface AttendanceRecord {
  sessionId: string;
  subject: string;
  timestamp: string;
  status: string;
}

const StudentLogin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && rollNo) {
      setIsLoggedIn(true);
      toast.success(`Welcome, ${name}!`);
    }
  };

  const getDeviceIP = async (): Promise<string> => {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      return data.ip;
    } catch (error) {
      return "Unknown";
    }
  };

  const startScanning = async () => {
    setIsScanning(true);
    try {
      const scanner = new Html5Qrcode("qr-reader");
      scannerRef.current = scanner;

      await scanner.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        async (decodedText) => {
          await handleScanSuccess(decodedText);
          scanner.stop();
          setIsScanning(false);
        },
        () => {
          // Scan error - ignore
        }
      );
    } catch (err) {
      toast.error("Camera Error", {
        description: "Unable to access camera. Please check permissions."
      });
      setIsScanning(false);
    }
  };

  const handleScanSuccess = async (decodedText: string) => {
    try {
      const qrData = JSON.parse(decodedText);
      const deviceIP = await getDeviceIP();
      
      // Check if attendance already exists
      const allAttendance = JSON.parse(localStorage.getItem("attendance") || "[]");
      const existingRecord = allAttendance.find(
        (record: any) => 
          record.sessionId === qrData.sessionId && 
          record.rollNo === rollNo
      );

      if (existingRecord) {
        if (existingRecord.deviceIP !== deviceIP) {
          toast.error("Invalid Device", {
            description: "Attendance already marked from a different device."
          });
          return;
        } else {
          toast.error("Already Marked", {
            description: "Your attendance is already recorded for this session."
          });
          return;
        }
      }

      // Store attendance
      const newRecord = {
        sessionId: qrData.sessionId,
        subject: qrData.subject,
        faculty: qrData.faculty,
        studentName: name,
        rollNo: rollNo,
        timestamp: new Date().toISOString(),
        deviceIP: deviceIP,
      };

      allAttendance.push(newRecord);
      localStorage.setItem("attendance", JSON.stringify(allAttendance));

      toast.success("Attendance marked successfully!", {
        description: "Device IP has been recorded."
      });
    } catch (error) {
      toast.error("Invalid QR Code", {
        description: "Please scan a valid attendance QR code."
      });
    }
  };

  const stopScanning = () => {
    if (scannerRef.current) {
      scannerRef.current.stop();
      setIsScanning(false);
    }
  };

  const getMyAttendance = (): AttendanceRecord[] => {
    const allAttendance = JSON.parse(localStorage.getItem("attendance") || "[]");
    return allAttendance
      .filter((record: any) => record.rollNo === rollNo)
      .map((record: any) => ({
        sessionId: record.sessionId,
        subject: record.subject,
        timestamp: record.timestamp,
        status: "Present",
      }));
  };

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl">Welcome, {name}</CardTitle>
                <CardDescription>Roll Number: {rollNo}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {!isScanning ? (
                    <Button 
                      size="lg" 
                      className="w-full gap-2"
                      onClick={startScanning}
                    >
                      <Camera className="w-5 h-5" />
                      Scan QR Code
                    </Button>
                  ) : (
                    <div>
                      <div id="qr-reader" className="mx-auto mb-4"></div>
                      <Button onClick={stopScanning} variant="destructive" className="w-full">
                        Stop Scanning
                      </Button>
                    </div>
                  )}
                </div>

                <Button 
                  variant="outline" 
                  className="w-full gap-2"
                  onClick={() => setShowHistory(!showHistory)}
                >
                  <History className="w-5 h-5" />
                  {showHistory ? "Hide" : "View"} Attendance History
                </Button>

                {showHistory && (
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-4">My Attendance History</h3>
                      {getMyAttendance().length === 0 ? (
                        <p className="text-center py-8 text-muted-foreground">
                          No attendance records found
                        </p>
                      ) : (
                        <div className="space-y-3">
                          {getMyAttendance().map((record, index) => (
                            <div key={index} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                              <div>
                                <p className="font-medium">{record.subject}</p>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(record.timestamp).toLocaleDateString()} • {new Date(record.timestamp).toLocaleTimeString()}
                                </p>
                              </div>
                              <span className="text-sm font-medium text-primary">{record.status}</span>
                            </div>
                          ))}
                        </div>
                      )}
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
          <Card className="border-2">
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

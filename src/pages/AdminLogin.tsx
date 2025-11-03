import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileText, Download, BarChart3, Users, BookOpen, Calendar } from "lucide-react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AttendanceRecord {
  sessionId: string;
  subject: string;
  faculty: string;
  studentName: string;
  rollNo: string;
  timestamp: string;
  deviceIP: string;
}

const AdminLogin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [filterSubject, setFilterSubject] = useState<string>("all");
  const [filterFaculty, setFilterFaculty] = useState<string>("all");
  const [filterDate, setFilterDate] = useState<string>("all");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminId && password) {
      setIsLoggedIn(true);
      toast.success("Welcome, Administrator!");
    }
  };

  const getAllAttendance = (): AttendanceRecord[] => {
    return JSON.parse(localStorage.getItem("attendance") || "[]");
  };

  const getAllSessions = () => {
    return JSON.parse(localStorage.getItem("attendanceSessions") || "[]");
  };

  const getUniqueSubjects = (): string[] => {
    const sessions = getAllSessions();
    const subjects = sessions.map((s: any) => s.subject).filter((s: any) => typeof s === 'string');
    return Array.from(new Set(subjects));
  };

  const getUniqueFaculty = (): string[] => {
    const sessions = getAllSessions();
    const faculty = sessions.map((s: any) => s.faculty).filter((f: any) => typeof f === 'string');
    return Array.from(new Set(faculty));
  };

  const getUniqueDates = (): string[] => {
    const records = getAllAttendance();
    return [...new Set(records.map((r: any) => new Date(r.timestamp).toLocaleDateString()))];
  };

  const getFilteredAttendance = (): AttendanceRecord[] => {
    let records = getAllAttendance();
    
    if (filterSubject !== "all") {
      records = records.filter((r) => r.subject === filterSubject);
    }
    
    if (filterFaculty !== "all") {
      records = records.filter((r) => r.faculty === filterFaculty);
    }

    if (filterDate !== "all") {
      records = records.filter((r) => new Date(r.timestamp).toLocaleDateString() === filterDate);
    }
    
    return records.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  };

  const getTotalStudents = (): number => {
    const records = getAllAttendance();
    return new Set(records.map((r) => r.rollNo)).size;
  };

  const getTotalSessions = (): number => {
    return getAllSessions().length;
  };

  const exportToCSV = () => {
    const records = getFilteredAttendance();
    const headers = ["Student Name", "Roll No", "Subject", "Faculty", "Date", "Time", "Device IP"];
    const rows = records.map((r) => [
      r.studentName,
      r.rollNo,
      r.subject,
      r.faculty,
      new Date(r.timestamp).toLocaleDateString(),
      new Date(r.timestamp).toLocaleTimeString(),
      r.deviceIP,
    ]);
    
    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "attendance-records.csv";
    a.click();
    
    toast.success("CSV Download Started", {
      description: "Attendance records are being exported."
    });
  };

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl">Admin Dashboard</CardTitle>
                <CardDescription>System Overview and Attendance Records</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <Card className="bg-primary/10 border-primary">
                    <CardContent className="p-6">
                      <div className="text-center">
                        <Users className="w-8 h-8 mx-auto mb-2 text-primary" />
                        <p className="text-3xl font-bold text-primary">{getTotalStudents()}</p>
                        <p className="text-sm text-muted-foreground mt-1">Total Students</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-secondary/10 border-secondary">
                    <CardContent className="p-6">
                      <div className="text-center">
                        <BookOpen className="w-8 h-8 mx-auto mb-2 text-secondary" />
                        <p className="text-3xl font-bold text-secondary">{getUniqueSubjects().length}</p>
                        <p className="text-sm text-muted-foreground mt-1">Active Subjects</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-accent/10 border-accent">
                    <CardContent className="p-6">
                      <div className="text-center">
                        <Calendar className="w-8 h-8 mx-auto mb-2 text-accent" />
                        <p className="text-3xl font-bold text-accent">{getTotalSessions()}</p>
                        <p className="text-sm text-muted-foreground mt-1">Total Sessions</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="border">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-primary" />
                        <h3 className="font-semibold text-lg">All Attendance Records</h3>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        <Select value={filterSubject} onValueChange={setFilterSubject}>
                          <SelectTrigger className="w-[160px]">
                            <SelectValue placeholder="Filter by Subject" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Subjects</SelectItem>
                            {getUniqueSubjects().map((subject) => (
                              <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <Select value={filterFaculty} onValueChange={setFilterFaculty}>
                          <SelectTrigger className="w-[160px]">
                            <SelectValue placeholder="Filter by Faculty" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Faculty</SelectItem>
                            {getUniqueFaculty().map((faculty) => (
                              <SelectItem key={faculty} value={faculty}>{faculty}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <Select value={filterDate} onValueChange={setFilterDate}>
                          <SelectTrigger className="w-[160px]">
                            <SelectValue placeholder="Filter by Date" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Dates</SelectItem>
                            {getUniqueDates().map((date) => (
                              <SelectItem key={date} value={date}>{date}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <Button onClick={exportToCSV} variant="outline" className="gap-2">
                          <Download className="w-4 h-4" />
                          CSV
                        </Button>
                      </div>
                    </div>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-3 font-semibold">Student Name</th>
                            <th className="text-left p-3 font-semibold">Roll No</th>
                            <th className="text-left p-3 font-semibold">Subject</th>
                            <th className="text-left p-3 font-semibold">Faculty</th>
                            <th className="text-left p-3 font-semibold">Date</th>
                            <th className="text-left p-3 font-semibold">Time</th>
                            <th className="text-left p-3 font-semibold">Device/IP</th>
                          </tr>
                        </thead>
                        <tbody>
                          {getFilteredAttendance().length === 0 ? (
                            <tr>
                              <td colSpan={7} className="text-center py-8 text-muted-foreground">
                                No attendance records found
                              </td>
                            </tr>
                          ) : (
                            getFilteredAttendance().map((record, index) => (
                              <tr key={index} className="border-b hover:bg-muted/50">
                                <td className="p-3">{record.studentName}</td>
                                <td className="p-3 text-muted-foreground">{record.rollNo}</td>
                                <td className="p-3 text-muted-foreground">{record.subject}</td>
                                <td className="p-3 text-muted-foreground">{record.faculty}</td>
                                <td className="p-3 text-muted-foreground">{new Date(record.timestamp).toLocaleDateString()}</td>
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
              <CardTitle className="text-2xl">Admin Login</CardTitle>
              <CardDescription>Access the administrative dashboard</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-id">Admin ID</Label>
                  <Input 
                    id="admin-id" 
                    placeholder="Enter your admin ID"
                    value={adminId}
                    onChange={(e) => setAdminId(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="admin-password">Password</Label>
                  <Input 
                    id="admin-password" 
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

export default AdminLogin;

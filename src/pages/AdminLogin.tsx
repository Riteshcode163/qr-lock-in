import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileText, Download, BarChart3 } from "lucide-react";
import { toast } from "sonner";

const AdminLogin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");

  const mockAttendanceData = [
    { name: "John Smith", rollNo: "CS101", date: "2025-11-01", time: "09:15 AM", ip: "192.168.1.45" },
    { name: "Sarah Johnson", rollNo: "CS102", date: "2025-11-01", time: "09:16 AM", ip: "192.168.1.67" },
    { name: "Mike Davis", rollNo: "CS103", date: "2025-11-01", time: "09:17 AM", ip: "192.168.1.89" },
    { name: "Emily Wilson", rollNo: "CS104", date: "2025-11-01", time: "09:18 AM", ip: "192.168.1.23" },
    { name: "David Brown", rollNo: "CS105", date: "2025-11-01", time: "11:30 AM", ip: "192.168.1.56" },
    { name: "Lisa Anderson", rollNo: "CS106", date: "2025-11-01", time: "11:32 AM", ip: "192.168.1.78" },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminId && password) {
      setIsLoggedIn(true);
      toast.success("Welcome, Administrator!");
    }
  };

  const handleViewReports = () => {
    toast.info("Reports view opened", {
      description: "Detailed analytics and reports are displayed."
    });
  };

  const handleDownloadCSV = () => {
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
            <Card className="border-2 animate-fade-in">
              <CardHeader>
                <CardTitle className="text-2xl">Admin Dashboard</CardTitle>
                <CardDescription>System Overview and Attendance Records</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <Card className="bg-primary/10 border-primary">
                    <CardContent className="p-6">
                      <div className="text-center">
                        <p className="text-3xl font-bold text-primary">156</p>
                        <p className="text-sm text-muted-foreground mt-1">Total Students</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-secondary/10 border-secondary">
                    <CardContent className="p-6">
                      <div className="text-center">
                        <p className="text-3xl font-bold text-secondary">94%</p>
                        <p className="text-sm text-muted-foreground mt-1">Attendance Rate</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-accent/10 border-accent">
                    <CardContent className="p-6">
                      <div className="text-center">
                        <p className="text-3xl font-bold text-accent">12</p>
                        <p className="text-sm text-muted-foreground mt-1">Active Classes</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex gap-4">
                  <Button 
                    variant="outline" 
                    className="gap-2"
                    onClick={handleViewReports}
                  >
                    <BarChart3 className="w-5 h-5" />
                    View Reports
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="gap-2"
                    onClick={handleDownloadCSV}
                  >
                    <Download className="w-5 h-5" />
                    Download CSV
                  </Button>
                </div>

                <Card className="border">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <FileText className="w-5 h-5 text-primary" />
                      <h3 className="font-semibold text-lg">All Attendance Records</h3>
                    </div>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-3 font-semibold">Student Name</th>
                            <th className="text-left p-3 font-semibold">Roll No</th>
                            <th className="text-left p-3 font-semibold">Date</th>
                            <th className="text-left p-3 font-semibold">Time</th>
                            <th className="text-left p-3 font-semibold">Device/IP</th>
                          </tr>
                        </thead>
                        <tbody>
                          {mockAttendanceData.map((record, index) => (
                            <tr key={index} className="border-b hover:bg-muted/50">
                              <td className="p-3">{record.name}</td>
                              <td className="p-3 text-muted-foreground">{record.rollNo}</td>
                              <td className="p-3 text-muted-foreground">{record.date}</td>
                              <td className="p-3 text-muted-foreground">{record.time}</td>
                              <td className="p-3 text-muted-foreground font-mono text-sm">{record.ip}</td>
                            </tr>
                          ))}
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
          <Card className="border-2 animate-fade-in">
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

import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { GraduationCap, UserCircle, Shield } from "lucide-react";
import heroImage from "@/assets/hero-qr-scan.jpg";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-5xl font-bold leading-tight">
              Automated Attendance System Using QR Code
            </h1>
            
            <p className="text-xl text-primary font-medium">
              Smart, Secure, and Digital Attendance for Modern Classrooms.
            </p>
            
            <p className="text-muted-foreground leading-relaxed">
              This project replaces traditional manual attendance with a QR code–based system. 
              Students scan a unique QR code to mark attendance, and their device IP is stored 
              to prevent multiple or fake entries. Faculty can generate QR codes for each class, 
              and admins can monitor records in real-time.
            </p>
            
            <div className="grid gap-4 pt-4">
              <Button 
                size="lg" 
                className="w-full justify-start gap-3 text-lg h-14"
                onClick={() => navigate("/student-login")}
              >
                <GraduationCap className="w-6 h-6" />
                Student Login
              </Button>
              
              <Button 
                size="lg" 
                variant="secondary"
                className="w-full justify-start gap-3 text-lg h-14"
                onClick={() => navigate("/faculty-login")}
              >
                <UserCircle className="w-6 h-6" />
                Faculty Login
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="w-full justify-start gap-3 text-lg h-14"
                onClick={() => navigate("/admin-login")}
              >
                <Shield className="w-6 h-6" />
                Admin Login
              </Button>
            </div>
          </div>
          
          <div className="animate-scale-in">
            <img 
              src={heroImage} 
              alt="Student scanning QR code for attendance" 
              className="rounded-2xl shadow-2xl w-full"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;

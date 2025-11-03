import Navigation from "@/components/Navigation";
import FeatureCard from "@/components/FeatureCard";
import { Camera, Shield, BarChart3, FileText, Clock, Users } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Camera,
      title: "QR Code Attendance",
      description: "Students scan to mark attendance instantly with their mobile devices."
    },
    {
      icon: Shield,
      title: "Device/IP Verification",
      description: "Attendance accepted once per device to prevent proxy and fake entries."
    },
    {
      icon: BarChart3,
      title: "Dashboard View",
      description: "Faculty and Admin can view real-time attendance analytics and insights."
    },
    {
      icon: FileText,
      title: "Attendance Reports",
      description: "Generate comprehensive reports or view detailed attendance summaries."
    },
    {
      icon: Clock,
      title: "Timed QR Codes",
      description: "QR codes expire after class time to ensure maximum security."
    },
    {
      icon: Users,
      title: "Multi-Role Access",
      description: "Separate portals for students, faculty, and administrators."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4 animate-fade-in">
            <h1 className="text-4xl font-bold">Features</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore the powerful features that make our QR-based attendance system 
              smart, secure, and efficient for modern educational institutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} style={{ animationDelay: `${index * 0.1}s` }}>
                <FeatureCard {...feature} />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Features;

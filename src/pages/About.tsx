import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Target, CheckCircle2, Users, Lock, TrendingUp, Clock } from "lucide-react";

const About = () => {
  const objectives = [
    { icon: Lock, text: "Eliminate fake or proxy attendance" },
    { icon: Users, text: "Simplify attendance marking for faculty" },
    { icon: TrendingUp, text: "Improve transparency and data accuracy" },
  ];

  const steps = [
    { icon: Users, title: "Faculty generates a class QR code", color: "bg-primary" },
    { icon: CheckCircle2, title: "Students scan using their mobile", color: "bg-secondary" },
    { icon: Clock, title: "System logs student info, time, and device IP", color: "bg-accent" },
    { icon: Lock, title: "Duplicate or invalid scans are blocked", color: "bg-destructive" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4 animate-fade-in">
            <h1 className="text-4xl font-bold">About the Project</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              The Automated Attendance System Using QR Code aims to bring transparency, 
              accuracy, and security to attendance tracking. The system prevents proxy 
              attendance by locking attendance submissions to a single device IP per student.
            </p>
          </div>

          <Card className="border-2 animate-scale-in">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-8 h-8 text-primary" />
                <h2 className="text-2xl font-semibold">Key Objectives</h2>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                {objectives.map((obj, index) => (
                  <div key={index} className="flex flex-col items-center text-center gap-3 p-4 bg-muted rounded-lg">
                    <obj.icon className="w-10 h-10 text-primary" />
                    <p className="font-medium">{obj.text}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 animate-scale-in">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold mb-6">How It Works</h2>
              
              <div className="space-y-6">
                {steps.map((step, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className={`${step.color} p-3 rounded-lg flex-shrink-0`}>
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 pt-2">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold text-primary">{index + 1}</span>
                        <p className="text-lg font-medium">{step.title}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default About;

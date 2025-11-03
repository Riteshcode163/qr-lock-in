import { Link, useLocation } from "react-router-dom";
import { QrCode } from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-xl font-semibold text-foreground hover:text-primary transition-colors">
            <QrCode className="w-7 h-7 text-primary" />
            <span>QR Attendance</span>
          </Link>
          
          <div className="flex gap-6">
            <Link 
              to="/" 
              className={`font-medium transition-colors hover:text-primary ${
                isActive("/") ? "text-primary" : "text-foreground"
              }`}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`font-medium transition-colors hover:text-primary ${
                isActive("/about") ? "text-primary" : "text-foreground"
              }`}
            >
              About
            </Link>
            <Link 
              to="/features" 
              className={`font-medium transition-colors hover:text-primary ${
                isActive("/features") ? "text-primary" : "text-foreground"
              }`}
            >
              Features
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

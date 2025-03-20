
import { Bell, Settings, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const DashboardHeader = () => {
  return (
    <header className="flex items-center justify-between p-6 border-b border-border animate-fade-in">
      <div className="flex items-center space-x-3">
        <Shield className="w-8 h-8 text-security-blue animate-pulse-gentle" />
        <h1 className="text-xl font-semibold tracking-tight">
          Cogniti<span className="text-security-blue">Guard</span>
        </h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-security-red rounded-full"></span>
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2 ml-4">
          <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
            <span className="text-xs font-medium">JD</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;

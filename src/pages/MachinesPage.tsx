
import DashboardSidebar from "@/components/DashboardSidebar";
import MachinesList from "@/components/MachinesList";
import DashboardCard from "@/components/DashboardCard";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Cpu, RefreshCcw, ServerCrash, Thermometer } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const MachinesPage = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();
  
  const handleRefresh = () => {
    setIsRefreshing(true);
    
    // Simulate refresh delay
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "Machines refreshed",
        description: "Machine statuses have been updated",
      });
    }, 1500);
  };
  
  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-6xl mx-auto">
          <header className="mb-8 flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
            <div>
              <h1 className="text-2xl font-bold mb-2">Connected Machines</h1>
              <p className="text-muted-foreground">
                Monitor and manage your factory machines
              </p>
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCcw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
              {isRefreshing ? "Refreshing..." : "Refresh"}
            </Button>
          </header>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <DashboardCard title="Total Machines" className="col-span-1">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold">42</span>
                  <span className="text-xs text-muted-foreground">Connected devices</span>
                </div>
                <Cpu className="h-12 w-12 text-muted-foreground opacity-20" />
              </div>
            </DashboardCard>
            
            <DashboardCard title="Critical Issues" className="col-span-1">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-security-red">3</span>
                  <span className="text-xs text-muted-foreground">Machines with alerts</span>
                </div>
                <AlertTriangle className="h-12 w-12 text-security-red opacity-20" />
              </div>
            </DashboardCard>
            
            <DashboardCard title="Average Temperature" className="col-span-1">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold">43°C</span>
                  <span className="text-xs text-muted-foreground">Across all machines</span>
                </div>
                <Thermometer className="h-12 w-12 text-muted-foreground opacity-20" />
              </div>
            </DashboardCard>
          </div>
          
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">Machine Status</h2>
              <div className="flex items-center gap-6 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-security-blue"></div>
                  <span>Normal</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-security-yellow"></div>
                  <span>Warning</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-security-red"></div>
                  <span>Critical</span>
                </div>
              </div>
            </div>
            
            <MachinesList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MachinesPage;

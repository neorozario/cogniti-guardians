
import DashboardCard from "@/components/DashboardCard";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardSidebar from "@/components/DashboardSidebar";
import MachinesList from "@/components/MachinesList";
import StatCard from "@/components/StatCard";
import StatusIndicator from "@/components/StatusIndicator";
import WaveChart from "@/components/WaveChart";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowUpRight, Download, ShieldCheck, Zap } from "lucide-react";
import AlertItem from "@/components/AlertItem";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Index = () => {
  const [showEmergencyDialog, setShowEmergencyDialog] = useState(false);
  const [scanningInProgress, setScanningInProgress] = useState(false);

  const handleEmergencyShutdown = () => {
    toast.success("Emergency shutdown initiated");
    setShowEmergencyDialog(false);
  };

  const handleRunSecurityScan = () => {
    setScanningInProgress(true);
    toast.info("Security scan initiated");
    
    // Simulate a scan completing after 3 seconds
    setTimeout(() => {
      setScanningInProgress(false);
      toast.success("Security scan completed. No threats detected.");
    }, 3000);
  };

  const handleExportLogs = () => {
    toast.success("Logs exported successfully");
  };

  const handleAcknowledgeAlert = () => {
    toast.success("Alert acknowledged");
  };

  return (
    <div className="flex h-screen bg-background text-foreground">
      <DashboardSidebar />
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <DashboardHeader />
        
        <main className="flex-1 p-6 overflow-y-auto space-y-6">
          {/* Hero section with status overview */}
          <section className="relative glass rounded-lg p-6 overflow-hidden animate-fade-in">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent z-0"></div>
            
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <StatusIndicator status="normal" size="lg" />
                  <h2 className="text-xl font-medium">System Status: Operational</h2>
                </div>
                <p className="text-sm text-muted-foreground max-w-2xl">
                  All systems are running normally. The AI has detected no significant anomalies 
                  in the last 24 hours. Current security confidence is rated at 98%.
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" className="gap-1" onClick={handleExportLogs}>
                  <Download className="h-4 w-4" />
                  Download Report
                </Button>
                <Button className="gap-1" asChild>
                  <Link to="/security">
                    <ShieldCheck className="h-4 w-4" />
                    Security Dashboard
                  </Link>
                </Button>
              </div>
            </div>
          </section>
          
          {/* Stats row */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard 
              title="Anomaly Score" 
              value="0.12" 
              status="normal"
              icon={<ShieldCheck className="h-5 w-5 text-security-green" />}
              trend={-5}
            />
            <StatCard 
              title="Active Alerts" 
              value="2" 
              status="warning"
              icon={<AlertTriangle className="h-5 w-5 text-security-yellow" />}
              trend={0}
            />
            <StatCard 
              title="System Load" 
              value="68%" 
              status="normal"
              icon={<Zap className="h-5 w-5 text-security-blue" />}
              trend={12}
            />
            <StatCard 
              title="Uptime" 
              value="99.8%" 
              status="normal"
              icon={<ArrowUpRight className="h-5 w-5 text-security-green" />}
              trend={0.2}
            />
          </section>
          
          {/* Main content grid */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* AI Anomaly detection */}
            <DashboardCard title="AI Anomaly Detection" className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-medium">Low Risk Level</h4>
                  <p className="text-sm text-muted-foreground">
                    Current anomaly score: 0.12/1.0
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  asChild
                >
                  <Link to="/health">View Details</Link>
                </Button>
              </div>
              
              <div className="h-52 glass rounded-lg p-4 flex flex-col justify-between">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-muted-foreground">Anomaly Score (24h)</span>
                  <span className="text-xs text-security-blue">Threshold: 0.7</span>
                </div>
                
                <div className="flex-1 flex items-end">
                  <WaveChart height={140} />
                </div>
                
                <div className="border-t border-border mt-4 pt-2 flex justify-between">
                  <span className="text-xs text-muted-foreground">00:00</span>
                  <span className="text-xs text-muted-foreground">12:00</span>
                  <span className="text-xs text-muted-foreground">Now</span>
                </div>
              </div>
            </DashboardCard>
            
            {/* Recent Alerts */}
            <DashboardCard title="Recent Alerts">
              <div className="space-y-3">
                <AlertItem
                  title="Temperature Warning"
                  message="Packaging System temperature exceeded threshold (52°C)"
                  timestamp="14 min ago"
                  severity="warning"
                  onAcknowledge={handleAcknowledgeAlert}
                />
                
                <AlertItem
                  title="Network Connection Lost"
                  message="Assembly Unit B briefly disconnected from the network"
                  timestamp="2 hours ago"
                  severity="info"
                  acknowledged
                />
                
                <div className="text-center mt-2">
                  <Button 
                    variant="link" 
                    size="sm" 
                    className="text-xs"
                    asChild
                  >
                    <Link to="/alerts">View All Alerts</Link>
                  </Button>
                </div>
              </div>
            </DashboardCard>
            
            {/* Machine Status */}
            <DashboardCard title="Machine Status" className="lg:col-span-2">
              <MachinesList />
              <div className="mt-4 text-right">
                <Button 
                  variant="outline" 
                  size="sm"
                  asChild
                >
                  <Link to="/machines">View All Machines</Link>
                </Button>
              </div>
            </DashboardCard>
            
            {/* Quick Actions */}
            <DashboardCard title="Quick Actions">
              <div className="space-y-2">
                <Button 
                  className="w-full justify-start"
                  onClick={handleRunSecurityScan}
                  disabled={scanningInProgress}
                >
                  <ShieldCheck className="h-4 w-4 mr-2" />
                  {scanningInProgress ? "Scanning..." : "Run Security Scan"}
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={handleExportLogs}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Logs
                </Button>
                <Button 
                  variant="destructive" 
                  className="w-full justify-start"
                  onClick={() => setShowEmergencyDialog(true)}
                >
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Emergency Shutdown
                </Button>
              </div>
            </DashboardCard>
          </section>
        </main>
      </div>
      
      <Dialog open={showEmergencyDialog} onOpenChange={setShowEmergencyDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Emergency Shutdown</DialogTitle>
            <DialogDescription>
              Are you sure you want to initiate an emergency shutdown?
              This will immediately halt all machine operations.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEmergencyDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleEmergencyShutdown}>
              Confirm Shutdown
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;

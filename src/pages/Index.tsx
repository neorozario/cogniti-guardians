
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

const Index = () => {
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
                <Button variant="outline" size="sm" className="gap-1">
                  <Download className="h-4 w-4" />
                  Download Report
                </Button>
                <Button className="gap-1">
                  <ShieldCheck className="h-4 w-4" />
                  Security Dashboard
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
                <Button variant="outline" size="sm">
                  View Details
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
                />
                
                <AlertItem
                  title="Network Connection Lost"
                  message="Assembly Unit B briefly disconnected from the network"
                  timestamp="2 hours ago"
                  severity="info"
                  acknowledged
                />
                
                <div className="text-center mt-2">
                  <Button variant="link" size="sm" className="text-xs">
                    View All Alerts
                  </Button>
                </div>
              </div>
            </DashboardCard>
            
            {/* Machine Status */}
            <DashboardCard title="Machine Status" className="lg:col-span-2">
              <MachinesList />
            </DashboardCard>
            
            {/* Quick Actions */}
            <DashboardCard title="Quick Actions">
              <div className="space-y-2">
                <Button className="w-full justify-start">
                  <ShieldCheck className="h-4 w-4 mr-2" />
                  Run Security Scan
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Export Logs
                </Button>
                <Button variant="destructive" className="w-full justify-start">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Emergency Shutdown
                </Button>
              </div>
            </DashboardCard>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Index;

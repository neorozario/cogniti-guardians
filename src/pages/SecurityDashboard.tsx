
import { Shield, Clock, Download, ArrowUpRight } from "lucide-react";
import DashboardCard from "@/components/DashboardCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import StatusIndicator from "@/components/StatusIndicator";
import { toast } from "sonner";

const SecurityDashboard = () => {
  const handleDownloadReport = () => {
    toast.success("Security report download started");
    // In a real app, this would trigger a file download
  };

  const securityEvents = [
    { id: 1, time: "09:45 AM", event: "Security scan completed", status: "normal" },
    { id: 2, time: "08:32 AM", event: "Firewall updated", status: "normal" },
    { id: 3, time: "Yesterday", event: "Anomalous network traffic detected", status: "warning" },
    { id: 4, time: "2 days ago", event: "System patch applied", status: "normal" },
    { id: 5, time: "3 days ago", event: "Unauthorized access attempt", status: "critical" },
  ];

  const securityMetrics = [
    { name: "Threat Defense", value: 92 },
    { name: "Access Control", value: 85 },
    { name: "Network Security", value: 78 },
    { name: "Data Encryption", value: 96 },
  ];

  return (
    <div className="flex h-screen bg-background text-foreground">
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-[76px] border-b border-border flex items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-security-blue" />
            <h1 className="text-xl font-medium">Security Dashboard</h1>
          </div>
          <Button onClick={handleDownloadReport} className="gap-2">
            <Download className="h-4 w-4" />
            Download Report
          </Button>
        </header>
        
        <main className="flex-1 p-6 overflow-y-auto space-y-6">
          {/* Hero section with security overview */}
          <section className="relative glass rounded-lg p-6 overflow-hidden animate-fade-in">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent z-0"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <StatusIndicator status="normal" size="lg" />
                <h2 className="text-xl font-medium">Security Status: Protected</h2>
              </div>
              <p className="text-sm text-muted-foreground max-w-2xl mb-4">
                The AI security system has not detected any significant threats in the last 24 hours.
                Current security confidence score is rated at 92%.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                {securityMetrics.map((metric) => (
                  <div key={metric.name} className="glass p-4 rounded-md">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">{metric.name}</span>
                      <span className="text-sm font-medium">{metric.value}%</span>
                    </div>
                    <Progress 
                      value={metric.value} 
                      indicatorClassName={
                        metric.value > 90 
                          ? "bg-security-green" 
                          : metric.value > 70 
                            ? "bg-security-blue" 
                            : "bg-security-yellow"
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
          
          {/* Tabs section */}
          <Tabs defaultValue="events" className="space-y-4">
            <TabsList>
              <TabsTrigger value="events">Security Events</TabsTrigger>
              <TabsTrigger value="threats">Recent Threats</TabsTrigger>
              <TabsTrigger value="access">Access Logs</TabsTrigger>
            </TabsList>
            
            <TabsContent value="events" className="space-y-4">
              <DashboardCard title="Security Event Log">
                <div className="space-y-3">
                  {securityEvents.map((event) => (
                    <div key={event.id} className="flex items-start p-3 glass rounded-md">
                      <StatusIndicator status={event.status as "normal" | "warning" | "critical"} size="sm" className="mt-1 mr-3" />
                      <div className="flex-1">
                        <span className="text-sm font-medium">{event.event}</span>
                        <div className="flex items-center mt-1">
                          <Clock className="h-3 w-3 text-muted-foreground mr-1" />
                          <span className="text-xs text-muted-foreground">{event.time}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="h-7">
                        <ArrowUpRight className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </DashboardCard>
            </TabsContent>
            
            <TabsContent value="threats">
              <DashboardCard title="Threat Analysis">
                <div className="p-8 text-center">
                  <Shield className="h-12 w-12 text-security-green mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Active Threats</h3>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    The AI security system has not detected any active threats.
                    Last scan completed at 09:45 AM today.
                  </p>
                  <Button className="mt-4">
                    Run New Security Scan
                  </Button>
                </div>
              </DashboardCard>
            </TabsContent>
            
            <TabsContent value="access">
              <DashboardCard title="Access Control">
                <div className="p-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    Access logs and user activity will be displayed here.
                    You can view detailed information about user logins, permission changes, and access attempts.
                  </p>
                </div>
              </DashboardCard>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default SecurityDashboard;

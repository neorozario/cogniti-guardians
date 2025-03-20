
import { useState } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import AlertItem from "@/components/AlertItem";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Clock, Info, ShieldAlert } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Sample alert data
interface Alert {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  severity: "critical" | "warning" | "info";
  acknowledged: boolean;
}

const initialAlerts: Alert[] = [
  {
    id: "alert-001",
    title: "Unauthorized Access Attempt",
    message: "Multiple failed login attempts detected from IP 192.168.1.45",
    timestamp: "2023-05-15 14:32:18",
    severity: "critical",
    acknowledged: false,
  },
  {
    id: "alert-002",
    title: "Temperature Threshold Exceeded",
    message: "Assembly Unit B operating at 52°C (threshold: 50°C)",
    timestamp: "2023-05-15 13:20:45",
    severity: "warning",
    acknowledged: false,
  },
  {
    id: "alert-003",
    title: "System Update Available",
    message: "Security patch 2.3.5 ready for installation",
    timestamp: "2023-05-15 10:15:22",
    severity: "info",
    acknowledged: false,
  },
  {
    id: "alert-004",
    title: "Network Traffic Anomaly",
    message: "Unusual outbound data transfer pattern detected on Packaging System",
    timestamp: "2023-05-15 09:48:36",
    severity: "warning",
    acknowledged: false,
  },
  {
    id: "alert-005",
    title: "Backup Failure",
    message: "Scheduled backup of Production Line A data failed",
    timestamp: "2023-05-14 23:12:07",
    severity: "critical",
    acknowledged: true,
  },
];

const AlertsPage = () => {
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);
  const { toast } = useToast();

  const acknowledgeAlert = (id: string) => {
    setAlerts(currentAlerts =>
      currentAlerts.map(alert =>
        alert.id === id ? { ...alert, acknowledged: true } : alert
      )
    );
    
    toast({
      title: "Alert acknowledged",
      description: "The alert has been marked as resolved",
    });
  };

  const activeAlerts = alerts.filter(alert => !alert.acknowledged);
  const resolvedAlerts = alerts.filter(alert => alert.acknowledged);

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-6xl mx-auto">
          <header className="mb-8">
            <h1 className="text-2xl font-bold mb-2">Security Alerts</h1>
            <p className="text-muted-foreground">
              Monitor and manage security incidents and system alerts
            </p>
          </header>
          
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="h-5 w-5 text-security-red" />
                  <h2 className="text-lg font-medium">Active Alerts</h2>
                  <Badge variant="outline" className="ml-2">
                    {activeAlerts.length}
                  </Badge>
                </div>
              </div>
              
              {activeAlerts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeAlerts.map(alert => (
                    <AlertItem
                      key={alert.id}
                      title={alert.title}
                      message={alert.message}
                      timestamp={alert.timestamp}
                      severity={alert.severity}
                      acknowledged={alert.acknowledged}
                      onAcknowledge={() => acknowledgeAlert(alert.id)}
                    />
                  ))}
                </div>
              ) : (
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>No active alerts</AlertTitle>
                  <AlertDescription>
                    All alerts have been acknowledged. The system is operating normally.
                  </AlertDescription>
                </Alert>
              )}
            </div>
            
            {resolvedAlerts.length > 0 && (
              <div className="space-y-4 mt-8">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <h2 className="text-lg font-medium">Resolved Alerts</h2>
                  <Badge variant="outline" className="ml-2">
                    {resolvedAlerts.length}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {resolvedAlerts.map(alert => (
                    <AlertItem
                      key={alert.id}
                      title={alert.title}
                      message={alert.message}
                      timestamp={alert.timestamp}
                      severity={alert.severity}
                      acknowledged={alert.acknowledged}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertsPage;

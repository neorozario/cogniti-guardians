
import { useState } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";
import { 
  BellRing, 
  Layers, 
  ShieldAlert, 
  Smartphone, 
  Volume2 
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const SettingsPage = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [soundAlerts, setSoundAlerts] = useState(true);
  const [securityThreshold, setSecurityThreshold] = useState([75]);
  const [anomalyThreshold, setAnomalyThreshold] = useState([60]);
  const [temperatureThreshold, setTemperatureThreshold] = useState([85]);

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your security settings have been updated successfully.",
    });
  };

  const handleResetSettings = () => {
    setEmailNotifications(true);
    setSmsNotifications(false);
    setPushNotifications(true);
    setSoundAlerts(true);
    setSecurityThreshold([75]);
    setAnomalyThreshold([60]);
    setTemperatureThreshold([85]);
    
    toast({
      title: "Settings reset",
      description: "All settings have been restored to default values.",
    });
  };

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader title="Settings" subtitle="Configure system preferences and notifications" />
        
        <main className="flex-1 overflow-y-auto p-6">
          <Tabs defaultValue="notifications" className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="system">System</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>
            
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Configure how you want to receive alerts and notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <BellRing className="h-5 w-5 text-security-blue" />
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                    </div>
                    <Switch 
                      id="email-notifications" 
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Smartphone className="h-5 w-5 text-security-blue" />
                      <Label htmlFor="sms-notifications">SMS Notifications</Label>
                    </div>
                    <Switch 
                      id="sms-notifications" 
                      checked={smsNotifications}
                      onCheckedChange={setSmsNotifications}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Layers className="h-5 w-5 text-security-blue" />
                      <Label htmlFor="push-notifications">Push Notifications</Label>
                    </div>
                    <Switch 
                      id="push-notifications" 
                      checked={pushNotifications}
                      onCheckedChange={setPushNotifications}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Volume2 className="h-5 w-5 text-security-blue" />
                      <Label htmlFor="sound-alerts">Sound Alerts</Label>
                    </div>
                    <Switch 
                      id="sound-alerts" 
                      checked={soundAlerts}
                      onCheckedChange={setSoundAlerts}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security Thresholds</CardTitle>
                  <CardDescription>Configure sensitivity levels for security alerts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="security-threshold">Security Breach Threshold</Label>
                      <span className="text-muted-foreground">{securityThreshold}%</span>
                    </div>
                    <Slider 
                      id="security-threshold" 
                      value={securityThreshold} 
                      onValueChange={setSecurityThreshold} 
                      max={100} 
                      step={5}
                    />
                    <p className="text-sm text-muted-foreground">Higher values mean fewer alerts but potential missed threats</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="anomaly-threshold">Anomaly Detection Sensitivity</Label>
                      <span className="text-muted-foreground">{anomalyThreshold}%</span>
                    </div>
                    <Slider 
                      id="anomaly-threshold" 
                      value={anomalyThreshold} 
                      onValueChange={setAnomalyThreshold} 
                      max={100} 
                      step={5}
                    />
                    <p className="text-sm text-muted-foreground">Lower values will detect more anomalies but may increase false positives</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="system">
              <Card>
                <CardHeader>
                  <CardTitle>System Parameters</CardTitle>
                  <CardDescription>Configure system operational thresholds</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="temperature-threshold">Temperature Alert Threshold</Label>
                      <span className="text-muted-foreground">{temperatureThreshold}°C</span>
                    </div>
                    <Slider 
                      id="temperature-threshold" 
                      value={temperatureThreshold} 
                      onValueChange={setTemperatureThreshold} 
                      min={50}
                      max={120} 
                      step={5}
                    />
                    <p className="text-sm text-muted-foreground">Temperature threshold for machine overheating alerts</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="advanced">
              <Card>
                <CardHeader>
                  <CardTitle>Advanced Settings</CardTitle>
                  <CardDescription>Settings for experienced administrators</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">These settings should only be modified by system administrators with advanced knowledge of the system.</p>
                  
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <ShieldAlert className="h-5 w-5 text-security-blue" />
                      <Label htmlFor="auto-shutdown">Automatic Emergency Shutdown</Label>
                    </div>
                    <Switch id="auto-shutdown" />
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-8">When enabled, system will automatically shut down critical machines when severe threats are detected</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-end mt-8 space-x-4">
            <Button variant="outline" onClick={handleResetSettings}>
              Reset to Defaults
            </Button>
            <Button onClick={handleSaveSettings}>
              Save Settings
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;

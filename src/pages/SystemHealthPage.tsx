
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Cpu, Server, Shield, Thermometer } from "lucide-react";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardCard from "@/components/DashboardCard";
import { Progress } from "@/components/ui/progress";
import StatusIndicator from "@/components/StatusIndicator";
import WaveChart from "@/components/WaveChart";

// Sample data for charts
const systemMetrics = [
  { name: '00:00', score: 92, cpu: 45, memory: 60, network: 30 },
  { name: '04:00', score: 95, cpu: 42, memory: 58, network: 25 },
  { name: '08:00', score: 94, cpu: 48, memory: 62, network: 40 },
  { name: '12:00', score: 88, cpu: 60, memory: 65, network: 55 },
  { name: '16:00', score: 86, cpu: 65, memory: 70, network: 65 },
  { name: '20:00', score: 90, cpu: 55, memory: 63, network: 45 },
  { name: '24:00', score: 93, cpu: 50, memory: 61, network: 35 },
];

const anomalyData = [
  { name: 'Mon', anomalies: 3 },
  { name: 'Tue', anomalies: 2 },
  { name: 'Wed', anomalies: 7 },
  { name: 'Thu', anomalies: 4 },
  { name: 'Fri', anomalies: 1 },
  { name: 'Sat', anomalies: 0 },
  { name: 'Sun', anomalies: 2 },
];

const SystemHealthPage = () => {
  const overallHealth = 92;
  
  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-6xl mx-auto">
          <header className="mb-8">
            <h1 className="text-2xl font-bold mb-2">System Health</h1>
            <p className="text-muted-foreground">
              Monitor system performance metrics and health indicators
            </p>
          </header>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <DashboardCard title="System Health Score" className="col-span-1">
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-2 mb-2">
                  <StatusIndicator status={overallHealth > 90 ? "normal" : overallHealth > 75 ? "warning" : "critical"} size="md" />
                  <span className="text-3xl font-bold">{overallHealth}%</span>
                </div>
                <Progress 
                  value={overallHealth} 
                  className="h-2 w-full" 
                  indicatorClassName={
                    overallHealth > 90 ? "bg-security-blue" : 
                    overallHealth > 75 ? "bg-security-yellow" : 
                    "bg-security-red"
                  }
                />
                <p className="text-xs text-muted-foreground mt-2">
                  System health is {overallHealth > 90 ? "excellent" : overallHealth > 75 ? "good" : "concerning"}
                </p>
              </div>
            </DashboardCard>
            
            <DashboardCard title="Uptime" className="col-span-1">
              <div className="flex flex-col items-center">
                <div className="text-3xl font-bold mb-1">99.8%</div>
                <span className="text-muted-foreground text-sm">Last 30 days</span>
                <div className="text-xs text-muted-foreground mt-4">
                  <div className="flex items-center justify-between gap-2">
                    <span>Total downtime:</span>
                    <span className="font-medium">1h 26m</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span>Last incident:</span>
                    <span className="font-medium">3 days ago</span>
                  </div>
                </div>
              </div>
            </DashboardCard>
            
            <DashboardCard title="System Load" className="col-span-1">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Cpu className="h-4 w-4 text-security-blue" />
                    <span className="text-sm">CPU Usage</span>
                  </div>
                  <span className="text-sm font-medium">55%</span>
                </div>
                <Progress value={55} className="h-1.5" />
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Server className="h-4 w-4 text-security-yellow" />
                    <span className="text-sm">Memory Usage</span>
                  </div>
                  <span className="text-sm font-medium">68%</span>
                </div>
                <Progress value={68} className="h-1.5" indicatorClassName="bg-security-yellow" />
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Thermometer className="h-4 w-4 text-security-red" />
                    <span className="text-sm">Temperature</span>
                  </div>
                  <span className="text-sm font-medium">42°C</span>
                </div>
                <Progress value={42} max={100} className="h-1.5" indicatorClassName="bg-security-red" />
              </div>
            </DashboardCard>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <DashboardCard title="AI Anomaly Detection" className="col-span-1 md:col-span-2 h-80">
              <div className="h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-security-blue" />
                    <span className="text-sm font-medium">Real-time Anomaly Score</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <StatusIndicator status="normal" size="sm" />
                    <span className="text-xs text-muted-foreground">Normal operation</span>
                  </div>
                </div>
                <div className="flex-1 -mx-4">
                  <WaveChart color="#3b82f680" />
                </div>
              </div>
            </DashboardCard>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DashboardCard title="System Performance" className="h-80">
              <div className="h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={systemMetrics}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="name" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1a1a1a', 
                        border: '1px solid #333', 
                        borderRadius: '4px' 
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#3b82f6" 
                      fillOpacity={1} 
                      fill="url(#colorScore)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </DashboardCard>
            
            <DashboardCard title="Weekly Anomalies" className="h-80">
              <div className="h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={anomalyData}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="name" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1a1a1a', 
                        border: '1px solid #333', 
                        borderRadius: '4px' 
                      }}
                    />
                    <Bar dataKey="anomalies" fill="#ef4444" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </DashboardCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemHealthPage;

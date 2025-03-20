
import { Badge } from "@/components/ui/badge";
import StatusIndicator from "./StatusIndicator";
import { Battery, CpuIcon, Thermometer } from "lucide-react";

interface Machine {
  id: string;
  name: string;
  status: "normal" | "warning" | "critical";
  uptime: number;
  temperature: number;
  load: number;
}

const machines: Machine[] = [
  {
    id: "m001",
    name: "Production Line A",
    status: "normal",
    uptime: 99.8,
    temperature: 42,
    load: 68,
  },
  {
    id: "m002",
    name: "Assembly Unit B",
    status: "normal",
    uptime: 100,
    temperature: 38,
    load: 45,
  },
  {
    id: "m003",
    name: "Packaging System",
    status: "warning",
    uptime: 97.2,
    temperature: 52,
    load: 83,
  },
  {
    id: "m004",
    name: "Quality Control Station",
    status: "normal",
    uptime: 99.5,
    temperature: 40,
    load: 72,
  },
];

const MachinesList = () => {
  return (
    <div className="space-y-2">
      {machines.map((machine) => (
        <div 
          key={machine.id} 
          className="p-3 glass rounded-lg flex items-center justify-between transition-all duration-300 hover:shadow-md cursor-pointer animate-fade-in"
        >
          <div className="flex items-center gap-3">
            <StatusIndicator status={machine.status} />
            <div>
              <h4 className="font-medium">{machine.name}</h4>
              <div className="flex items-center mt-1">
                <Badge variant="outline" className="text-xs mr-2">
                  Uptime {machine.uptime}%
                </Badge>
                <span className="text-xs text-muted-foreground flex items-center">
                  <Thermometer className="h-3 w-3 mr-1 text-security-red" />
                  {machine.temperature}°C
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-end">
              <div className="flex items-center">
                <CpuIcon className="h-3 w-3 mr-1 text-security-blue" />
                <span className="text-sm">{machine.load}%</span>
              </div>
              <div className="w-16 h-1 bg-muted rounded-full mt-1">
                <div 
                  className={`h-full rounded-full ${
                    machine.load > 80 
                      ? "bg-security-red" 
                      : machine.load > 60 
                        ? "bg-security-yellow" 
                        : "bg-security-blue"
                  }`}
                  style={{ width: `${machine.load}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MachinesList;

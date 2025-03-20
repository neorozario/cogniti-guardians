
import { cn } from "@/lib/utils";
import StatusIndicator from "./StatusIndicator";
import { AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

type AlertSeverity = "critical" | "warning" | "info";

interface AlertItemProps {
  title: string;
  message: string;
  timestamp: string;
  severity: AlertSeverity;
  acknowledged?: boolean;
  className?: string;
}

const AlertItem = ({
  title,
  message,
  timestamp,
  severity,
  acknowledged = false,
  className,
}: AlertItemProps) => {
  const severityMap = {
    critical: {
      status: "critical" as const,
      color: "text-security-red",
      icon: AlertTriangle,
    },
    warning: {
      status: "warning" as const,
      color: "text-security-yellow",
      icon: AlertTriangle,
    },
    info: {
      status: "normal" as const,
      color: "text-security-blue",
      icon: Clock,
    },
  };

  const { status, color, icon: Icon } = severityMap[severity];

  return (
    <div className={cn(
      "p-4 rounded-lg border border-border animate-fade-in",
      acknowledged ? "opacity-60" : "glass",
      className
    )}>
      <div className="flex justify-between items-start mb-1">
        <div className="flex items-center gap-2">
          <StatusIndicator status={status} size="sm" pulse={!acknowledged} />
          <h4 className={cn("font-medium", color)}>
            {title}
          </h4>
        </div>
        <span className="text-xs text-muted-foreground">{timestamp}</span>
      </div>
      
      <p className="text-sm text-muted-foreground my-2">{message}</p>
      
      <div className="flex justify-between items-center mt-3">
        <div className="flex items-center text-xs text-muted-foreground">
          <Icon className={cn("h-3 w-3 mr-1", color)} />
          <span>{severity.charAt(0).toUpperCase() + severity.slice(1)}</span>
        </div>
        
        {!acknowledged && (
          <Button variant="secondary" size="sm" className="h-7 text-xs">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Acknowledge
          </Button>
        )}
      </div>
    </div>
  );
};

export default AlertItem;

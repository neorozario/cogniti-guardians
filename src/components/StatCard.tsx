
import { cn } from "@/lib/utils";
import { TriangleAlert } from "lucide-react";
import StatusIndicator from "./StatusIndicator";

interface StatCardProps {
  title: string;
  value: string | number;
  status?: "normal" | "warning" | "critical";
  icon?: React.ReactNode;
  trend?: number;
  className?: string;
}

const StatCard = ({
  title,
  value,
  status = "normal",
  icon,
  trend,
  className,
}: StatCardProps) => {
  return (
    <div className={cn("glass rounded-lg p-4 flex flex-col", className)}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        {status && (
          <StatusIndicator status={status} size="sm" />
        )}
      </div>
      <div className="flex items-center gap-2 mt-auto">
        {icon}
        <span className="text-2xl font-semibold tracking-tight">{value}</span>
      </div>
      {trend !== undefined && (
        <div className="text-xs mt-2 text-muted-foreground flex items-center gap-1">
          <span className={trend > 0 ? "text-security-green" : "text-security-red"}>
            {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}%
          </span>
          <span>vs previous period</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;

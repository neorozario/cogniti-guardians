
import { cn } from "@/lib/utils";

type StatusType = "normal" | "warning" | "critical";

interface StatusIndicatorProps {
  status: StatusType;
  size?: "sm" | "md" | "lg";
  pulse?: boolean;
  className?: string;
}

const StatusIndicator = ({
  status,
  size = "md",
  pulse = true,
  className,
}: StatusIndicatorProps) => {
  const statusClass = {
    normal: "green",
    warning: "yellow",
    critical: "red",
  }[status];

  const sizeClass = {
    sm: "h-2 w-2",
    md: "h-3 w-3",
    lg: "h-4 w-4",
  }[size];

  return (
    <span
      className={cn(
        "status-indicator",
        statusClass,
        sizeClass,
        !pulse && "after:hidden",
        className
      )}
      aria-label={`Status: ${status}`}
    />
  );
};

export default StatusIndicator;


import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface DashboardCardProps {
  title: string;
  children: ReactNode;
  className?: string;
  glassmorphism?: boolean;
}

const DashboardCard = ({
  title,
  children,
  className,
  glassmorphism = true,
}: DashboardCardProps) => {
  return (
    <div
      className={cn(
        "rounded-lg p-4 border border-border",
        glassmorphism ? "glass" : "bg-card",
        "transition-all duration-300 hover:shadow-lg",
        "animate-fade-in",
        className
      )}
    >
      <h3 className="text-sm font-medium text-muted-foreground mb-2">{title}</h3>
      <div className="mt-1">{children}</div>
    </div>
  );
};

export default DashboardCard;

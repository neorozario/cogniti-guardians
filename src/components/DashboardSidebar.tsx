
import { cn } from "@/lib/utils";
import { 
  Activity, 
  AlertTriangle, 
  Home, 
  Thermometer,
  Settings, 
  Shield, 
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const menuItems = [
  { icon: Home, label: "Overview", href: "/" },
  { icon: AlertTriangle, label: "Alerts", href: "/alerts" },
  { icon: Activity, label: "System Health", href: "/health" },
  { icon: Thermometer, label: "Machines", href: "/machines" },
  { icon: Shield, label: "Security", href: "/security" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

const DashboardSidebar = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const location = useLocation();
  
  return (
    <aside className="w-16 lg:w-64 h-screen flex flex-col bg-sidebar border-r border-border transition-all duration-300">
      <div className="p-4 flex items-center justify-center lg:justify-start border-b border-border h-[76px]">
        <Shield className="w-8 h-8 text-security-blue" />
        <span className="ml-3 font-semibold text-lg hidden lg:inline">
          CognitiGuard
        </span>
      </div>
      
      <nav className="p-2 flex-grow">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.href || 
              (item.href !== "/" && location.pathname.startsWith(item.href));
            const isHovered = hoveredItem === item.label;
            
            return (
              <li key={item.label}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center px-3 py-3 rounded-md transition-colors",
                    "hover:bg-secondary group relative",
                    isActive && "bg-secondary text-security-blue"
                  )}
                  onMouseEnter={() => setHoveredItem(item.label)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <item.icon 
                    className={cn(
                      "h-5 w-5 transition-all duration-300",
                      isActive || isHovered ? "text-security-blue" : "text-muted-foreground"
                    )} 
                  />
                  <span className={cn(
                    "ml-3 hidden lg:inline transition-all duration-300",
                    isActive || isHovered ? "text-foreground" : "text-muted-foreground"
                  )}>
                    {item.label}
                  </span>
                  
                  {isActive && (
                    <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-security-blue rounded-r-full" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 text-xs text-muted-foreground border-t border-border mt-auto hidden lg:block">
        <p>CognitiGuard v1.0.0</p>
        <p className="mt-1">©2023 CognitiSystems</p>
      </div>
    </aside>
  );
};

export default DashboardSidebar;

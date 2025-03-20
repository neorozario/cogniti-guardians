
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface WaveChartProps {
  data?: number[];
  color?: string;
  height?: number;
  className?: string;
}

const WaveChart = ({
  data = [],
  color = "bg-security-blue",
  height = 80,
  className,
}: WaveChartProps) => {
  const [chartData, setChartData] = useState<number[]>(data);

  // If no data is provided, generate random data
  useEffect(() => {
    if (data.length > 0) {
      setChartData(data);
      return;
    }

    // Generate random data
    const randomData = Array.from({ length: 20 }, () => 
      Math.random() * 0.7 + 0.3
    );
    setChartData(randomData);
    
    // Update random data periodically
    const interval = setInterval(() => {
      setChartData(prev => {
        const newData = [...prev.slice(1)];
        newData.push(Math.random() * 0.7 + 0.3);
        return newData;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [data]);

  return (
    <div 
      className={cn("flex items-end justify-between gap-[2px]", className)}
      style={{ height: `${height}px` }}
    >
      {chartData.map((value, i) => (
        <div
          key={i}
          className={cn(
            "w-full rounded-sm animate-wave",
            color,
            i % 2 === 0 ? "opacity-90" : "opacity-70"
          )}
          style={{ 
            height: `${value * 100}%`,
            animationDelay: `${i * 100}ms`,
          }}
        />
      ))}
    </div>
  );
};

export default WaveChart;

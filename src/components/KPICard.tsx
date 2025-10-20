import { Card } from "./ui/card";
import { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
}

export function KPICard({ 
  title, 
  value, 
  change, 
  changeType = "neutral", 
  icon: Icon,
  iconColor = "text-primary",
  iconBg = "bg-primary/10"
}: KPICardProps) {
  const changeColors = {
    positive: "text-[#22c55e]",
    negative: "text-[#ef4444]",
    neutral: "text-muted-foreground"
  };

  return (
    <Card className="p-6 rounded-2xl border-border hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-muted-foreground mb-2">{title}</p>
          <h2 className="mb-1">{value}</h2>
          {change && (
            <p className={`text-sm ${changeColors[changeType]}`}>
              {change}
            </p>
          )}
        </div>
        <div className={`${iconBg} ${iconColor} p-3 rounded-2xl`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </Card>
  );
}

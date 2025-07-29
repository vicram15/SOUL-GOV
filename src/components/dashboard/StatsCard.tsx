import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "default" | "volunteer" | "child-care" | "success";
}

export function StatsCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend,
  variant = "default" 
}: StatsCardProps) {
  const variantStyles = {
    default: "bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20",
    volunteer: "bg-gradient-to-br from-volunteer/5 to-volunteer/10 border-volunteer/20",
    "child-care": "bg-gradient-to-br from-child-care/5 to-child-care/10 border-child-care/20",
    success: "bg-gradient-to-br from-success/5 to-success/10 border-success/20"
  };

  const iconStyles = {
    default: "text-primary",
    volunteer: "text-volunteer",
    "child-care": "text-child-care",
    success: "text-success"
  };

  return (
    <Card className={cn(
      "transition-all hover:shadow-md",
      variantStyles[variant]
    )}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="space-y-1">
              <p className="text-3xl font-bold text-foreground">{value}</p>
              {subtitle && (
                <p className="text-sm text-muted-foreground">{subtitle}</p>
              )}
            </div>
            {trend && (
              <div className="flex items-center gap-1">
                <span className={cn(
                  "text-sm font-medium",
                  trend.isPositive ? "text-success" : "text-destructive"
                )}>
                  {trend.isPositive ? "+" : ""}{trend.value}%
                </span>
                <span className="text-sm text-muted-foreground">vs last month</span>
              </div>
            )}
          </div>
          <div className={cn(
            "p-3 rounded-lg bg-background/50",
            iconStyles[variant]
          )}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
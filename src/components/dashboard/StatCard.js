import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

export default function StatCard({ title, value, icon: Icon, trend, description }) {
    const isPositive = trend === "up";

    return (
        <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
                <div className="flex items-center justify-between space-y-0 pb-2">
                    <p className="text-sm font-medium text-muted-foreground">{title}</p>
                    {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
                </div>
                <div className="flex items-center justify-between pt-2">
                    <h2 className="text-2xl font-bold">{value}</h2>
                    {/* Omit details if description/trend missing to keep it simple or conditionally render */}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                    {description} {trend && (
                        <span className={cn("ml-1 font-medium", isPositive ? "text-green-600" : "text-red-600")}>
                            {isPositive ? "↑" : "↓"}
                        </span>
                    )}
                </p>
            </CardContent>
        </Card>
    );
}

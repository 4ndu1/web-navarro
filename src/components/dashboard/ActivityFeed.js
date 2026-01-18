import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus, Edit, Trash2, FileText, Bell } from "lucide-react";
import { cn } from "@/lib/utils";

// Helper to map type to icon/color
const getActivityConfig = (type) => {
    switch (type) {
        case 'new_student':
            return { icon: UserPlus, color: "bg-blue-100 text-blue-600" };
        case 'update':
            return { icon: Edit, color: "bg-orange-100 text-orange-600" };
        case 'enrollment':
            return { icon: FileText, color: "bg-green-100 text-green-600" };
        default:
            return { icon: Bell, color: "bg-gray-100 text-gray-600" };
    }
};

export default function ActivityFeed({ activities = [] }) {
    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>Actividad Reciente</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-8">
                    {activities.length > 0 ? (
                        activities.map((activity, index) => {
                            const { icon: Icon, color } = getActivityConfig(activity.type);
                            return (
                                <div key={index} className="flex items-start gap-4">
                                    <div
                                        className={cn(
                                            "flex h-9 w-9 items-center justify-center rounded-full border",
                                            color
                                        )}
                                    >
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <p className="text-sm font-medium leading-none">{activity.title}</p>
                                        <p className="text-sm text-muted-foreground">{activity.description}</p>
                                    </div>
                                    <div className="text-xs text-muted-foreground">{activity.time}</div>
                                </div>
                            );
                        })
                    ) : (
                        <p className="text-sm text-muted-foreground text-center py-4">
                            No hay actividad reciente.
                        </p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

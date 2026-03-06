import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MessageSquare, TrendingUp, CheckCircle } from "lucide-react";

export const dynamic = "force-dynamic";

async function getDashboardStats() {
    const [totalLeads, newLeadsThisMonth, totalMessages, wonLeads] =
        await Promise.all([
            prisma.lead.count(),
            prisma.lead.count({
                where: {
                    createdAt: {
                        gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                    },
                },
            }),
            prisma.message.count(),
            prisma.stageHistory.groupBy({
                by: ["toStageId"],
                _count: true,
            }),
        ]);

    return { totalLeads, newLeadsThisMonth, totalMessages, wonLeads };
}

export default async function DashboardPage() {
    const { totalLeads, newLeadsThisMonth, totalMessages } =
        await getDashboardStats();

    const stats = [
        {
            title: "Total de Leads",
            value: totalLeads,
            icon: Users,
            description: "desde o início",
        },
        {
            title: "Novos este mês",
            value: newLeadsThisMonth,
            icon: TrendingUp,
            description: "leads captados",
        },
        {
            title: "Mensagens trocadas",
            value: totalMessages,
            icon: MessageSquare,
            description: "via WhatsApp",
        },
        {
            title: "Conversões",
            value: "—",
            icon: CheckCircle,
            description: "leads ganhos",
        },
    ];

    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <p className="text-muted-foreground">
                    Visão geral do seu CRM
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map(({ title, value, icon: Icon, description }) => (
                    <Card key={title}>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                {title}
                            </CardTitle>
                            <Icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{value}</div>
                            <p className="text-xs text-muted-foreground">{description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

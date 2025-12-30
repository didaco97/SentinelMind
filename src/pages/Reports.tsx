import { useSimulator } from '@/context/SimulatorContext';
import { CosmicBackground } from '@/components/CosmicBackground';
import { Header } from '@/components/dashboard/Header';
import { GlassCard } from '@/components/GlassCard';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    FileText,
    Shield,
    TrendingUp,
    AlertTriangle,
    Clock,
    Download,
    Filter,
    Search,
    ChevronRight,
    BarChart3,
    Calendar,
    User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Reports = () => {
    const { isAuthenticated, reliabilityScore, trustStatus } = useSimulator();

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    const recentReports = [
        {
            id: 1,
            title: 'Weekly Security Posture Summary',
            type: 'Automated',
            date: '2024-12-30',
            status: 'stable',
            icon: Shield,
            description: 'Comprehensive overview of security metrics and trust patterns',
        },
        {
            id: 2,
            title: 'Behavioral Anomaly Detection',
            type: 'Alert',
            date: '2024-12-29',
            status: 'warning',
            icon: AlertTriangle,
            description: 'Unusual access patterns detected during off-hours',
        },
        {
            id: 3,
            title: 'Trust Score Trend Analysis',
            type: 'Analytics',
            date: '2024-12-28',
            status: 'stable',
            icon: TrendingUp,
            description: 'Monthly breakdown of reliability score fluctuations',
        },
        {
            id: 4,
            title: 'Access Request Audit Log',
            type: 'Compliance',
            date: '2024-12-27',
            status: 'stable',
            icon: FileText,
            description: 'Detailed log of all elevated access requests and approvals',
        },
    ];

    const metrics = [
        { label: 'Reports Generated', value: '47', change: '+12%', icon: FileText },
        { label: 'Avg Trust Score', value: `${reliabilityScore}`, change: '+3%', icon: BarChart3 },
        { label: 'Incidents Resolved', value: '8', change: '-25%', icon: Shield },
        { label: 'Active Sessions', value: '3', change: '0%', icon: User },
    ];

    const statusColors = {
        stable: 'text-trust-stable bg-trust-stable/10 border-trust-stable/30',
        warning: 'text-trust-warning bg-trust-warning/10 border-trust-warning/30',
        limited: 'text-trust-limited bg-trust-limited/10 border-trust-limited/30',
    };

    return (
        <div className="relative min-h-screen overflow-hidden">
            <CosmicBackground />

            <div className="relative z-10 min-h-screen flex flex-col">
                <Header />

                <main className="flex-1 container mx-auto px-4 py-6">
                    {/* Page Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <h1 className="text-3xl font-heading font-semibold text-foreground mb-2">
                            Security Reports
                        </h1>
                        <p className="text-muted-foreground">
                            Comprehensive insights into your organization's security posture and behavioral patterns
                        </p>
                    </motion.div>

                    {/* Metrics Grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
                    >
                        {metrics.map((metric, index) => (
                            <GlassCard key={index} variant="subtle" className="p-5">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                                            {metric.label}
                                        </p>
                                        <p className="text-2xl font-heading font-semibold text-foreground">
                                            {metric.value}
                                        </p>
                                        <p className={`text-xs mt-1 ${metric.change.startsWith('+') ? 'text-trust-stable' :
                                                metric.change.startsWith('-') ? 'text-trust-warning' : 'text-muted-foreground'
                                            }`}>
                                            {metric.change} from last month
                                        </p>
                                    </div>
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <metric.icon size={20} className="text-primary" />
                                    </div>
                                </div>
                            </GlassCard>
                        ))}
                    </motion.div>

                    {/* Filters and Search */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col sm:flex-row gap-4 mb-6"
                    >
                        <div className="relative flex-1">
                            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Search reports..."
                                className="pl-10 bg-muted/30 border-border/50"
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="gap-2 border-border/50">
                                <Filter size={16} />
                                Filter
                            </Button>
                            <Button variant="outline" size="sm" className="gap-2 border-border/50">
                                <Calendar size={16} />
                                Date Range
                            </Button>
                            <Button size="sm" className="gap-2 bg-primary hover:bg-primary/90">
                                <Download size={16} />
                                Export
                            </Button>
                        </div>
                    </motion.div>

                    {/* Reports List */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <GlassCard variant="default" className="overflow-hidden">
                            <div className="p-4 border-b border-border/30">
                                <h2 className="font-heading font-medium text-foreground">Recent Reports</h2>
                            </div>
                            <div className="divide-y divide-border/20">
                                {recentReports.map((report, index) => (
                                    <motion.div
                                        key={report.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 + index * 0.1 }}
                                        className="p-4 hover:bg-muted/20 transition-colors cursor-pointer group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${report.status === 'warning' ? 'bg-trust-warning/10' : 'bg-primary/10'
                                                }`}>
                                                <report.icon size={24} className={
                                                    report.status === 'warning' ? 'text-trust-warning' : 'text-primary'
                                                } />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="font-medium text-foreground truncate">
                                                        {report.title}
                                                    </h3>
                                                    <span className={`text-xs px-2 py-0.5 rounded-full border ${statusColors[report.status as keyof typeof statusColors]
                                                        }`}>
                                                        {report.type}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-muted-foreground truncate">
                                                    {report.description}
                                                </p>
                                                <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                                                    <Clock size={12} />
                                                    <span>{report.date}</span>
                                                </div>
                                            </div>
                                            <ChevronRight size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </GlassCard>
                    </motion.div>
                </main>
            </div>
        </div>
    );
};

export default Reports;

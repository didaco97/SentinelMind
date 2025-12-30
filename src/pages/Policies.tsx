import { useSimulator } from '@/context/SimulatorContext';
import { CosmicBackground } from '@/components/CosmicBackground';
import { Header } from '@/components/dashboard/Header';
import { GlassCard } from '@/components/GlassCard';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Shield,
    Lock,
    Unlock,
    Eye,
    Clock,
    FileDown,
    Globe,
    Laptop,
    Zap,
    AlertTriangle,
    CheckCircle,
    ChevronRight,
    Settings,
    ToggleRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

const Policies = () => {
    const { isAuthenticated, reliabilityScore } = useSimulator();

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    const adaptivePolicies = [
        {
            id: 1,
            name: 'Sensitive File Downloads',
            description: 'Control access to confidential documents based on trust state',
            icon: FileDown,
            status: 'active',
            trustThreshold: 80,
            restriction: reliabilityScore < 80 ? 'limited' : 'allowed',
        },
        {
            id: 2,
            name: 'External Network Access',
            description: 'Manage access to external resources and cloud services',
            icon: Globe,
            status: 'active',
            trustThreshold: 60,
            restriction: reliabilityScore < 60 ? 'limited' : 'allowed',
        },
        {
            id: 3,
            name: 'Off-Hours Access',
            description: 'Special authentication for access outside normal working hours',
            icon: Clock,
            status: 'active',
            trustThreshold: 70,
            restriction: reliabilityScore < 70 ? 'limited' : 'allowed',
        },
        {
            id: 4,
            name: 'New Device Authentication',
            description: 'Additional verification required for unrecognized devices',
            icon: Laptop,
            status: 'active',
            trustThreshold: 85,
            restriction: reliabilityScore < 85 ? 'limited' : 'allowed',
        },
    ];

    const securityRules = [
        {
            id: 1,
            category: 'Behavioral Analysis',
            icon: Eye,
            rules: [
                { name: 'Rapid action detection', enabled: true },
                { name: 'Pattern deviation alerts', enabled: true },
                { name: 'Session anomaly monitoring', enabled: true },
            ],
        },
        {
            id: 2,
            category: 'Access Controls',
            icon: Lock,
            rules: [
                { name: 'Multi-factor authentication', enabled: true },
                { name: 'Role-based permissions', enabled: true },
                { name: 'Time-based access windows', enabled: false },
            ],
        },
        {
            id: 3,
            category: 'Threat Response',
            icon: Zap,
            rules: [
                { name: 'Automatic session termination', enabled: true },
                { name: 'Escalation notifications', enabled: true },
                { name: 'Forensic logging', enabled: true },
            ],
        },
    ];

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
                            Security Policies
                        </h1>
                        <p className="text-muted-foreground">
                            Configure adaptive access policies based on human reliability state
                        </p>
                    </motion.div>

                    {/* Trust Score Context Banner */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mb-8"
                    >
                        <GlassCard
                            variant="strong"
                            glow={reliabilityScore >= 80 ? 'cyan' : reliabilityScore >= 60 ? 'amber' : 'amber'}
                            className="p-5"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${reliabilityScore >= 80 ? 'bg-trust-stable/20' : 'bg-trust-warning/20'
                                        }`}>
                                        <Shield size={28} className={
                                            reliabilityScore >= 80 ? 'text-trust-stable' : 'text-trust-warning'
                                        } />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">Current Trust State</p>
                                        <div className="flex items-center gap-3">
                                            <span className={`text-2xl font-heading font-semibold ${reliabilityScore >= 80 ? 'text-trust-stable' : 'text-trust-warning'
                                                }`}>
                                                {reliabilityScore}/100
                                            </span>
                                            <span className={`text-sm px-2 py-0.5 rounded-full ${reliabilityScore >= 80
                                                    ? 'bg-trust-stable/10 text-trust-stable border border-trust-stable/30'
                                                    : 'bg-trust-warning/10 text-trust-warning border border-trust-warning/30'
                                                }`}>
                                                {reliabilityScore >= 80 ? 'Stable Alignment' : 'Elevated Caution'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-sm text-muted-foreground max-w-sm hidden lg:block">
                                    Policies dynamically adjust based on your current reliability score and behavioral patterns.
                                </p>
                            </div>
                        </GlassCard>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Adaptive Access Policies */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <GlassCard variant="default" className="h-full">
                                <div className="p-4 border-b border-border/30 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <ToggleRight size={18} className="text-primary" />
                                        <h2 className="font-heading font-medium text-foreground">Adaptive Access Policies</h2>
                                    </div>
                                    <Button variant="ghost" size="sm" className="gap-2">
                                        <Settings size={14} />
                                        Configure
                                    </Button>
                                </div>
                                <div className="divide-y divide-border/20">
                                    {adaptivePolicies.map((policy, index) => (
                                        <motion.div
                                            key={policy.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.3 + index * 0.1 }}
                                            className="p-4 hover:bg-muted/10 transition-colors"
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${policy.restriction === 'allowed' ? 'bg-trust-stable/10' : 'bg-trust-warning/10'
                                                    }`}>
                                                    <policy.icon size={20} className={
                                                        policy.restriction === 'allowed' ? 'text-trust-stable' : 'text-trust-warning'
                                                    } />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h3 className="font-medium text-foreground text-sm">
                                                            {policy.name}
                                                        </h3>
                                                        {policy.restriction === 'allowed' ? (
                                                            <CheckCircle size={14} className="text-trust-stable" />
                                                        ) : (
                                                            <AlertTriangle size={14} className="text-trust-warning" />
                                                        )}
                                                    </div>
                                                    <p className="text-xs text-muted-foreground mb-2">
                                                        {policy.description}
                                                    </p>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs text-muted-foreground">
                                                            Threshold: {policy.trustThreshold}+
                                                        </span>
                                                        <span className={`text-xs px-1.5 py-0.5 rounded ${policy.restriction === 'allowed'
                                                                ? 'bg-trust-stable/10 text-trust-stable'
                                                                : 'bg-trust-warning/10 text-trust-warning'
                                                            }`}>
                                                            {policy.restriction === 'allowed' ? (
                                                                <span className="flex items-center gap-1">
                                                                    <Unlock size={10} /> Full Access
                                                                </span>
                                                            ) : (
                                                                <span className="flex items-center gap-1">
                                                                    <Lock size={10} /> Restricted
                                                                </span>
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </GlassCard>
                        </motion.div>

                        {/* Security Rules */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <GlassCard variant="default" className="h-full">
                                <div className="p-4 border-b border-border/30">
                                    <div className="flex items-center gap-2">
                                        <Shield size={18} className="text-primary" />
                                        <h2 className="font-heading font-medium text-foreground">Security Rules</h2>
                                    </div>
                                </div>
                                <div className="p-4 space-y-6">
                                    {securityRules.map((category, catIndex) => (
                                        <motion.div
                                            key={category.id}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.5 + catIndex * 0.1 }}
                                        >
                                            <div className="flex items-center gap-2 mb-3">
                                                <category.icon size={16} className="text-secondary" />
                                                <h3 className="text-sm font-medium text-foreground">
                                                    {category.category}
                                                </h3>
                                            </div>
                                            <div className="space-y-2 pl-6">
                                                {category.rules.map((rule, ruleIndex) => (
                                                    <div
                                                        key={ruleIndex}
                                                        className="flex items-center justify-between p-2 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors"
                                                    >
                                                        <span className="text-sm text-foreground/80">{rule.name}</span>
                                                        <Switch
                                                            checked={rule.enabled}
                                                            className="data-[state=checked]:bg-primary"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </GlassCard>
                        </motion.div>
                    </div>

                    {/* Info Banner */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="mt-6"
                    >
                        <div className="p-4 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
                                <Eye size={20} className="text-secondary" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm text-foreground/80">
                                    <span className="font-medium">Human-Aware Zero Trust:</span>{' '}
                                    Policies continuously adapt to your behavioral context, ensuring security without disrupting legitimate work.
                                </p>
                            </div>
                            <Button variant="ghost" size="sm" className="gap-1 text-secondary hover:text-secondary">
                                Learn More <ChevronRight size={14} />
                            </Button>
                        </div>
                    </motion.div>
                </main>
            </div>
        </div>
    );
};

export default Policies;

import { useSimulator } from '@/context/SimulatorContext';
import { CosmicBackground } from '@/components/CosmicBackground';
import { Header } from '@/components/dashboard/Header';
import { HeroSection } from '@/components/dashboard/HeroSection';
import { ContributingFactors } from '@/components/dashboard/ContributingFactors';
import { SecureWorkspace } from '@/components/dashboard/SecureWorkspace';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { SimulatorPanel } from '@/components/dashboard/SimulatorPanel';
import { AccessAdjustedModal } from '@/components/modals/AccessAdjustedModal';
import { ExplainabilityModal } from '@/components/modals/ExplainabilityModal';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Dashboard = () => {
    const {
        isAuthenticated,
        showAccessModal,
        showExplainability,
        simulatorMode
    } = useSimulator();

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    // Staggered animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15
            }
        }
    };

    const sidebarVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 80,
                damping: 20
            }
        }
    };

    return (
        <div className="relative min-h-screen overflow-hidden">
            <CosmicBackground />

            <div className="relative z-10 min-h-screen flex flex-col">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Header />
                </motion.div>

                <main className="flex-1 container mx-auto px-4 py-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* Main content area */}
                        <motion.div
                            className="lg:col-span-8 space-y-6"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <motion.div variants={itemVariants}>
                                <HeroSection />
                            </motion.div>
                            <motion.div variants={itemVariants}>
                                <SecureWorkspace />
                            </motion.div>
                        </motion.div>

                        {/* Right sidebar */}
                        <motion.div
                            className="lg:col-span-4 space-y-6"
                            initial="hidden"
                            animate="visible"
                            variants={containerVariants}
                        >
                            <motion.div variants={sidebarVariants}>
                                <ContributingFactors />
                            </motion.div>
                            <motion.div variants={sidebarVariants}>
                                {simulatorMode ? <SimulatorPanel /> : <RecentActivity />}
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Horizontal Activity Bar (Only in Simulator Mode) */}
                    {simulatorMode && (
                        <motion.div
                            className="mt-auto pt-6"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
                        >
                            <RecentActivity horizontal />
                        </motion.div>
                    )}
                </main>
            </div>

            {/* Modals */}
            <AccessAdjustedModal open={showAccessModal} />
            <ExplainabilityModal open={showExplainability} />
        </div>
    );
};

export default Dashboard;

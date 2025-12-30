import { useSimulator } from '@/context/SimulatorContext';
import { CosmicBackground } from '@/components/CosmicBackground';
import { Header } from '@/components/dashboard/Header';
import { HeroSection } from '@/components/dashboard/HeroSection';
import { ContributingFactors } from '@/components/dashboard/ContributingFactors';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { SimulatorPanel } from '@/components/dashboard/SimulatorPanel';
import { AccessAdjustedModal } from '@/components/modals/AccessAdjustedModal';
import { ExplainabilityModal } from '@/components/modals/ExplainabilityModal';
import { Navigate } from 'react-router-dom';

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

  return (
    <div className="relative min-h-screen overflow-hidden">
      <CosmicBackground />
      
      <div className="relative z-10 min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Main content area */}
            <div className="lg:col-span-8 space-y-6">
              <HeroSection />
              <RecentActivity />
            </div>
            
            {/* Right sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <ContributingFactors />
              {simulatorMode && <SimulatorPanel />}
            </div>
          </div>
        </main>
      </div>

      {/* Modals */}
      <AccessAdjustedModal open={showAccessModal} />
      <ExplainabilityModal open={showExplainability} />
    </div>
  );
};

export default Dashboard;

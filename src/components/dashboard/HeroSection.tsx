import { GlassCard } from '@/components/GlassCard';
import { WaveVisualization } from '@/components/WaveVisualization';
import { useSimulator } from '@/context/SimulatorContext';

export const HeroSection = () => {
  const { trustStatus, reliabilityScore } = useSimulator();

  const statusConfig = {
    stable: {
      title: 'Stable Alignment',
      subtitle: 'Behavior consistent with normal working patterns.',
      color: 'text-trust-stable',
    },
    warning: {
      title: 'Elevated Awareness',
      subtitle: 'Some behavioral patterns require attention.',
      color: 'text-trust-warning',
    },
    limited: {
      title: 'Protective Mode',
      subtitle: 'Temporary safeguards activated to protect your data.',
      color: 'text-trust-limited',
    },
  };

  const config = statusConfig[trustStatus];

  return (
    <GlassCard variant="default" className="p-6 lg:p-8">
      <h2 className="text-lg font-heading font-medium text-muted-foreground mb-6">
        Human Reliability State
      </h2>
      
      <div className="flex flex-col lg:flex-row items-center gap-8">
        {/* Wave visualization */}
        <div className="flex-shrink-0">
          <WaveVisualization status={trustStatus} className="w-48 h-48 lg:w-64 lg:h-64" />
        </div>
        
        {/* Status text */}
        <div className="flex-1 text-center lg:text-left">
          <div className="mb-4">
            <span className="text-5xl lg:text-6xl font-heading font-bold text-gradient-primary">
              {reliabilityScore}
            </span>
            <span className="text-2xl text-muted-foreground ml-1">/100</span>
          </div>
          
          <h3 className={`text-2xl lg:text-3xl font-heading font-semibold mb-2 ${config.color}`}>
            {config.title}
          </h3>
          
          <p className="text-muted-foreground max-w-md">
            {config.subtitle}
          </p>
        </div>
      </div>
    </GlassCard>
  );
};

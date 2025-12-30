import { GlassCard } from '@/components/GlassCard';
import { useSimulator } from '@/context/SimulatorContext';
import { Check, AlertTriangle, X } from 'lucide-react';

interface Factor {
  id: string;
  label: string;
  status: 'positive' | 'warning' | 'negative';
}

export const ContributingFactors = () => {
  const { actionSpeed, deviceContext, timeOfDay, stressLevel } = useSimulator();

  const factors: Factor[] = [
    {
      id: 'activity',
      label: actionSpeed === 'normal' ? 'Steady Activity Flow' : 
             actionSpeed === 'rapid' ? 'Elevated Activity Rate' : 'Rapid Action Pattern',
      status: actionSpeed === 'normal' ? 'positive' : 
              actionSpeed === 'rapid' ? 'warning' : 'negative',
    },
    {
      id: 'access',
      label: stressLevel < 30 ? 'Authorized Access Requests' : 
             stressLevel < 60 ? 'Unusual Access Patterns' : 'Anomalous Access Behavior',
      status: stressLevel < 30 ? 'positive' : 
              stressLevel < 60 ? 'warning' : 'negative',
    },
    {
      id: 'environment',
      label: deviceContext === 'known' ? 'Normal Working Environment' : 
             deviceContext === 'new' ? 'New Device Detected' : 'Suspicious Environment',
      status: deviceContext === 'known' ? 'positive' : 
              deviceContext === 'new' ? 'warning' : 'negative',
    },
    {
      id: 'timing',
      label: timeOfDay === 'working-hours' ? 'Standard Working Hours' : 'Off-Hours Activity',
      status: timeOfDay === 'working-hours' ? 'positive' : 'warning',
    },
  ];

  const statusIcons = {
    positive: <Check size={16} className="text-trust-stable" />,
    warning: <AlertTriangle size={16} className="text-trust-warning" />,
    negative: <X size={16} className="text-trust-limited" />,
  };

  const statusBg = {
    positive: 'bg-trust-stable/10 border-trust-stable/20',
    warning: 'bg-trust-warning/10 border-trust-warning/20',
    negative: 'bg-trust-limited/10 border-trust-limited/20',
  };

  return (
    <GlassCard variant="default" className="p-6">
      <h3 className="text-sm font-heading font-medium text-muted-foreground uppercase tracking-wider mb-4">
        Contributing Factors
      </h3>
      
      <div className="space-y-3">
        {factors.map((factor) => (
          <div
            key={factor.id}
            className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-300 ${statusBg[factor.status]}`}
          >
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-background/50 flex items-center justify-center">
              {statusIcons[factor.status]}
            </div>
            <span className="text-sm text-foreground/90">
              {factor.label}
            </span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};

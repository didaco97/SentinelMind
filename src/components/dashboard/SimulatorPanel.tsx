import { GlassCard } from '@/components/GlassCard';
import { useSimulator, ActionSpeed, DeviceContext, TimeOfDay } from '@/context/SimulatorContext';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export const SimulatorPanel = () => {
  const {
    stressLevel,
    setStressLevel,
    actionSpeed,
    setActionSpeed,
    deviceContext,
    setDeviceContext,
    timeOfDay,
    setTimeOfDay,
    reliabilityScore,
    trustStatus,
  } = useSimulator();

  const getTrendIcon = () => {
    if (reliabilityScore >= 70) return <TrendingUp size={16} className="text-trust-stable" />;
    if (reliabilityScore >= 40) return <Minus size={16} className="text-trust-warning" />;
    return <TrendingDown size={16} className="text-trust-limited" />;
  };

  const statusColors = {
    stable: 'from-trust-stable to-primary',
    warning: 'from-trust-warning to-accent',
    limited: 'from-trust-limited to-destructive',
  };

  return (
    <GlassCard variant="strong" glow="violet" className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-heading font-medium text-muted-foreground uppercase tracking-wider">
          Simulator Controls
        </h3>
        <span className="text-xs text-secondary font-medium px-2 py-1 rounded-full bg-secondary/10 border border-secondary/20">
          DEMO MODE
        </span>
      </div>
      
      {/* Reliability Score Gauge */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Reliability Score</span>
          <div className="flex items-center gap-2">
            {getTrendIcon()}
            <span className="text-lg font-heading font-bold text-foreground">
              {reliabilityScore}
            </span>
          </div>
        </div>
        <div className="h-2 rounded-full bg-muted/50 overflow-hidden">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${statusColors[trustStatus]} transition-all duration-500`}
            style={{ width: `${reliabilityScore}%` }}
          />
        </div>
      </div>
      
      {/* Controls */}
      <div className="space-y-5">
        {/* Stress Level */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm text-foreground/80">Stress Level</label>
            <span className="text-xs text-muted-foreground">{stressLevel}%</span>
          </div>
          <Slider
            value={[stressLevel]}
            onValueChange={([value]) => setStressLevel(value)}
            max={100}
            step={1}
            className="[&_[role=slider]]:bg-secondary [&_[role=slider]]:border-secondary"
          />
        </div>
        
        {/* Action Speed */}
        <div>
          <label className="text-sm text-foreground/80 block mb-2">Action Speed</label>
          <Select value={actionSpeed} onValueChange={(v) => setActionSpeed(v as ActionSpeed)}>
            <SelectTrigger className="bg-muted/30 border-border/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="rapid">Rapid</SelectItem>
              <SelectItem value="very-rapid">Very Rapid</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Device Context */}
        <div>
          <label className="text-sm text-foreground/80 block mb-2">Device Context</label>
          <Select value={deviceContext} onValueChange={(v) => setDeviceContext(v as DeviceContext)}>
            <SelectTrigger className="bg-muted/30 border-border/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="known">Known Device</SelectItem>
              <SelectItem value="new">New Device</SelectItem>
              <SelectItem value="suspicious">Suspicious Device</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Time of Day */}
        <div>
          <label className="text-sm text-foreground/80 block mb-2">Time of Day</label>
          <Select value={timeOfDay} onValueChange={(v) => setTimeOfDay(v as TimeOfDay)}>
            <SelectTrigger className="bg-muted/30 border-border/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="working-hours">Working Hours</SelectItem>
              <SelectItem value="off-hours">Off-Hours</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Current State */}
      <div className="mt-6 pt-4 border-t border-border/30">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Access State</span>
          <span className={`font-medium ${
            trustStatus === 'stable' ? 'text-trust-stable' :
            trustStatus === 'warning' ? 'text-trust-warning' : 'text-trust-limited'
          }`}>
            {trustStatus === 'stable' ? 'Full Access' :
             trustStatus === 'warning' ? 'Monitored' : 'Limited'}
          </span>
        </div>
      </div>
    </GlassCard>
  );
};

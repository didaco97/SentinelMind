import { GlassCard } from '@/components/GlassCard';
import { useSimulator } from '@/context/SimulatorContext';
import { Zap, Gauge, MousePointer2, Clock } from 'lucide-react';

export const SimulatorPlaceholder = () => {
    const { setSimulatorMode } = useSimulator();

    return (
        <div onClick={() => setSimulatorMode(true)} className="cursor-pointer">
            <GlassCard variant="default" className="p-6 opacity-60 hover:opacity-100 transition-opacity duration-300 group">
                <div className="flex items-center gap-3 mb-5">
                    <div className="p-2 rounded-md bg-primary/20 animate-pulse">
                        <Zap className="w-4 h-4 text-primary" />
                    </div>
                    <h3 className="text-lg font-heading font-semibold text-foreground/70">Simulator Controls</h3>
                </div>

                {/* Skeleton Items */}
                <div className="space-y-4">
                    {/* Stress Level Skeleton */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-muted-foreground/50">
                            <Gauge className="w-4 h-4" />
                            <span className="text-sm">Stress Level</span>
                        </div>
                        <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
                            <div className="h-full w-1/4 bg-gradient-to-r from-primary/30 to-primary/10 rounded-full" />
                        </div>
                    </div>

                    {/* Action Speed Skeleton */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-muted-foreground/50">
                            <MousePointer2 className="w-4 h-4" />
                            <span className="text-sm">Action Speed</span>
                        </div>
                        <div className="flex gap-2">
                            {['Normal', 'Rapid', 'V.Rapid'].map((_, i) => (
                                <div key={i} className="flex-1 h-8 bg-muted/20 rounded-md border border-white/5" />
                            ))}
                        </div>
                    </div>

                    {/* Time of Day Skeleton */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-muted-foreground/50">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm">Time Context</span>
                        </div>
                        <div className="flex gap-2">
                            {[1, 2].map((_, i) => (
                                <div key={i} className="flex-1 h-8 bg-muted/20 rounded-md border border-white/5" />
                            ))}
                        </div>
                    </div>
                </div>

                {/* CTA Hint */}
                <div className="mt-6 pt-4 border-t border-white/5 text-center">
                    <p className="text-xs text-muted-foreground group-hover:text-primary transition-colors">
                        Toggle <span className="font-semibold">Simulator Mode</span> to enable controls
                    </p>
                </div>
            </GlassCard>
        </div>
    );
};

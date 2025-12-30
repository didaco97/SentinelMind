import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useSimulator } from '@/context/SimulatorContext';
import { GlassCard } from '@/components/GlassCard';
import { Zap, TrendingDown, Laptop, Loader2 } from 'lucide-react';

interface ExplainabilityModalProps {
  open: boolean;
}

export const ExplainabilityModal = ({ open }: ExplainabilityModalProps) => {
  const { closeExplainability } = useSimulator();

  const explanations = [
    {
      icon: Zap,
      title: 'Unusual Volume & Speed',
      details: ['45 sensitive files accessed', 'within 5 minutes'],
    },
    {
      icon: TrendingDown,
      title: 'Deviation From Normal Pattern',
      details: ['Accessed restricted finance reports', 'during off-hours'],
    },
    {
      icon: Laptop,
      title: 'New Device Context',
      details: ['Files downloaded from', 'an unfamiliar device'],
    },
  ];

  return (
    <Dialog open={open} onOpenChange={closeExplainability}>
      <DialogContent className="glass-card-strong border-border/30 max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading text-foreground">
            Why Was This Limited?
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 mt-6">
          {explanations.map((item, index) => (
            <GlassCard key={index} variant="subtle" className="p-5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-trust-warning/10 flex items-center justify-center flex-shrink-0">
                  <item.icon size={24} className="text-trust-warning" />
                </div>
                <div>
                  <h4 className="font-heading font-medium text-foreground mb-1">{item.title}</h4>
                  {item.details.map((detail, i) => (
                    <p key={i} className="text-sm text-muted-foreground">{detail}</p>
                  ))}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        <div className="mt-6 p-4 rounded-lg bg-muted/20 border border-border/30">
          <p className="text-sm text-muted-foreground text-center">
            Temporary restriction applied to protect sensitive data.
          </p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <Loader2 size={14} className="text-primary animate-spin" />
            <span className="text-sm text-primary">Resolution in Progress</span>
          </div>
        </div>

        <Button onClick={closeExplainability} className="w-full mt-4">
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
};

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useSimulator } from '@/context/SimulatorContext';
import { Shield, Laptop, Zap, Clock } from 'lucide-react';

interface AccessAdjustedModalProps {
  open: boolean;
}

export const AccessAdjustedModal = ({ open }: AccessAdjustedModalProps) => {
  const { requestElevatedAccess, closeAccessModal } = useSimulator();

  return (
    <Dialog open={open} onOpenChange={closeAccessModal}>
      <DialogContent className="glass-card-strong border-trust-warning/30 max-w-lg">
        <div className="absolute inset-0 rounded-lg opacity-20 pointer-events-none"
          style={{ background: 'radial-gradient(circle at top, hsl(35, 95%, 55%) 0%, transparent 60%)' }}
        />
        
        <DialogHeader className="relative">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-trust-warning/20 flex items-center justify-center">
              <Shield size={20} className="text-trust-warning" />
            </div>
            <DialogTitle className="text-xl font-heading text-trust-warning">
              Access Temporarily Adjusted
            </DialogTitle>
          </div>
          <DialogDescription className="text-foreground/70 text-base">
            We've temporarily limited downloading sensitive files to protect your data during unusual activity.
          </DialogDescription>
        </DialogHeader>

        <Accordion type="single" collapsible className="mt-4">
          <AccordionItem value="understanding" className="border-border/30">
            <AccordionTrigger className="text-sm text-foreground/80 hover:text-foreground">
              Understanding Your Environment
            </AccordionTrigger>
            <AccordionContent className="space-y-3 pt-2">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                <Laptop size={18} className="text-trust-warning" />
                <span className="text-sm">New Device Detected</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                <Zap size={18} className="text-trust-warning" />
                <span className="text-sm">Rapid Actions Observed</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                <Clock size={18} className="text-trust-warning" />
                <span className="text-sm">Unusual Access Timing</span>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="flex gap-3 mt-6">
          <Button variant="outline" onClick={closeAccessModal} className="flex-1 border-border/50">
            Cancel
          </Button>
          <Button onClick={requestElevatedAccess} className="flex-1 bg-trust-warning hover:bg-trust-warning/90 text-primary-foreground">
            Request Elevated Access
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

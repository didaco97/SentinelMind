import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'strong' | 'subtle';
  glow?: 'none' | 'cyan' | 'violet' | 'amber';
  hover?: boolean;
}

export const GlassCard = ({ 
  children, 
  className, 
  variant = 'default',
  glow = 'none',
  hover = false,
}: GlassCardProps) => {
  const variantClasses = {
    default: 'glass-card',
    strong: 'glass-card-strong',
    subtle: 'bg-card/20 backdrop-blur-lg border border-border/30 rounded-xl',
  };

  const glowClasses = {
    none: '',
    cyan: 'glow-cyan',
    violet: 'glow-violet',
    amber: 'glow-amber',
  };

  return (
    <div 
      className={cn(
        variantClasses[variant],
        glowClasses[glow],
        hover && 'transition-all duration-300 hover:scale-[1.02] hover:border-primary/30',
        className
      )}
    >
      {children}
    </div>
  );
};

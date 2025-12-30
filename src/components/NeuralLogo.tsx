import { cn } from '@/lib/utils';

interface NeuralLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
}

const sizes = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
  xl: 'w-24 h-24',
};

export const NeuralLogo = ({ className, size = 'md', animated = true }: NeuralLogoProps) => {
  return (
    <div className={cn('relative', sizes[size], className)}>
      {/* Glow effect */}
      {animated && (
        <div 
          className="absolute inset-0 rounded-full blur-xl opacity-60 animate-pulse-soft"
          style={{
            background: 'radial-gradient(circle, hsl(190, 90%, 55%) 0%, transparent 70%)',
            transform: 'scale(1.5)',
          }}
        />
      )}
      
      {/* Shield with neural network */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn('relative z-10 w-full h-full', animated && 'animate-float')}
      >
        {/* Shield outline */}
        <path
          d="M50 5 L90 20 L90 45 C90 70 70 90 50 95 C30 90 10 70 10 45 L10 20 L50 5Z"
          stroke="url(#shieldGradient)"
          strokeWidth="2"
          fill="url(#shieldFill)"
          className="drop-shadow-lg"
        />
        
        {/* Neural network nodes */}
        <circle cx="50" cy="35" r="6" fill="url(#nodeGradient)" className={animated ? 'animate-pulse-soft' : ''} />
        <circle cx="35" cy="50" r="5" fill="url(#nodeGradient)" style={{ animationDelay: '0.5s' }} className={animated ? 'animate-pulse-soft' : ''} />
        <circle cx="65" cy="50" r="5" fill="url(#nodeGradient)" style={{ animationDelay: '1s' }} className={animated ? 'animate-pulse-soft' : ''} />
        <circle cx="40" cy="68" r="4" fill="url(#nodeGradient)" style={{ animationDelay: '1.5s' }} className={animated ? 'animate-pulse-soft' : ''} />
        <circle cx="60" cy="68" r="4" fill="url(#nodeGradient)" style={{ animationDelay: '2s' }} className={animated ? 'animate-pulse-soft' : ''} />
        <circle cx="50" cy="80" r="3" fill="url(#nodeGradient)" style={{ animationDelay: '2.5s' }} className={animated ? 'animate-pulse-soft' : ''} />
        
        {/* Neural connections */}
        <g stroke="url(#lineGradient)" strokeWidth="1.5" opacity="0.7">
          <line x1="50" y1="35" x2="35" y2="50" />
          <line x1="50" y1="35" x2="65" y2="50" />
          <line x1="35" y1="50" x2="40" y2="68" />
          <line x1="65" y1="50" x2="60" y2="68" />
          <line x1="35" y1="50" x2="65" y2="50" />
          <line x1="40" y1="68" x2="60" y2="68" />
          <line x1="40" y1="68" x2="50" y2="80" />
          <line x1="60" y1="68" x2="50" y2="80" />
        </g>
        
        {/* Gradients */}
        <defs>
          <linearGradient id="shieldGradient" x1="10" y1="5" x2="90" y2="95">
            <stop offset="0%" stopColor="hsl(190, 90%, 55%)" />
            <stop offset="100%" stopColor="hsl(260, 70%, 60%)" />
          </linearGradient>
          <linearGradient id="shieldFill" x1="10" y1="5" x2="90" y2="95">
            <stop offset="0%" stopColor="hsl(190, 90%, 55%)" stopOpacity="0.1" />
            <stop offset="100%" stopColor="hsl(260, 70%, 60%)" stopOpacity="0.05" />
          </linearGradient>
          <radialGradient id="nodeGradient">
            <stop offset="0%" stopColor="hsl(190, 90%, 70%)" />
            <stop offset="100%" stopColor="hsl(190, 90%, 55%)" />
          </radialGradient>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(190, 90%, 55%)" />
            <stop offset="100%" stopColor="hsl(260, 70%, 60%)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

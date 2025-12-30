import { cn } from '@/lib/utils';

interface WaveVisualizationProps {
  className?: string;
  status?: 'stable' | 'warning' | 'limited';
}

const statusColors = {
  stable: {
    primary: 'hsl(165, 80%, 45%)',
    secondary: 'hsl(190, 90%, 55%)',
    glow: 'hsl(165, 80%, 45%)',
  },
  warning: {
    primary: 'hsl(35, 95%, 55%)',
    secondary: 'hsl(45, 90%, 50%)',
    glow: 'hsl(35, 95%, 55%)',
  },
  limited: {
    primary: 'hsl(25, 90%, 50%)',
    secondary: 'hsl(35, 85%, 55%)',
    glow: 'hsl(25, 90%, 50%)',
  },
};

export const WaveVisualization = ({ className, status = 'stable' }: WaveVisualizationProps) => {
  const colors = statusColors[status];

  return (
    <div className={cn('relative w-full max-w-md aspect-square', className)}>
      {/* Glow backdrop */}
      <div 
        className="absolute inset-0 rounded-full blur-3xl opacity-30 animate-pulse-soft"
        style={{
          background: `radial-gradient(circle, ${colors.glow} 0%, transparent 70%)`,
        }}
      />
      
      {/* Main SVG */}
      <svg
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 w-full h-full breathing"
      >
        {/* Outer ring */}
        <circle
          cx="200"
          cy="200"
          r="180"
          stroke="url(#outerRingGradient)"
          strokeWidth="1"
          opacity="0.3"
        />
        
        {/* Middle ring */}
        <circle
          cx="200"
          cy="200"
          r="140"
          stroke="url(#middleRingGradient)"
          strokeWidth="1.5"
          opacity="0.5"
          strokeDasharray="8 4"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 200 200"
            to="360 200 200"
            dur="60s"
            repeatCount="indefinite"
          />
        </circle>
        
        {/* Inner flowing ring */}
        <circle
          cx="200"
          cy="200"
          r="100"
          stroke="url(#innerRingGradient)"
          strokeWidth="2"
          opacity="0.7"
          strokeDasharray="20 10"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="360 200 200"
            to="0 200 200"
            dur="30s"
            repeatCount="indefinite"
          />
        </circle>
        
        {/* Infinity / wave loop - figure 8 pattern */}
        <path
          d="M200 200 C160 160, 100 160, 100 200 C100 240, 160 240, 200 200 C240 160, 300 160, 300 200 C300 240, 240 240, 200 200"
          stroke="url(#waveGradient)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          opacity="0.9"
        >
          <animate
            attributeName="stroke-dasharray"
            values="0 1000;500 500;1000 0;500 500;0 1000"
            dur="8s"
            repeatCount="indefinite"
          />
        </path>
        
        {/* Secondary wave */}
        <path
          d="M200 200 C170 175, 130 175, 130 200 C130 225, 170 225, 200 200 C230 175, 270 175, 270 200 C270 225, 230 225, 200 200"
          stroke="url(#waveGradient2)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          opacity="0.6"
        >
          <animate
            attributeName="stroke-dasharray"
            values="500 500;0 1000;500 500;1000 0;500 500"
            dur="8s"
            repeatCount="indefinite"
          />
        </path>
        
        {/* Core circle */}
        <circle
          cx="200"
          cy="200"
          r="20"
          fill="url(#coreGradient)"
          opacity="0.9"
        >
          <animate
            attributeName="r"
            values="18;22;18"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>
        
        {/* Orbiting particles */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <circle
            key={i}
            cx="200"
            cy="200"
            r="4"
            fill={colors.primary}
            opacity="0.8"
          >
            <animateMotion
              dur={`${6 + i}s`}
              repeatCount="indefinite"
              path={`M0,0 A${80 + i * 10},${80 + i * 10} 0 1,1 1,0 A${80 + i * 10},${80 + i * 10} 0 1,1 0,0`}
            />
          </circle>
        ))}
        
        {/* Gradients */}
        <defs>
          <linearGradient id="outerRingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.primary} />
            <stop offset="100%" stopColor={colors.secondary} />
          </linearGradient>
          <linearGradient id="middleRingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.secondary} />
            <stop offset="100%" stopColor={colors.primary} />
          </linearGradient>
          <linearGradient id="innerRingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.primary} />
            <stop offset="50%" stopColor={colors.secondary} />
            <stop offset="100%" stopColor={colors.primary} />
          </linearGradient>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={colors.primary} />
            <stop offset="50%" stopColor={colors.secondary} />
            <stop offset="100%" stopColor={colors.primary} />
          </linearGradient>
          <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={colors.secondary} />
            <stop offset="50%" stopColor={colors.primary} />
            <stop offset="100%" stopColor={colors.secondary} />
          </linearGradient>
          <radialGradient id="coreGradient">
            <stop offset="0%" stopColor="white" />
            <stop offset="50%" stopColor={colors.primary} />
            <stop offset="100%" stopColor={colors.secondary} />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};

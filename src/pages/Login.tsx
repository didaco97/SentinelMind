import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CosmicBackground } from '@/components/CosmicBackground';
import { NeuralLogo } from '@/components/NeuralLogo';
import { GlassCard } from '@/components/GlassCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSimulator } from '@/context/SimulatorContext';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useSimulator();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    login(username || 'Demo User');
    navigate('/dashboard');
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <CosmicBackground />
      
      {/* Ambient ripple effect behind form */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div 
          className="w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, hsl(190, 90%, 55%) 0%, transparent 70%)',
            animation: 'ripple 4s ease-in-out infinite',
          }}
        />
      </div>
      
      {/* Login form */}
      <div className="relative z-10 w-full max-w-md px-4 animate-fade-in">
        <GlassCard variant="strong" glow="cyan" className="p-8">
          {/* Logo and branding */}
          <div className="flex flex-col items-center mb-8">
            <NeuralLogo size="xl" />
            <h1 className="mt-4 text-2xl font-heading font-semibold text-foreground">
              SentinelMind
            </h1>
            <p className="mt-2 text-sm text-muted-foreground text-center">
              Security that understands people.
            </p>
          </div>
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-foreground/80">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-muted/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 placeholder:text-muted-foreground/50"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground/80">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-muted/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 placeholder:text-muted-foreground/50 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Authenticating...
                </span>
              ) : (
                'Log In'
              )}
            </Button>
          </form>
          
          {/* Footer */}
          <p className="mt-6 text-xs text-center text-muted-foreground">
            Protected by Human-Aware Zero Trust Security
          </p>
        </GlassCard>
      </div>
    </div>
  );
};

export default Login;

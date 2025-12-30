import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NeuralLogo } from '@/components/NeuralLogo';
import { LoginScene } from '@/components/login/LoginScene';
import { CyberGlobe } from '@/components/login/CyberGlobe';
import { GlassCard } from '@/components/GlassCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSimulator } from '@/context/SimulatorContext';
import { Shield, User, Lock } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useSimulator();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate real processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    login(username || 'Demo User');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen w-full flex overflow-hidden bg-background font-body">
      {/* Left Panel - Interactive 3D Scene + Login Form */}
      <div className="w-full lg:w-1/2 relative flex flex-col justify-center items-center p-6 lg:p-12 z-10">
        {/* 3D Background for Left Panel */}
        <LoginScene />

        {/* Logo Area */}
        <div className="absolute top-8 left-8 z-20 animate-fade-in">
          <div className="flex items-center gap-3">
            <NeuralLogo className="w-10 h-10 text-primary animate-pulse-slow" />
            <h1 className="text-2xl font-heading font-bold text-white tracking-wider">
              Sentinel<span className="text-primary">Mind</span>
            </h1>
          </div>
        </div>

        {/* Glass Login Form */}
        <GlassCard variant="strong" className="w-full max-w-md p-8 relative z-20 border-white/10 shadow-2xl backdrop-blur-xl animate-scale-in">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-heading font-bold text-white mb-2">Welcome Back, Agent</h2>
            <p className="text-muted-foreground">Authenticate to access the Neural Defense Grid.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Identity Token</label>
              <div className="relative group">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                <Input
                  type="text"
                  placeholder="Enter your user ID"
                  className="pl-10 bg-black/40 border-white/10 text-white placeholder:text-gray-500 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all h-12"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Security Key</label>
              <div className="relative group">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="pl-10 bg-black/40 border-white/10 text-white placeholder:text-gray-500 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all h-12"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-primary hover:bg-primary/90 text-background font-bold text-lg tracking-wide transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                  VERIFYING...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  INITIALIZE SESSION
                </span>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              System Status: OPTIMAL
            </p>
          </div>
        </GlassCard>

        {/* Footer */}
        <div className="absolute bottom-6 text-center w-full z-20 opacity-50">
          <p className="text-xs text-gray-400">© 2024 SentinelMind Defense Systems. All rights reserved.</p>
        </div>
      </div>

      {/* Right Panel - Cyber Globe */}
      <div className="hidden lg:block w-1/2 relative bg-black overflow-hidden perspective-1000">
        <CyberGlobe />

        {/* Decorative Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent"></div>

        {/* Overlay Text */}
        <div className="absolute top-10 right-10 z-20 text-right space-y-1 mr-4">
          <h3 className="text-4xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 drop-shadow-lg">GLOBAL THREAT MAP</h3>
          <p className="text-sm font-mono text-cyan-500/80 animate-pulse">LIVE RELAY // SECTOR 7</p>
        </div>
      </div>
    </div>
  );
};

export default Login;

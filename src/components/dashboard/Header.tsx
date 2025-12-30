import { NeuralLogo } from '@/components/NeuralLogo';
import { useSimulator } from '@/context/SimulatorContext';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { LogOut, LayoutDashboard, FileText, Settings, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const { 
    simulatorMode, 
    setSimulatorMode, 
    userName, 
    logout, 
    reliabilityScore,
    trustStatus 
  } = useSimulator();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const statusColors = {
    stable: 'bg-trust-stable',
    warning: 'bg-trust-warning',
    limited: 'bg-trust-limited',
  };

  return (
    <header className="relative z-20 border-b border-border/30 backdrop-blur-xl bg-card/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and brand */}
          <div className="flex items-center gap-3">
            <NeuralLogo size="sm" animated={false} />
            <span className="font-heading font-semibold text-lg text-foreground">
              SentinelMind
            </span>
          </div>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Button variant="ghost" size="sm" className="text-foreground/70 hover:text-foreground hover:bg-muted/50">
              <LayoutDashboard size={16} className="mr-2" />
              Dashboard
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hover:bg-muted/50">
              <FileText size={16} className="mr-2" />
              Reports
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hover:bg-muted/50">
              <Settings size={16} className="mr-2" />
              Policies
            </Button>
          </nav>
          
          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Simulator toggle */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/30 border border-border/30">
              <Activity size={14} className="text-secondary" />
              <span className="text-xs font-medium text-muted-foreground">Simulator</span>
              <Switch
                checked={simulatorMode}
                onCheckedChange={setSimulatorMode}
                className="data-[state=checked]:bg-secondary"
              />
            </div>
            
            {/* Reliability score badge */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/30 border border-border/30">
              <div className={`w-2 h-2 rounded-full ${statusColors[trustStatus]}`} />
              <span className="text-xs font-medium text-muted-foreground">
                Score: {reliabilityScore}
              </span>
            </div>
            
            {/* User */}
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline text-sm text-foreground/70">
                {userName}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="text-muted-foreground hover:text-foreground hover:bg-muted/50"
              >
                <LogOut size={18} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

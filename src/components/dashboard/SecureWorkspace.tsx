import { useState } from 'react';
import { useSimulator } from '@/context/SimulatorContext';
import { GlassCard } from '@/components/GlassCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Shield, Settings, Lock, AlertTriangle, Eye, Server, Radio, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export const SecureWorkspace = () => {
  const { trustStatus, reliabilityScore } = useSimulator();
  const [activeTab, setActiveTab] = useState('documents');

  const isLimited = trustStatus === 'limited';
  const isWarning = trustStatus === 'warning';
  const isStable = trustStatus === 'stable';

  const files = [
    { name: 'Project_Titan_Blueprints.pdf', type: 'Confidential', date: '2024-03-15' },
    { name: 'Employee_Salary_Data_Q1.xlsx', type: 'Restricted', date: '2024-03-14' },
    { name: 'Network_Security_Audit.docx', type: 'Internal', date: '2024-03-12' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-heading font-semibold text-foreground flex items-center gap-2">
          <Server className="w-5 h-5 text-primary" />
          Secure Workspace
        </h2>
        <Badge variant={isStable ? "default" : isLimited ? "destructive" : "secondary"} className="animate-pulse">
          {isStable ? 'Connection Secure' : isLimited ? 'Access Restricted' : 'Monitoring Active'}
        </Badge>
      </div>

      <GlassCard variant="default" className="overflow-hidden">
        <Tabs defaultValue="documents" value={activeTab} onValueChange={setActiveTab}>
          {/* Tab Header */}
          <div className="border-b border-border/10 bg-black/20 p-2">
            <TabsList className="grid w-full grid-cols-3 bg-transparent">
              <TabsTrigger value="documents" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                <FileText className="w-4 h-4 mr-2" />
                Documents
              </TabsTrigger>
              <TabsTrigger value="config" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                <Settings className="w-4 h-4 mr-2" />
                SysAdmin
              </TabsTrigger>
              <TabsTrigger value="comms" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                <MessageSquare className="w-4 h-4 mr-2" />
                CommLink
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Documents Tab */}
          <TabsContent value="documents" className="m-0">
            <div className="p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-medium text-muted-foreground">Recent Confidential Files</h3>
                {isLimited && (
                  <span className="text-xs text-destructive flex items-center gap-1 font-bold">
                    <Lock className="w-3 h-3" /> ENCRYPTION LOCKED
                  </span>
                )}
              </div>

              <div className="space-y-2 relative">
                {files.map((file, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-lg border transition-all duration-300",
                      isLimited
                        ? "bg-muted/10 border-red-500/30 blur-[2px] pointer-events-none select-none"
                        : "bg-muted/20 border-white/5 hover:bg-muted/30 hover:border-primary/30"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn("p-2 rounded-md", isLimited ? "bg-red-500/20" : "bg-primary/20")}>
                        <FileText className={cn("w-4 h-4", isLimited ? "text-red-400" : "text-primary")} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{isLimited ? 'Unknown_File_Err.enc' : file.name}</p>
                        <p className="text-xs text-muted-foreground">{file.type} • {file.date}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost" disabled={isLimited}>
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                ))}

                {/* Lock Overlay for Limited State */}
                <AnimatePresence>
                  {isLimited && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-black/60 backdrop-blur-[1px] rounded-lg border border-red-500/30"
                    >
                      <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="p-4 rounded-full bg-red-500/10 border border-red-500/50 mb-3"
                      >
                        <Lock className="w-8 h-8 text-red-500" />
                      </motion.div>
                      <h3 className="text-base font-bold text-red-100">Access Revoked</h3>
                      <p className="text-red-200/70 text-xs text-center max-w-[180px] mt-1">
                        Reliability Score ({reliabilityScore}) below threshold.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </TabsContent>

          {/* SysAdmin Tab */}
          <TabsContent value="config" className="m-0">
            <div className="p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-medium text-muted-foreground">System Configuration</h3>
                {(isWarning || isLimited) && (
                  <span className="text-xs text-amber-500 flex items-center gap-1 font-bold">
                    <Shield className="w-3 h-3" /> ADMIN SUSPENDED
                  </span>
                )}
              </div>

              <div className="space-y-2">
                {['Firewall Rule Set A', 'User Auth Protocols', 'Legacy Database Access'].map((setting, i) => (
                  <div key={i} className={cn(
                    "flex items-center justify-between p-3 rounded-lg border",
                    (isWarning || isLimited)
                      ? "bg-amber-900/10 border-amber-500/20 opacity-60 cursor-not-allowed"
                      : "bg-muted/20 border-white/5"
                  )}>
                    <div className="flex items-center gap-3">
                      <Settings className={cn("w-4 h-4", (isWarning || isLimited) ? "text-amber-500" : "text-primary")} />
                      <span className="text-sm font-medium">{setting}</span>
                    </div>
                    <div className={cn("w-8 h-4 rounded-full relative transition-colors",
                      (isWarning || isLimited) ? "bg-muted" : "bg-primary/50"
                    )}>
                      <div className={cn("absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all shadow-md",
                        (isWarning || isLimited) ? "left-0.5 bg-gray-500" : "right-0.5"
                      )} />
                    </div>
                  </div>
                ))}
              </div>

              {(isWarning || isLimited) && (
                <div className="mt-3 p-2 bg-amber-500/10 border border-amber-500/30 rounded-md flex gap-2 text-amber-200 text-xs">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-amber-500" />
                  <p>Admin controls disabled due to elevated risk detection.</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* CommLink Tab */}
          <TabsContent value="comms" className="m-0">
            <div className="p-4">
              <div className="bg-black/20 rounded-lg p-3 space-y-2 font-mono text-xs mb-3 max-h-[150px] overflow-y-auto">
                <div className="text-green-400">[SYSTEM]: Connection established. Channel encrypted.</div>
                <div className="text-muted-foreground">[10:42] Agent Smith: Sector 7 check-in complete.</div>
                <div className="text-muted-foreground">[10:45] HQ: Awaiting status report.</div>
                {isLimited && (
                  <div className="text-red-400 border-l-2 border-red-500 pl-2">
                    [ALERT]: User reliability compromised. Contact Supervisor.
                  </div>
                )}
                {isWarning && !isLimited && (
                  <div className="text-amber-400 border-l-2 border-amber-500 pl-2">
                    [WARNING]: Stress anomaly detected. Monitoring increased.
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <input
                  disabled={isLimited}
                  className="flex-1 bg-muted/20 border border-white/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary/50"
                  placeholder={isLimited ? "Chat Locked" : "Type message..."}
                />
                <Button size="icon" disabled={isLimited} variant="secondary">
                  <Radio className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </GlassCard>
    </div>
  );
};

import { GlassCard } from '@/components/GlassCard';
import { FileText, Download, Eye, FolderOpen } from 'lucide-react';

const activities = [
  {
    id: 1,
    icon: Eye,
    action: 'Viewed',
    target: 'Q4 Financial Report',
    time: '2 min ago',
  },
  {
    id: 2,
    icon: Download,
    action: 'Downloaded',
    target: 'Employee Database Export',
    time: '8 min ago',
  },
  {
    id: 3,
    icon: FolderOpen,
    action: 'Accessed',
    target: 'Project Alpha Repository',
    time: '15 min ago',
  },
  {
    id: 4,
    icon: FileText,
    action: 'Opened',
    target: 'Security Policy Documents',
    time: '23 min ago',
  },
  {
    id: 5,
    icon: Eye,
    action: 'Reviewed',
    target: 'Client Contracts Folder',
    time: '45 min ago',
  },
];

interface RecentActivityProps {
  horizontal?: boolean;
}

export const RecentActivity = ({ horizontal = false }: RecentActivityProps) => {
  return (
    <GlassCard variant="default" className={horizontal ? "p-4 mt-6" : "p-6"}>
      <div className={horizontal ? "flex items-center gap-6" : "block"}>
        <h3 className={`text-sm font-heading font-medium text-muted-foreground uppercase tracking-wider ${horizontal ? "shrink-0 mb-0" : "mb-4"}`}>
          Recent Activity
        </h3>

        <div className={horizontal ? "flex items-center gap-4 overflow-x-auto pb-2 scrollbar-thin" : "space-y-1"}>
          {activities.map((activity) => (
            <div
              key={activity.id}
              className={`flex items-center gap-3 p-3 rounded-lg hover:bg-muted/20 transition-colors group ${horizontal ? "min-w-[280px] bg-muted/10 border border-white/5" : ""}`}
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <activity.icon size={16} className="text-primary" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground/90 truncate">
                  <span className="text-muted-foreground">{activity.action}</span>{' '}
                  {activity.target}
                </p>
              </div>

              <span className="text-xs text-muted-foreground flex-shrink-0">
                {activity.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
};

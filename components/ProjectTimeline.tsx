'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Tooltip } from '@/components/ui/tooltip';

export interface ProjectPeriodItem {
  title?: string;
  date: string;
  description?: string;
}

interface ProjectTimelineProps {
  periods: ProjectPeriodItem[];
  compact?: boolean;
  className?: string;
}

export default function ProjectTimeline({ periods, compact = false, className }: ProjectTimelineProps) {
  if (!periods?.length) return null;

  if (compact) {
    // Mini timeline horizontale
    return (
      <div className={cn('mt-3', className)}>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
          <span className="font-medium">Périodes</span>
          <span>•</span>
          <span>{periods.length}</span>
        </div>
        <div className="relative">
          <div className="h-0.5 w-full bg-border rounded" />
          <div className="absolute inset-0 flex justify-between items-center">
            {periods.map((p, idx) => (
              <Tooltip
                key={idx}
                content={`${p.title || 'Période'} - ${p.date}${p.description ? '\n\n' + p.description : ''}`}
              >
                <button
                  type="button"
                  aria-label={p.title ? `${p.title} – ${p.date}` : p.date}
                  className="relative -translate-y-1 w-3 h-3 rounded-full bg-primary outline-none focus:ring-2 focus:ring-primary/40"
                />
              </Tooltip>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Timeline verticale détaillée
  return (
    <div className={cn('relative pl-6', className)}>
      <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-border" />
      <div className="space-y-6">
        {periods.map((p, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className="relative"
          >
            <div className="absolute left-0 top-1 w-3 h-3 rounded-full bg-primary border-4 border-background" />
            <div className="ml-4">
              <div className="text-sm text-muted-foreground">{p.date}</div>
              {p.title ? <div className="font-semibold">{p.title}</div> : null}
              {p.description ? (
                <p className="text-sm text-muted-foreground mt-1">{p.description}</p>
              ) : null}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}



import React from 'react';
import { cn } from '../lib/utils';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  className
}) => {
  return (
    <div 
      className={cn(
        "group relative p-6 rounded-2xl border bg-card transition-all duration-300 hover:shadow-elevated hover:-translate-y-1",
        className
      )}
    >
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-muted-foreground text-sm">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
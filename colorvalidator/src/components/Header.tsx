import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { 
  History, 
  Settings, 
  ChevronRight 
} from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle?: string;
  backLink?: string;
  backLabel?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  title, 
  subtitle, 
  backLink, 
  backLabel 
}) => {
  return (
    <div className="w-full py-6 px-4 sm:px-6 border-b border-border bg-white">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          {backLink && (
            <div className="flex items-center mb-2 text-sm">
              <Link 
                to={backLink} 
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group"
              >
                <ChevronRight className="h-3 w-3 transform rotate-180 transition-transform group-hover:-translate-x-1" />
                <span>{backLabel || 'Back'}</span>
              </Link>
            </div>
          )}
          
          <h1 className="text-2xl font-bold leading-tight">{title}</h1>
          {subtitle && (
            <p className="text-muted-foreground text-sm mt-1">{subtitle}</p>
          )}
        </div>
        
        <div className="flex items-center space-x-2 self-end sm:self-auto">
          <Link to="/history">
            <Button variant="outline" size="sm" className="h-9 gap-1.5">
              <History className="h-4 w-4" />
              <span className="hidden sm:inline">History</span>
            </Button>
          </Link>
          
          <Link to="/settings">
            <Button variant="outline" size="sm" className="h-9 gap-1.5">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Settings</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;

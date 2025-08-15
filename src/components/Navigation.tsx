import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, PenTool } from 'lucide-react';
import Mascot from './Mascot';

const Navigation: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/posts', label: 'All Posts', icon: BookOpen },
    { path: '/write', label: 'Write', icon: PenTool },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <Mascot />
            <span className="font-handwritten text-2xl text-primary group-hover:text-primary-glow transition-colors">
              Dear Diary
            </span>
          </Link>

          <div className="flex items-center gap-6">
            {navItems.map(({ path, label, icon: Icon }) => {
              const isActive = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all hover:bg-accent/50 ${
                    isActive 
                      ? 'bg-primary text-primary-foreground shadow-[var(--shadow-gentle)]' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon size={18} />
                  <span className="font-medium">{label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
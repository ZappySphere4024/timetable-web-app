import { House, Calendar, Trophy, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: 'home' | 'timetable' | 'leaderboard' | 'profile';
  onTabChange: (tab: 'home' | 'timetable' | 'leaderboard' | 'profile') => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: 'home' as const, label: 'Home', icon: House },
    { id: 'timetable' as const, label: 'Timetable', icon: Calendar },
    { id: 'leaderboard' as const, label: 'Leaderboard', icon: Trophy },
    { id: 'profile' as const, label: 'Profile', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border safe-area-bottom">
      <div className="max-w-md mx-auto flex items-center justify-around px-2 h-20">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center justify-center flex-1 py-2 transition-colors relative"
            >
              {isActive && (
                <div className="absolute top-0 w-10 h-1 bg-primary rounded-b-full" />
              )}
              <Icon 
                className={`w-6 h-6 mb-1 transition-colors ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}
              />
              <span 
                className={`text-xs transition-colors ${
                  isActive ? 'text-primary font-medium' : 'text-muted-foreground'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
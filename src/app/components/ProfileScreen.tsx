import { User, Flame, Calendar, Bell, ChartBar, Settings, LogOut } from 'lucide-react';
import { Card } from './ui/card';
import { Switch } from './ui/switch';

interface ProfileScreenProps {
  onViewAnalytics: () => void;
}

export function ProfileScreen({ onViewAnalytics }: ProfileScreenProps) {
  return (
    <div className="pb-24 pt-6 px-4 space-y-4 overflow-y-auto" style={{ height: 'calc(100vh - 5rem)' }}>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-1">Profile</h2>
        <p className="text-muted-foreground text-sm">Manage your account settings</p>
      </div>

      {/* Profile Card */}
      <Card className="p-5 rounded-xl shadow-sm">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-primary rounded-full w-16 h-16 flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">Alex Johnson</h3>
            <p className="text-sm text-muted-foreground">alex.johnson@email.com</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 pt-4 border-t">
          <div className="text-center">
            <p className="text-xl font-bold text-primary">1,250</p>
            <p className="text-xs text-muted-foreground">Points</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-orange-500">7</p>
            <p className="text-xs text-muted-foreground">Streak</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-green-500">#1</p>
            <p className="text-xs text-muted-foreground">Rank</p>
          </div>
        </div>
      </Card>

      {/* Streak History */}
      <Card className="p-5 rounded-xl shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-500" />
            Streak History
          </h3>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 21 }, (_, i) => {
            const hasStreak = i >= 21 - 7;
            return (
              <div
                key={i}
                className={`aspect-square rounded-lg ${
                  hasStreak ? 'bg-orange-100 border-2 border-orange-300' : 'bg-gray-100'
                }`}
              />
            );
          })}
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          Last 21 days • Current streak: 7 days
        </p>
      </Card>

      {/* Settings */}
      <Card className="p-5 rounded-xl shadow-sm">
        <h3 className="font-semibold mb-4">Settings</h3>
        
        <div className="space-y-4">
          {/* Calendar Sync */}
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <div className="bg-blue-50 rounded-lg p-2">
                <Calendar className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="font-medium text-sm">Calendar Sync</p>
                <p className="text-xs text-muted-foreground">Sync with Google Calendar</p>
              </div>
            </div>
            <Switch />
          </div>

          {/* Notifications */}
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <div className="bg-purple-50 rounded-lg p-2">
                <Bell className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <p className="font-medium text-sm">Notifications</p>
                <p className="text-xs text-muted-foreground">Daily reminders & updates</p>
              </div>
            </div>
            <Switch defaultChecked />
          </div>

          {/* Weekly Analytics */}
          <button 
            onClick={onViewAnalytics}
            className="flex items-center justify-between w-full py-2"
          >
            <div className="flex items-center gap-3">
              <div className="bg-green-50 rounded-lg p-2">
                <ChartBar className="w-5 h-5 text-green-500" />
              </div>
              <div className="text-left">
                <p className="font-medium text-sm">Weekly Analytics</p>
                <p className="text-xs text-muted-foreground">View your performance</p>
              </div>
            </div>
            <span className="text-primary text-sm">→</span>
          </button>

          {/* General Settings */}
          <button className="flex items-center justify-between w-full py-2">
            <div className="flex items-center gap-3">
              <div className="bg-gray-100 rounded-lg p-2">
                <Settings className="w-5 h-5 text-gray-500" />
              </div>
              <div className="text-left">
                <p className="font-medium text-sm">General Settings</p>
                <p className="text-xs text-muted-foreground">App preferences</p>
              </div>
            </div>
            <span className="text-primary text-sm">→</span>
          </button>
        </div>
      </Card>

      {/* Logout Button */}
      <Card className="p-4 rounded-xl shadow-sm">
        <button className="flex items-center justify-center gap-2 w-full text-destructive">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Log Out</span>
        </button>
      </Card>
    </div>
  );
}
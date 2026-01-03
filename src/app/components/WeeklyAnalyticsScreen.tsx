import { TrendingUp, Calendar, Target, Award } from 'lucide-react';
import { Card } from './ui/card';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';

interface WeeklyAnalyticsScreenProps {
  onBack: () => void;
}

export function WeeklyAnalyticsScreen({ onBack }: WeeklyAnalyticsScreenProps) {
  const weeklyData = [
    { day: 'Mon', hours: 3.5 },
    { day: 'Tue', hours: 4.2 },
    { day: 'Wed', hours: 3.8 },
    { day: 'Thu', hours: 5.1 },
    { day: 'Fri', hours: 4.5 },
    { day: 'Sat', hours: 2.8 },
    { day: 'Sun', hours: 3.2 },
  ];

  const stats = [
    { label: 'Study Time', value: '27.1h', icon: Calendar, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Avg. Accuracy', value: '89%', icon: Target, color: 'text-green-500', bg: 'bg-green-50' },
    { label: 'Quizzes Done', value: '12', icon: Award, color: 'text-purple-500', bg: 'bg-purple-50' },
    { label: 'Best Day', value: 'Thu', icon: TrendingUp, color: 'text-orange-500', bg: 'bg-orange-50' },
  ];

  return (
    <div className="min-h-screen bg-background px-4 py-6">
      {/* Header */}
      <button onClick={onBack} className="text-sm text-primary mb-6">
        ← Back
      </button>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-1">Weekly Analytics</h2>
        <p className="text-muted-foreground text-sm">Your performance this week</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="p-4 rounded-xl shadow-sm">
              <div className={`${stat.bg} w-10 h-10 rounded-lg flex items-center justify-center mb-3`}>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="text-2xl font-bold mb-1">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </Card>
          );
        })}
      </div>

      {/* Study Consistency Chart */}
      <Card className="p-5 rounded-xl shadow-sm mb-6">
        <h3 className="font-semibold mb-1">Study Consistency</h3>
        <p className="text-xs text-muted-foreground mb-4">Daily study hours this week</p>
        
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={weeklyData}>
            <XAxis 
              dataKey="day" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
            />
            <Bar dataKey="hours" radius={[8, 8, 0, 0]}>
              {weeklyData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.hours >= 4 ? '#6366F1' : '#C7D2FE'} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Subject Performance */}
      <Card className="p-5 rounded-xl shadow-sm mb-6">
        <h3 className="font-semibold mb-4">Subject Performance</h3>
        <div className="space-y-4">
          {[
            { subject: 'Mathematics', accuracy: 95, color: 'bg-blue-500' },
            { subject: 'Physics', accuracy: 88, color: 'bg-purple-500' },
            { subject: 'Chemistry', accuracy: 82, color: 'bg-green-500' },
            { subject: 'English', accuracy: 91, color: 'bg-pink-500' },
          ].map((item) => (
            <div key={item.subject}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{item.subject}</span>
                <span className="text-sm text-muted-foreground">{item.accuracy}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className={`${item.color} h-2 rounded-full transition-all`}
                  style={{ width: `${item.accuracy}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Weekly Summary */}
      <Card className="p-5 rounded-xl shadow-sm bg-gradient-to-br from-primary/10 to-primary/5">
        <h3 className="font-semibold mb-2">Weekly Summary</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Great week! You've studied for 27.1 hours with an average accuracy of 89%. 
          Keep up the excellent work! 🎉
        </p>
        <div className="flex items-center gap-2 text-sm">
          <TrendingUp className="w-4 h-4 text-green-500" />
          <span className="text-green-600 font-medium">+15% from last week</span>
        </div>
      </Card>
    </div>
  );
}

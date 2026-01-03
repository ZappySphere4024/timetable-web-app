import { Flame, BookOpen, Trophy, Award } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';

interface HomeScreenProps {
  onStartQuiz: () => void;
  onViewLeaderboard: () => void;
  onViewBadges: () => void;
}

export function HomeScreen({ onStartQuiz, onViewLeaderboard, onViewBadges }: HomeScreenProps) {
  const todayClasses = [
    { id: 1, subject: 'Mathematics', time: '09:00 AM', color: 'bg-primary' },
    { id: 2, subject: 'Physics', time: '11:00 AM', color: 'bg-secondary' },
    { id: 3, subject: 'Chemistry', time: '02:00 PM', color: 'bg-accent' },
  ];

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="pb-24 pt-6 px-4 space-y-4 overflow-y-auto" style={{ height: 'calc(100vh - 5rem)' }}>
      {/* Greeting Card */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-1">Good Morning, Alex! 👋</h2>
        <p className="text-muted-foreground text-sm">{currentDate}</p>
      </div>

      {/* Today's Classes */}
      <Card className="p-4 rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            Today's Classes
          </h3>
          <span className="text-xs text-muted-foreground">{todayClasses.length} classes</span>
        </div>
        <div className="space-y-3">
          {todayClasses.map((classItem) => (
            <div
              key={classItem.id}
              className="flex items-center gap-3 p-3 bg-muted rounded-lg"
            >
              <div className={`w-1 h-12 ${classItem.color} rounded-full`} />
              <div className="flex-1">
                <p className="font-medium">{classItem.subject}</p>
                <p className="text-xs text-muted-foreground">{classItem.time}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Daily Streak */}
      <Card className="p-4 rounded-xl bg-gradient-to-br from-accent/20 to-secondary/20 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-white/80 mb-1">Daily Streak</p>
            <div className="flex items-center gap-2">
              <Flame className="w-8 h-8 text-accent" />
              <span className="text-3xl font-bold text-white">7</span>
              <span className="text-sm text-white/80">days</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-white/80 mb-2">Keep it up!</p>
            <Button
              onClick={onStartQuiz}
              className="bg-white text-accent rounded-lg px-4 py-2 text-sm"
            >
              Start Quiz
            </Button>
          </div>
        </div>
      </Card>

      {/* Leaderboard Preview */}
      <Card className="p-4 rounded-xl" onClick={onViewLeaderboard}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold flex items-center gap-2">
            <Trophy className="w-5 h-5 text-primary" />
            Leaderboard
          </h3>
          <span className="text-xs text-primary">View All →</span>
        </div>
        <div className="space-y-3">
          {[
            { rank: 1, name: 'You', points: 1250, avatar: '🎯' },
            { rank: 2, name: 'Sarah M.', points: 1180, avatar: '👩' },
            { rank: 3, name: 'John D.', points: 1120, avatar: '👨' },
          ].map((user) => (
            <div
              key={user.rank}
              className={`flex items-center gap-3 p-3 rounded-lg ${
                user.rank === 1 ? 'bg-primary/10' : 'bg-muted'
              }`}
            >
              <span className="text-xl">{user.avatar}</span>
              <div className="flex-1">
                <p className="font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.points} points</p>
              </div>
              <span className="text-sm font-semibold text-muted-foreground">#{user.rank}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Badge Progress */}
      <Card className="p-4 rounded-xl" onClick={onViewBadges}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold flex items-center gap-2">
            <Award className="w-5 h-5 text-secondary" />
            Badge Progress
          </h3>
          <span className="text-xs text-primary">View All →</span>
        </div>
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm">Week Warrior</span>
              <span className="text-xs text-muted-foreground">7/7 days</span>
            </div>
            <Progress value={100} className="h-2" />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm">Quiz Master</span>
              <span className="text-xs text-muted-foreground">15/20 quizzes</span>
            </div>
            <Progress value={75} className="h-2" />
          </div>
        </div>
      </Card>
    </div>
  );
}


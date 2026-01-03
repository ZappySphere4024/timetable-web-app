import { Award, Lock, CircleCheck } from 'lucide-react';
import { Card } from './ui/card';
import { Progress } from './ui/progress';

interface BadgesScreenProps {
  onBack: () => void;
}

export function BadgesScreen({ onBack }: BadgesScreenProps) {
  const badges = [
    {
      id: 1,
      name: 'Week Warrior',
      description: 'Complete quizzes for 7 consecutive days',
      progress: 100,
      total: 7,
      unlocked: true,
      icon: '🔥',
    },
    {
      id: 2,
      name: 'Quiz Master',
      description: 'Complete 20 quizzes',
      progress: 75,
      total: 20,
      unlocked: false,
      icon: '🎯',
    },
    {
      id: 3,
      name: 'Perfect Score',
      description: 'Get 100% on any quiz',
      progress: 100,
      total: 1,
      unlocked: true,
      icon: '⭐',
    },
    {
      id: 4,
      name: 'Study Streak',
      description: 'Maintain a 30-day streak',
      progress: 23,
      total: 30,
      unlocked: false,
      icon: '⚡',
    },
    {
      id: 5,
      name: 'Top Scholar',
      description: 'Reach #1 on the leaderboard',
      progress: 100,
      total: 1,
      unlocked: true,
      icon: '👑',
    },
    {
      id: 6,
      name: 'Early Bird',
      description: 'Complete 10 quizzes before 9 AM',
      progress: 40,
      total: 10,
      unlocked: false,
      icon: '🌅',
    },
    {
      id: 7,
      name: 'Consistency King',
      description: 'Study for 100 hours total',
      progress: 67,
      total: 100,
      unlocked: false,
      icon: '📚',
    },
    {
      id: 8,
      name: 'Social Butterfly',
      description: 'Complete 5 quiz battles',
      progress: 60,
      total: 5,
      unlocked: false,
      icon: '🦋',
    },
    {
      id: 9,
      name: 'Achiever',
      description: 'Unlock 10 badges',
      progress: 30,
      total: 10,
      unlocked: false,
      icon: '🏆',
    },
  ];

  const unlockedCount = badges.filter(b => b.unlocked).length;

  return (
    <div className="min-h-screen bg-background px-4 py-6">
      {/* Header */}
      <button onClick={onBack} className="text-sm text-primary mb-6">
        ← Back
      </button>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-1">Badges & Rewards</h2>
        <p className="text-muted-foreground text-sm">
          {unlockedCount} of {badges.length} badges unlocked
        </p>
      </div>

      {/* Overall Progress */}
      <Card className="p-5 rounded-xl mb-6 bg-gradient-to-br from-primary/20 to-secondary/20">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-primary" />
            <span className="font-semibold">Your Progress</span>
          </div>
          <span className="text-sm text-muted-foreground">
            {Math.round((unlockedCount / badges.length) * 100)}%
          </span>
        </div>
        <Progress value={(unlockedCount / badges.length) * 100} className="h-2 mb-2" />
        <p className="text-xs text-muted-foreground">
          Keep going! You're doing great 🎉
        </p>
      </Card>

      {/* Badges Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {badges.map((badge) => (
          <Card
            key={badge.id}
            className={`p-4 rounded-xl relative ${
              badge.unlocked
                ? 'bg-accent/10 border-2 border-accent/50'
                : 'bg-muted'
            }`}
          >
            {/* Lock Icon for Locked Badges */}
            {!badge.unlocked && (
              <div className="absolute top-2 right-2">
                <Lock className="w-4 h-4 text-muted-foreground" />
              </div>
            )}

            {/* Check Icon for Unlocked Badges */}
            {badge.unlocked && (
              <div className="absolute top-2 right-2">
                <CircleCheck className="w-5 h-5 text-accent" />
              </div>
            )}

            {/* Badge Icon */}
            <div
              className={`text-4xl mb-2 ${
                !badge.unlocked ? 'opacity-40 grayscale' : ''
              }`}
            >
              {badge.icon}
            </div>

            {/* Badge Name */}
            <h4 className={`font-semibold mb-1 text-sm ${
              !badge.unlocked ? 'text-muted-foreground' : ''
            }`}>
              {badge.name}
            </h4>

            {/* Description */}
            <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
              {badge.description}
            </p>

            {/* Progress */}
            {!badge.unlocked && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">
                    {Math.round((badge.progress / badge.total) * 100)}%
                  </span>
                </div>
                <Progress value={(badge.progress / badge.total) * 100} className="h-1.5" />
              </div>
            )}

            {badge.unlocked && (
              <div className="flex items-center gap-1 text-xs text-accent">
                <CircleCheck className="w-3 h-3" />
                <span>Unlocked</span>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
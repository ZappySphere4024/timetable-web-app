import { Trophy, Zap, Medal } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';

export function LeaderboardScreen() {
  const leaderboard = [
    { rank: 1, name: 'You (Alex)', points: 1250, avatar: '🎯', weeklyGain: '+150', isCurrentUser: true },
    { rank: 2, name: 'Sarah Martinez', points: 1180, avatar: '👩', weeklyGain: '+120' },
    { rank: 3, name: 'John Davis', points: 1120, avatar: '👨', weeklyGain: '+95' },
    { rank: 4, name: 'Emma Wilson', points: 1050, avatar: '👧', weeklyGain: '+110' },
    { rank: 5, name: 'Michael Brown', points: 980, avatar: '🧑', weeklyGain: '+85' },
    { rank: 6, name: 'Olivia Taylor', points: 920, avatar: '👩‍🦰', weeklyGain: '+70' },
    { rank: 7, name: 'James Anderson', points: 860, avatar: '👨‍🦱', weeklyGain: '+60' },
    { rank: 8, name: 'Sophia Lee', points: 800, avatar: '👧‍🦱', weeklyGain: '+55' },
    { rank: 9, name: 'David White', points: 780, avatar: '👨🏻‍🦰', weeklyGain: '+45' },
    { rank: 10, name: 'Emily Clark', points: 750, avatar: '👩🏽‍🦱', weeklyGain: '+30' },
    { rank: 11, name: 'Daniel Lewis', points: 720, avatar: '🧑🏻‍🦰', weeklyGain: '+40' },
  ];

  const getMedalColor = (rank: number) => {
    if (rank === 1) return 'text-yellow-500';
    if (rank === 2) return 'text-slate-400';
    if (rank === 3) return 'text-yellow-600';
    return 'text-muted-foreground';
  };

  return (
    <div className="pb-24 pt-6 px-4 space-y-4 overflow-y-auto" style={{ height: 'calc(100vh - 5rem)' }}>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-1">Leaderboard</h2>
        <p className="text-muted-foreground text-sm">Compete with your friends</p>
      </div>

      {/* Your Rank Card */}
      <Card className="p-4 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary rounded-full p-3">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Your Rank</p>
              <p className="text-2xl font-bold text-primary">#1</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Total Points</p>
            <p className="text-2xl font-bold">1250</p>
          </div>
        </div>
      </Card>

      {/* Quiz Battle Button */}
      <Button className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 flex items-center justify-center gap-2">
        <Zap className="w-5 h-5" />
        Start Quiz Battle
      </Button>

      {/* Leaderboard List */}
      <div className="space-y-2">
        {leaderboard.map((user) => (
          <Card
            key={user.rank}
            className={`p-4 rounded-xl ${
              user.isCurrentUser
                ? 'bg-primary/10 border-2 border-primary/50'
                : 'bg-card'
            }`}
          >
            <div className="flex items-center gap-4">
              {/* Rank */}
              <div className="flex items-center justify-center w-8">
                {user.rank <= 3 ? (
                  <Medal className={`w-6 h-6 ${getMedalColor(user.rank)}`} />
                ) : (
                  <span className="text-lg font-semibold text-muted-foreground">
                    {user.rank}
                  </span>
                )}
              </div>

              {/* Avatar */}
              <div className="text-2xl">{user.avatar}</div>

              {/* User Info */}
              <div className="flex-1">
                <p className={`font-semibold ${user.isCurrentUser ? 'text-primary' : ''}`}>
                  {user.name}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-sm text-muted-foreground">{user.points} points</p>
                  <span className="text-xs text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                    {user.weeklyGain}
                  </span>
                </div>
              </div>

              {/* Rank Badge */}
              <div
                className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                  user.rank === 1
                    ? 'bg-yellow-100 text-yellow-700'
                    : user.rank === 2
                    ? 'bg-slate-100 text-slate-700'
                    : user.rank === 3
                    ? 'bg-yellow-200 text-yellow-800'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                #{user.rank}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

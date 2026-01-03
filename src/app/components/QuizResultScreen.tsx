import { CircleCheck, Flame, TrendingUp } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';

interface QuizResultScreenProps {
  score: number;
  totalQuestions: number;
  onBackToDashboard: () => void;
}

export function QuizResultScreen({ score, totalQuestions, onBackToDashboard }: QuizResultScreenProps) {
  const percentage = Math.round((score / totalQuestions) * 100);
  const streakMaintained = percentage >= 60;

  return (
    <div className="min-h-screen bg-background px-4 py-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-sm">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 rounded-full p-6">
            <CircleCheck className="w-20 h-20 text-green-500" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-2">Quiz Complete!</h2>
        <p className="text-center text-muted-foreground mb-8">
          Great job on completing today's quiz
        </p>

        {/* Results Card */}
        <Card className="p-6 rounded-xl shadow-sm mb-6">
          <div className="text-center mb-6">
            <div className="text-5xl font-bold text-primary mb-2">
              {score}/{totalQuestions}
            </div>
            <p className="text-sm text-muted-foreground">Correct Answers</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span className="text-2xl font-bold text-primary">{percentage}%</span>
              </div>
              <p className="text-xs text-muted-foreground">Accuracy</p>
            </div>

            <div className={`rounded-lg p-4 text-center ${
              streakMaintained ? 'bg-orange-50' : 'bg-gray-50'
            }`}>
              <div className="flex items-center justify-center gap-2 mb-1">
                <Flame className={`w-4 h-4 ${streakMaintained ? 'text-orange-500' : 'text-gray-400'}`} />
                <span className={`text-2xl font-bold ${
                  streakMaintained ? 'text-orange-500' : 'text-gray-400'
                }`}>
                  {streakMaintained ? '8' : '0'}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {streakMaintained ? 'Streak' : 'Lost'}
              </p>
            </div>
          </div>
        </Card>

        {/* Streak Message */}
        {streakMaintained && (
          <Card className="p-4 rounded-xl shadow-sm bg-gradient-to-br from-orange-50 to-yellow-50 mb-6">
            <div className="flex items-center gap-3">
              <Flame className="w-8 h-8 text-orange-500" />
              <div>
                <p className="font-semibold text-orange-700">Streak Maintained! 🎉</p>
                <p className="text-xs text-muted-foreground">
                  You've maintained your 8-day streak
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Points Earned */}
        <Card className="p-4 rounded-xl shadow-sm bg-primary text-white mb-6">
          <div className="text-center">
            <p className="text-sm mb-1 opacity-90">Points Earned</p>
            <p className="text-3xl font-bold">+{score * 10}</p>
          </div>
        </Card>

        {/* Action Button */}
        <Button
          onClick={onBackToDashboard}
          className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90"
        >
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
}
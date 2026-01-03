import { Flame, Brain } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';

interface QuizIntroScreenProps {
  onStartQuiz: () => void;
  onBack: () => void;
}

export function QuizIntroScreen({ onStartQuiz, onBack }: QuizIntroScreenProps) {
  return (
    <div className="min-h-screen bg-background px-4 py-6 flex flex-col">
      {/* Back Button */}
      <button onClick={onBack} className="text-sm text-primary mb-6">
        ← Back
      </button>

      {/* Current Streak */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <Card className="w-full max-w-sm p-8 rounded-xl bg-gradient-to-br from-accent/20 to-secondary/20 text-white text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-white/10 rounded-full p-6">
              <Flame className="w-16 h-16 text-accent" />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-2">7 Days</h2>
          <p className="text-sm text-white/80 mb-8">Current Streak</p>
          
          <div className="bg-white/10 rounded-lg p-4 mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Brain className="w-5 h-5 text-white" />
              <span className="font-semibold">Daily Quiz</span>
            </div>
            <p className="text-xs text-white/80">
              Complete today's quiz to maintain your streak
            </p>
          </div>

          <Button 
            onClick={onStartQuiz}
            className="w-full h-12 rounded-xl bg-white text-accent hover:bg-white/90"
          >
            Start Daily Quiz
          </Button>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 w-full max-w-sm mt-8">
          <Card className="p-4 rounded-xl text-center">
            <p className="text-2xl font-bold text-primary">95%</p>
            <p className="text-xs text-muted-foreground mt-1">Accuracy</p>
          </Card>
          <Card className="p-4 rounded-xl text-center">
            <p className="text-2xl font-bold text-primary">42</p>
            <p className="text-xs text-muted-foreground mt-1">Quizzes</p>
          </Card>
          <Card className="p-4 rounded-xl text-center">
            <p className="text-2xl font-bold text-accent">7</p>
            <p className="text-xs text-muted-foreground mt-1">Best Streak</p>
          </Card>
        </div>
      </div>
    </div>
  );
}

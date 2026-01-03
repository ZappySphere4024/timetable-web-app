import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Clock } from 'lucide-react';

interface QuizScreenProps {
  onComplete: (score: number) => void;
}

const questions = [
  {
    id: 1,
    question: 'What is the derivative of x² with respect to x?',
    options: ['2x', 'x', 'x²', '2x²'],
    correct: 0,
  },
  {
    id: 2,
    question: 'Which element has the chemical symbol "Au"?',
    options: ['Silver', 'Gold', 'Aluminum', 'Argon'],
    correct: 1,
  },
  {
    id: 3,
    question: 'What is the speed of light in vacuum?',
    options: ['3 × 10⁸ m/s', '3 × 10⁶ m/s', '3 × 10⁷ m/s', '3 × 10⁹ m/s'],
    correct: 0,
  },
  {
    id: 4,
    question: 'Who wrote "Romeo and Juliet"?',
    options: ['Charles Dickens', 'William Shakespeare', 'Jane Austen', 'Mark Twain'],
    correct: 1,
  },
  {
    id: 5,
    question: 'What is the binary representation of 8?',
    options: ['1000', '0100', '1100', '1010'],
    correct: 0,
  },
];

export function QuizScreen({ onComplete }: QuizScreenProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (timeLeft === 0) {
      handleNext();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleNext = () => {
    if (selectedAnswer === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setTimeLeft(30);
    } else {
      onComplete(score + (selectedAnswer === questions[currentQuestion].correct ? 1 : 0));
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-background px-4 py-6 flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-muted-foreground">Question {currentQuestion + 1} of {questions.length}</p>
          </div>
          <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow-sm">
            <Clock className="w-4 h-4 text-primary" />
            <span className="font-semibold">{timeLeft}s</span>
          </div>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card */}
      <Card className="flex-1 p-6 rounded-xl shadow-sm flex flex-col">
        <h3 className="text-xl font-semibold mb-8">
          {questions[currentQuestion].question}
        </h3>

        <div className="space-y-3 flex-1">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => setSelectedAnswer(index)}
              className={`w-full p-4 rounded-xl text-left transition-all ${
                selectedAnswer === index
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm ${
                    selectedAnswer === index
                      ? 'border-white bg-white text-primary'
                      : 'border-gray-300'
                  }`}
                >
                  {String.fromCharCode(65 + index)}
                </div>
                <span>{option}</span>
              </div>
            </button>
          ))}
        </div>

        <Button
          onClick={handleNext}
          disabled={selectedAnswer === null}
          className="w-full h-12 rounded-xl mt-6 bg-primary hover:bg-primary/90 disabled:opacity-50"
        >
          {currentQuestion + 1 === questions.length ? 'Finish Quiz' : 'Next Question'}
        </Button>
      </Card>
    </div>
  );
}

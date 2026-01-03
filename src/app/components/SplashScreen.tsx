import { useEffect } from 'react';
import { GraduationCap } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-primary flex flex-col items-center justify-center">
      <div className="animate-bounce mb-8">
        <GraduationCap className="w-24 h-24 text-white" />
      </div>
      <h1 className="text-white text-4xl font-semibold mb-2">EduChronix</h1>
      <p className="text-white/80 text-center px-8">
        Customizable Virtual Class Timetable Manager
      </p>
    </div>
  );
}

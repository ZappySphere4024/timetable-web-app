import { useState } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { LoginScreen } from './components/LoginScreen';
import { HomeScreen } from './components/HomeScreen';
import { TimetableScreen } from './components/TimetableScreen';
import { QuizIntroScreen } from './components/QuizIntroScreen';
import { QuizScreen } from './components/QuizScreen';
import { QuizResultScreen } from './components/QuizResultScreen';
import { LeaderboardScreen } from './components/LeaderboardScreen';
import { WeeklyAnalyticsScreen } from './components/WeeklyAnalyticsScreen';
import { BadgesScreen } from './components/BadgesScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { BottomNav } from './components/BottomNav';

type Screen =
  | 'splash'
  | 'login'
  | 'home'
  | 'timetable'
  | 'quiz-intro'
  | 'quiz'
  | 'quiz-result'
  | 'leaderboard'
  | 'analytics'
  | 'badges'
  | 'profile';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [activeTab, setActiveTab] = useState<'home' | 'timetable' | 'leaderboard' | 'profile'>('home');
  const [quizScore, setQuizScore] = useState(0);

  // Handle tab changes from bottom nav
  const handleTabChange = (tab: 'home' | 'timetable' | 'leaderboard' | 'profile') => {
    setActiveTab(tab);
    setCurrentScreen(tab);
  };

  // Handle quiz completion
  const handleQuizComplete = (score: number) => {
    setQuizScore(score);
    setCurrentScreen('quiz-result');
  };

  // Render the appropriate screen
  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onComplete={() => setCurrentScreen('login')} />;
      
      case 'login':
        return <LoginScreen onLogin={() => setCurrentScreen('home')} />;
      
      case 'home':
        return (
          <HomeScreen
            onStartQuiz={() => setCurrentScreen('quiz-intro')}
            onViewLeaderboard={() => {
              setActiveTab('leaderboard');
              setCurrentScreen('leaderboard');
            }}
            onViewBadges={() => setCurrentScreen('badges')}
          />
        );
      
      case 'timetable':
        return <TimetableScreen />;
      
      case 'quiz-intro':
        return (
          <QuizIntroScreen
            onStartQuiz={() => setCurrentScreen('quiz')}
            onBack={() => {
              setActiveTab('home');
              setCurrentScreen('home');
            }}
          />
        );
      
      case 'quiz':
        return <QuizScreen onComplete={handleQuizComplete} />;
      
      case 'quiz-result':
        return (
          <QuizResultScreen
            score={quizScore}
            totalQuestions={5}
            onBackToDashboard={() => {
              setActiveTab('home');
              setCurrentScreen('home');
            }}
          />
        );
      
      case 'leaderboard':
        return <LeaderboardScreen />;
      
      case 'analytics':
        return (
          <WeeklyAnalyticsScreen
            onBack={() => {
              setActiveTab('profile');
              setCurrentScreen('profile');
            }}
          />
        );
      
      case 'badges':
        return (
          <BadgesScreen
            onBack={() => {
              setActiveTab('home');
              setCurrentScreen('home');
            }}
          />
        );
      
      case 'profile':
        return <ProfileScreen onViewAnalytics={() => setCurrentScreen('analytics')} />;
      
      default:
        return null;
    }
  };

  // Show bottom nav only on main screens
  const showBottomNav = ['home', 'timetable', 'leaderboard', 'profile'].includes(currentScreen);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Container - iPhone 14 (390 × 844) */}
      <div className="max-w-[390px] mx-auto min-h-screen bg-background shadow-xl relative">
        {renderScreen()}
        {showBottomNav && <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />}
      </div>
    </div>
  );
}

export default App;
import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { GraduationCap } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-12">
          <div className="bg-primary rounded-2xl p-4 mb-4">
            <GraduationCap className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl font-semibold text-foreground mb-1">EduChronix</h1>
          <p className="text-muted-foreground text-sm text-center">
            Manage your academic schedule
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 rounded-xl bg-white border-gray-200"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 rounded-xl bg-white border-gray-200"
              required
            />
          </div>

          <Button 
            type="submit" 
            className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90"
          >
            Continue
          </Button>
        </form>
      </div>
    </div>
  );
}

// Global type definitions for Stashbox

export interface User {
  id: string;
  name: string;
  email?: string;
  totalSaved: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SavingsJar {
  id: string;
  type: 'quick' | 'safe' | 'grow' | 'custom';
  name: string;
  targetAmount?: number;
  currentAmount: number;
  duration: number; // in days
  apy: number;
  createdAt: Date;
  maturityDate: Date;
  isActive: boolean;
}

export interface Streak {
  currentStreak: number;
  longestStreak: number;
  lastSaveDate: Date;
  nextBadgeAt: number;
  badges: Badge[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
  requirement: number;
  type: 'streak' | 'amount' | 'frequency';
}

export interface Transaction {
  id: string;
  jarId: string;
  amount: number;
  type: 'deposit' | 'withdrawal' | 'interest';
  status: 'pending' | 'completed' | 'failed';
  createdAt: Date;
  description?: string;
}

export interface GenieSettings {
  isEnabled: boolean;
  roundUpEnabled: boolean;
  dailyReminderEnabled: boolean;
  reminderTime: string; // HH:MM format
  weeklyGoal: number;
}

// Component Props Types

export interface SavingsCardProps {
  title: string;
  subtitle: string;
  caption: string;
  background: string;
  onAction: () => void;
  animationDelay?: number;
  progress?: number;
  progressColor?: string;
  isGoalJar?: boolean;
  compact?: boolean;
}

export interface SavingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'quick' | 'safe' | 'grow' | 'custom';
}

export interface StreakCardProps {
  streak: Streak;
  className?: string;
}

// API Response Types

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface SavingsResponse {
  jars: SavingsJar[];
  totalSaved: number;
  totalEarnings: number;
}

// Animation Types

export type AnimationType = 
  | 'slide-up' 
  | 'bounce-gentle' 
  | 'sparkle' 
  | 'fluid-fill' 
  | 'confetti';

export interface AnimationConfig {
  type: AnimationType;
  duration?: number;
  delay?: number;
  infinite?: boolean;
}
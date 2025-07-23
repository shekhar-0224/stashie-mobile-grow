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
  type: 'quick' | 'safe' | 'grow' | 'custom' | 'betting';
  name: string;
  targetAmount?: number;
  currentAmount: number;
  duration: number; // in days
  apy: number;
  createdAt: Date;
  maturityDate: Date;
  isActive: boolean;
  // Betting jar specific fields
  betDescription?: string;
  winConditions?: string[];
  invitees?: string[];
  umaRequestId?: string;
  oracleStatus?: 'pending' | 'resolved' | 'disputed';
  oracleResult?: boolean | null;
  polymarketLink?: string;
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
  type: 'deposit' | 'withdrawal' | 'interest' | 'bet' | 'payout';
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
  type: 'quick' | 'safe' | 'grow' | 'custom' | 'betting';
}

export interface StreakCardProps {
  streak: Streak;
  className?: string;
}

// Betting Jar Types

export interface BettingJarData {
  description: string;
  selectedMarket: PolymarketMarket | null;
  selectedOutcome: PolymarketOutcome | null;
  amount: string;
  invitees: string[];
  openChallenge: boolean;
}

export interface PolymarketOutcome {
  id: string;
  title: string;
}

export interface PolymarketMarket {
  id: string;
  title: string;
  outcomes: PolymarketOutcome[];
  resolveTime: string;
}

export interface OracleRequest {
  id: string;
  identifier: string;
  timestamp: number;
  ancillaryData: string;
  currency: string;
  status: 'pending' | 'resolved' | 'disputed';
  result?: boolean;
  settlementTime?: number;
  polymarketId?: string;
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

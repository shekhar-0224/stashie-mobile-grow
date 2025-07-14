// Application constants for Stashbox

export const SAVINGS_JARS = {
  QUICK: {
    type: 'quick' as const,
    name: 'QuickSave',
    subtitle: 'QuickSave · 30 days',
    minDuration: 30,
    maxDuration: 365,
    defaultDuration: 30,
    apy: 4.5,
    penalty: '1%',
    color: 'hsl(var(--stashbox-blue))',
    progressColor: 'hsl(var(--stashbox-mint))'
  },
  SAFE: {
    type: 'safe' as const,
    name: 'SafeStack',
    subtitle: 'SafeStack · 90 days',
    minDuration: 60,
    maxDuration: 365,
    defaultDuration: 90,
    apy: 6.5,
    penalty: '2%',
    color: 'hsl(var(--stashbox-mint))',
    progressColor: 'hsl(var(--stashbox-orange))'
  },
  GROW: {
    type: 'grow' as const,
    name: 'GrowFund',
    subtitle: 'GrowFund · 180+ days',
    minDuration: 180,
    maxDuration: 730,
    defaultDuration: 180,
    apy: 8.0,
    penalty: '3%',
    color: 'hsl(var(--stashbox-orange))',
    progressColor: 'hsl(var(--stashbox-yellow))'
  },
  CUSTOM: {
    type: 'custom' as const,
    name: 'Goal Jar',
    subtitle: 'Custom Goal Jar',
    minDuration: 30,
    maxDuration: 365,
    defaultDuration: 90,
    apy: 0,
    penalty: null,
    color: 'hsl(var(--stashbox-purple))',
    progressColor: 'hsl(var(--stashbox-mint))'
  }
} as const;

export const STREAK_MILESTONES = [
  { days: 3, badge: '🔥', name: 'Getting Started' },
  { days: 7, badge: '⭐', name: 'Week Warrior' },
  { days: 14, badge: '💎', name: 'Two Week Titan' },
  { days: 30, badge: '🏆', name: 'Monthly Master' },
  { days: 60, badge: '👑', name: 'Savings Royalty' },
  { days: 100, badge: '🎯', name: 'Century Saver' }
];

export const DURATION_OPTIONS = [30, 90, 180, 365] as const;

export const ANIMATION_DELAYS = {
  FAST: 200,
  MEDIUM: 400,
  SLOW: 600,
  EXTRA_SLOW: 800
} as const;

export const HAPTIC_PATTERNS = {
  LIGHT: [50],
  MEDIUM: [100],
  SUCCESS: [50, 100, 50],
  CELEBRATION: [100, 50, 100, 50, 100]
} as const;

export const TOAST_MESSAGES = {
  DEPOSIT_SUCCESS: {
    title: '🎉 Saved!',
    description: 'Jar topped up. You\'re 1 step closer to your goal!'
  },
  STREAK_MILESTONE: {
    title: '🔥 Streak Milestone!',
    description: 'You\'ve unlocked a new badge!'
  },
  GOAL_CREATED: {
    title: '🎯 Goal Created!',
    description: 'Your custom savings goal is ready!'
  }
} as const;

export const ROUTES = {
  LOGIN: '/',
  HOME: '/home',
  NOT_FOUND: '*'
} as const;

export const LOCAL_STORAGE_KEYS = {
  USER: 'stashbox_user',
  SETTINGS: 'stashbox_settings',
  STREAK: 'stashbox_streak'
} as const;
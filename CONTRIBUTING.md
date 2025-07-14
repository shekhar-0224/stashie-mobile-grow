# Contributing to Stashbox

Thank you for your interest in contributing to Stashbox! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### Reporting Issues

1. **Search existing issues** first to avoid duplicates
2. **Use issue templates** when available
3. **Provide detailed information**:
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots/videos if applicable
   - Device/browser information

### Suggesting Features

1. **Check the roadmap** in README.md first
2. **Open a discussion** before creating an issue
3. **Describe the use case** and benefit
4. **Consider implementation complexity**

### Pull Requests

1. **Fork the repository**
2. **Create a feature branch** from `main`
3. **Make your changes** following our guidelines
4. **Test thoroughly** on mobile devices
5. **Update documentation** if needed
6. **Submit a pull request**

## 🛠️ Development Setup

### Prerequisites

- Node.js 18+
- npm/yarn/pnpm
- Git

### Getting Started

```bash
# Clone your fork
git clone https://github.com/your-username/stashbox.git
cd stashbox

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests (when available)
npm run test

# Build for production
npm run build
```

## 📝 Coding Standards

### TypeScript

- **Use TypeScript** for all new code
- **Define proper types** in `src/types/`
- **Avoid `any` type** unless absolutely necessary
- **Use interfaces** for object shapes
- **Export types** that might be reused

### React Components

- **Functional components** with hooks
- **Props interfaces** for all components
- **Default exports** for components
- **Descriptive naming** (PascalCase)
- **JSX.Element** return type when needed

```tsx
// Good
interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export default function Button({ onClick, disabled = false, children }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
```

### Styling

- **Tailwind CSS** for styling
- **Design system tokens** from `index.css`
- **Mobile-first** approach
- **Semantic color names** (not direct colors)
- **Consistent spacing** using Tailwind scale

```tsx
// Good - Using design system
<div className="bg-stashbox-mint text-stashbox-text rounded-stashbox p-4">

// Bad - Direct colors
<div className="bg-green-200 text-gray-800 rounded-3xl p-4">
```

### File Organization

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Base UI components (shadcn)
│   └── [ComponentName]/ # Feature components
├── pages/               # Page components
├── hooks/               # Custom React hooks
├── utils/               # Utility functions
├── types/               # TypeScript type definitions
├── constants/           # App constants
└── lib/                 # Third-party integrations
```

### Naming Conventions

- **Components**: PascalCase (`SavingsCard.tsx`)
- **Hooks**: camelCase with `use` prefix (`useLocalStorage.ts`)
- **Utilities**: camelCase (`formatCurrency.ts`)
- **Constants**: UPPER_SNAKE_CASE (`SAVINGS_JARS`)
- **Types**: PascalCase (`SavingsJar`, `UserProfile`)

## 🎨 Design Guidelines

### Mobile-First Design

- **Start with mobile** (320px width)
- **Touch-friendly** targets (44px minimum)
- **Thumb-reachable** navigation
- **Progressive enhancement** for larger screens

### Animation Principles

- **Purposeful animations** that enhance UX
- **60fps performance** using CSS transforms
- **Reduced motion** respect for accessibility
- **Consistent timing** using design system values

### Accessibility

- **Semantic HTML** elements
- **ARIA labels** where needed
- **Keyboard navigation** support
- **Color contrast** meeting WCAG guidelines
- **Screen reader** compatibility

## 🧪 Testing

### Component Testing

- **Test user interactions** not implementation
- **Mock external dependencies**
- **Test accessibility** features
- **Mobile-specific** testing

### Manual Testing

- **Test on real devices** when possible
- **Various screen sizes** (phone, tablet)
- **Different browsers** (Chrome, Safari, Firefox)
- **Network conditions** (slow 3G)

## 📱 Mobile-Specific Guidelines

### Performance

- **Optimize images** for mobile
- **Minimize bundle size**
- **Lazy load** non-critical components
- **Cache static assets**

### User Experience

- **Thumb navigation** zones
- **Haptic feedback** for interactions
- **Loading states** for slow networks
- **Offline graceful degradation**

## 🚀 Deployment

### Build Process

```bash
# Production build
npm run build

# Test production build locally
npm run preview
```

### Environment Considerations

- **No environment variables** for frontend-only features
- **Public URL paths** for assets
- **Base URL** configuration for subdirectory deployment

## 📋 Commit Guidelines

### Commit Message Format

```
type(scope): description

[optional body]

[optional footer]
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```bash
feat(savings): add custom goal jar creation
fix(modal): resolve mobile keyboard overlap
docs(readme): update installation instructions
style(components): improve responsive spacing
```

## 🐛 Debugging

### Development Tools

- **React DevTools** for component inspection
- **Browser DevTools** for mobile simulation
- **Network tab** for performance analysis
- **Console logs** for debugging (remove before PR)

### Common Issues

- **Hydration errors**: Check SSR compatibility
- **Mobile viewport**: Ensure proper meta tag
- **Touch events**: Use appropriate event handlers
- **Animation performance**: Use CSS transforms

## 📚 Resources

### Documentation

- [React Documentation](https://reactjs.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)

### Design Inspiration

- [Duolingo](https://www.duolingo.com/) - Gamification patterns
- [Figma Design System](https://www.figma.com/community)
- [Mobile Design Patterns](https://mobbin.design/)

## ❓ Questions?

- **GitHub Discussions** for general questions
- **GitHub Issues** for bug reports
- **Discord/Slack** if available

Thank you for contributing to Stashbox! 🏦✨

# 🌱 Stashbox - Smart Savings Application

A modern, gamified savings application built with React, TypeScript, and Tailwind CSS that helps users save money through engaging features like savings jars, streaks, and social sharing.

## 🚀 Product Overview

Stashbox transforms saving money into an engaging, social experience with:

- **Multiple Saving Jar Types**: QuickSave (30 days), SafeStack (90 days), GrowFund (180+ days), Custom Goals, and Betting Jars
- **Gamification**: Streak tracking, badges, and milestone rewards
- **Social Features**: Shared savings jars where friends can contribute
- **Smart Growth**: Different risk levels with expected returns (Conservative 3%, Moderate 6%, Aggressive 9%)
- **User-Friendly**: Intuitive interface with animations and haptic feedback

## 🛠️ Technical Stack

### Frontend
- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite for fast development and building
- **Styling**: Tailwind CSS with custom design tokens
- **UI Components**: Shadcn/ui component library
- **Icons**: Lucide React
- **Animations**: CSS animations with Tailwind utilities
- **State Management**: React hooks and context
- **Internationalization**: i18next for multi-language support

### Development Tools
- **Package Manager**: npm
- **TypeScript**: Strict type checking
- **ESLint**: Code linting and formatting
- **Responsive Design**: Mobile-first approach

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (shadcn)
│   ├── SavingsModal.tsx     # Main savings jar creation modal
│   ├── AmountInput.tsx      # Validated amount input component
│   ├── GrowthStrategySelector.tsx  # Risk level selector
│   ├── ExpectedReturns.tsx  # Returns calculation display
│   ├── JarSuccessModal.tsx  # Success animation modal
│   └── ...
├── types/              # TypeScript type definitions
├── constants/          # Application constants
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── pages/              # Page components
└── utils/              # Helper functions
```

## 🏗️ Development Setup

### Prerequisites
- Node.js 18+ and npm
- Git for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd stashbox
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:5173`
   - The app will reload automatically on file changes

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🎯 Key Features Implementation

### Savings Jars
- **QuickSave**: 30-day commitment, 4.5% APY
- **SafeStack**: 90-day commitment, 6.5% APY  
- **GrowFund**: 180+ day commitment, 8.0% APY
- **Custom Goals**: User-defined duration and risk level
- **Betting Jars**: Social betting with pooled funds

### Input Validation
- Amount inputs limited to $100 maximum
- Numeric-only validation with decimal support
- Quick "Max" button for maximum amount selection
- Real-time validation feedback

### Growth Strategies
- **Conservative**: 3% APY with green plant icon
- **Moderate**: 6% APY with yellow plant icon  
- **Aggressive**: 9% APY with orange plant icon
- Visual slider for easy selection

### Expected Returns Calculator
- Real-time calculation based on amount, duration, and APY
- Shows total return, profit amount, and percentage gain
- Updates automatically as inputs change

## 🎨 Design System

### Colors (HSL Format)
```css
--stashbox-mint: 142 69% 58%
--stashbox-blue: 200 95% 45%
--stashbox-orange: 25 95% 53%
--stashbox-yellow: 48 96% 53%
--stashbox-purple: 262 83% 58%
```

### Typography
- Primary font: System fonts with fallbacks
- Responsive text sizes using Tailwind utilities
- Consistent spacing and line heights

### Animations
- Smooth transitions using Tailwind CSS
- Custom keyframe animations for special effects
- Haptic feedback on mobile devices

## 🔒 Type Safety

Comprehensive TypeScript interfaces ensure type safety:

- `SavingsJar`: Savings jar data structure
- `SavingsModalProps`: Modal component props
- `User`: User profile information
- `Transaction`: Financial transaction data
- `Badge`: Achievement system types

## 📱 Responsive Design

- **Mobile-first**: Optimized for mobile devices
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Touch-friendly**: Large tap targets and gesture support
- **Cross-browser**: Compatible with modern browsers

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Deployment Platforms
- **Recommended**: Vercel, Netlify, or GitHub Pages
- **Requirements**: Static hosting with SPA support
- **Build Output**: `dist/` directory

### Environment Configuration
- No environment variables required for basic functionality
- Optional: Analytics, error tracking, or backend integration

## 🧪 Testing Strategy

### Component Testing
- Test individual components in isolation
- Verify prop handling and user interactions
- Validate accessibility features

### Integration Testing  
- Test complete user flows
- Verify modal interactions and state management
- Test form validation and submission

### Manual Testing Checklist
- [ ] All savings jar types create successfully
- [ ] Amount validation works correctly (max $100)
- [ ] Expected returns calculate accurately
- [ ] Animations and transitions work smoothly
- [ ] Mobile responsiveness functions properly

## 🔧 Troubleshooting

### Common Issues

1. **Build Errors**
   - Ensure all imports use correct paths
   - Check TypeScript type definitions
   - Verify all dependencies are installed

2. **Styling Issues**
   - Confirm Tailwind CSS is properly configured
   - Check for conflicting CSS classes
   - Verify custom CSS variables are defined

3. **Component Errors**
   - Ensure proper prop types are passed
   - Check for missing key props in lists
   - Verify component imports are correct

### Performance Optimization
- Lazy load components when possible
- Optimize images and assets
- Minimize bundle size with tree shaking
- Use React.memo for expensive components

## 🤝 Contributing

### Code Standards
- Follow TypeScript strict mode
- Use meaningful variable and function names
- Implement proper error handling
- Write clear commit messages

### Component Guidelines
- Keep components small and focused (< 100 lines)
- Extract reusable logic into custom hooks
- Use proper TypeScript interfaces
- Follow accessibility best practices

### Pull Request Process
1. Create feature branch from main
2. Implement changes with tests
3. Update documentation if needed
4. Submit PR with clear description

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For technical support or questions:
- Create an issue in the repository
- Check the troubleshooting section
- Review the component documentation

---

**Built with ❤️ using modern web technologies**

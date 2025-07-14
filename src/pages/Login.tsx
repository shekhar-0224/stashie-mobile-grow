import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Login = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Pick a Jar",
      description: "Choose how you want to save — short-term, long-term, or a custom goal.",
      visual: "jar-selection"
    },
    {
      title: "Save & Earn",
      description: "Add money anytime, earn fixed returns, and grow your stash.",
      visual: "coin-drop"
    },
    {
      title: "Hit Streaks & Unlock Badges",
      description: "Save daily, hit milestones, and unlock rewards with Genie Mode.",
      visual: "streaks-badges"
    }
  ];

  // Auto-advance carousel every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const handleGetStarted = () => {
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-stashbox-cream flex flex-col">
      <div className="max-w-md mx-auto flex-1 flex flex-col">
        
        {/* Header */}
        <div className="pt-12 pb-6 text-center">
          <div className="flex items-center justify-center space-x-3">
            <img 
              src="/lovable-uploads/da7d41e5-363b-4f62-8f48-6bb81deaa23b.png" 
              alt="Stashie" 
              className="w-10 h-10"
            />
            <h1 className="text-2xl font-bold text-stashbox-text">Stashbox</h1>
          </div>
          <p className="text-lg text-stashbox-text mt-2 font-medium">Save in 3 easy steps</p>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 px-6 overflow-hidden">
          <div 
            className="flex transition-transform duration-700 ease-out h-full"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div key={index} className="w-full flex-shrink-0 flex flex-col items-center justify-center text-center px-4">
                
                {/* Large Visual Area */}
                <div className="w-full h-80 flex items-center justify-center mb-8">
                  {slide.visual === "jar-selection" && (
                    <div className="relative">
                      {/* Main Stashie character */}
                      <div className="mb-6">
                        <img 
                          src="/lovable-uploads/da7d41e5-363b-4f62-8f48-6bb81deaa23b.png" 
                          alt="Stashie" 
                          className="w-24 h-24 mx-auto animate-bounce-gentle"
                        />
                      </div>
                      
                      {/* Three jars */}
                      <div className="flex justify-center space-x-4">
                        <div className="text-center">
                          <div className="w-16 h-20 bg-stashbox-blue rounded-stashbox mb-2 flex items-end justify-center relative overflow-hidden">
                            <div className="w-full h-1/2 bg-stashbox-mint rounded-b-stashbox"></div>
                            <span className="absolute top-2 text-xs font-bold text-stashbox-text">30d</span>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="w-16 h-20 bg-stashbox-mint rounded-stashbox mb-2 flex items-end justify-center relative overflow-hidden">
                            <div className="w-full h-3/4 bg-stashbox-orange rounded-b-stashbox"></div>
                            <span className="absolute top-2 text-xs font-bold text-stashbox-text">90d</span>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="w-16 h-20 bg-stashbox-orange rounded-stashbox mb-2 flex items-end justify-center relative overflow-hidden">
                            <div className="w-full h-1/4 bg-stashbox-yellow rounded-b-stashbox"></div>
                            <span className="absolute top-2 text-xs font-bold text-stashbox-text">Goal</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {slide.visual === "coin-drop" && (
                    <div className="relative">
                      {/* Coin dropping animation */}
                      <div className="mb-4 relative">
                        <div className="w-8 h-8 bg-stashbox-yellow rounded-full animate-bounce-gentle mx-auto mb-4"></div>
                        <div className="flex justify-center">
                          <div className="w-3 h-16 bg-gradient-to-b from-stashbox-yellow/50 to-transparent rounded-full"></div>
                        </div>
                      </div>
                      
                      {/* Large Stashie jar */}
                      <div className="relative">
                        <img 
                          src="/lovable-uploads/da7d41e5-363b-4f62-8f48-6bb81deaa23b.png" 
                          alt="Stashie" 
                          className="w-32 h-32 mx-auto"
                        />
                        
                        {/* Progress bar */}
                        <div className="w-40 h-3 bg-stashbox-cream rounded-full mt-4 mx-auto overflow-hidden">
                          <div className="w-3/4 h-full bg-stashbox-mint rounded-full animate-fluid-fill"></div>
                        </div>
                        
                        {/* Return percentage */}
                        <div className="mt-3 text-xl font-bold text-stashbox-text">+6.5% APY</div>
                      </div>
                    </div>
                  )}

                  {slide.visual === "streaks-badges" && (
                    <div className="relative">
                      {/* Streak flame */}
                      <div className="mb-6 relative">
                        <div className="text-6xl animate-bounce-gentle">🔥</div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-stashbox-orange rounded-full flex items-center justify-center text-white font-bold text-sm">7</div>
                      </div>
                      
                      {/* Celebrating Stashie */}
                      <div className="relative">
                        <img 
                          src="/lovable-uploads/da7d41e5-363b-4f62-8f48-6bb81deaa23b.png" 
                          alt="Celebrating Stashie" 
                          className="w-24 h-24 mx-auto animate-sparkle"
                        />
                        
                        {/* Badge */}
                        <div className="absolute -top-4 -right-4 w-12 h-12 bg-stashbox-yellow rounded-full flex items-center justify-center text-2xl animate-bounce-gentle">
                          🏆
                        </div>
                      </div>
                      
                      {/* Confetti */}
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-4 left-8 text-2xl animate-sparkle">✨</div>
                        <div className="absolute top-8 right-12 text-2xl animate-sparkle" style={{ animationDelay: '0.3s' }}>🎉</div>
                        <div className="absolute bottom-16 left-12 text-2xl animate-sparkle" style={{ animationDelay: '0.6s' }}>⭐</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Text Content */}
                <div className="space-y-4 max-w-sm">
                  <h2 className="text-2xl font-bold text-stashbox-text">
                    {slide.title}
                  </h2>
                  <p className="text-stashbox-text/70 text-base leading-relaxed">
                    {slide.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center space-x-2 mb-6">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentSlide === index 
                  ? 'bg-stashbox-text w-6' 
                  : 'bg-stashbox-text/30'
              }`}
            />
          ))}
        </div>

        {/* Static CTA Button */}
        <div className="px-6 pb-8">
          <Button
            onClick={handleGetStarted}
            className="w-full bg-stashbox-mint text-stashbox-text hover:bg-stashbox-mint/90 font-bold py-4 px-8 rounded-stashbox text-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-3"
          >
            <img 
              src="/lovable-uploads/da7d41e5-363b-4f62-8f48-6bb81deaa23b.png" 
              alt="Stashie" 
              className="w-6 h-6"
            />
            <span>Get Started</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
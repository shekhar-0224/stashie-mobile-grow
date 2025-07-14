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
      <div className="w-full max-w-sm mx-auto flex-1 flex flex-col">
        
        {/* Header */}
        <div className="pt-8 pb-4 text-center px-6">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <img 
              src="/lovable-uploads/da7d41e5-363b-4f62-8f48-6bb81deaa23b.png" 
              alt="Stashie" 
              className="w-8 h-8"
            />
            <h1 className="text-xl font-bold text-stashbox-text">Stashbox</h1>
          </div>
          <p className="text-sm text-stashbox-text/70 font-medium">Save in 3 easy steps</p>
        </div>

        {/* Main Content Area - Full Screen Slides */}
        <div className="flex-1 overflow-hidden">
          <div 
            className="flex transition-transform duration-700 ease-out h-full"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div key={index} className="w-full flex-shrink-0 flex flex-col h-full px-6">
                
                {/* Large Visual Area - Takes most of the screen */}
                <div className="flex-1 flex items-center justify-center py-8">
                  {slide.visual === "jar-selection" && (
                    <div className="text-center">
                      {/* Main Stashie character */}
                      <div className="mb-8">
                        <img 
                          src="/lovable-uploads/da7d41e5-363b-4f62-8f48-6bb81deaa23b.png" 
                          alt="Stashie" 
                          className="w-20 h-20 mx-auto animate-bounce-gentle"
                        />
                      </div>
                      
                      {/* Three jars - Mobile optimized */}
                      <div className="flex justify-center space-x-6">
                        <div className="text-center">
                          <div className="w-12 h-16 bg-stashbox-blue rounded-2xl mb-2 flex items-end justify-center relative overflow-hidden shadow-sm">
                            <div className="w-full h-1/2 bg-stashbox-mint rounded-b-2xl transition-all duration-1000"></div>
                            <span className="absolute top-1 text-xs font-bold text-stashbox-text">30d</span>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="w-12 h-16 bg-stashbox-mint rounded-2xl mb-2 flex items-end justify-center relative overflow-hidden shadow-sm">
                            <div className="w-full h-3/4 bg-stashbox-orange rounded-b-2xl transition-all duration-1000"></div>
                            <span className="absolute top-1 text-xs font-bold text-stashbox-text">90d</span>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="w-12 h-16 bg-stashbox-orange rounded-2xl mb-2 flex items-end justify-center relative overflow-hidden shadow-sm">
                            <div className="w-full h-1/4 bg-stashbox-yellow rounded-b-2xl transition-all duration-1000"></div>
                            <span className="absolute top-1 text-xs font-bold text-stashbox-text">Goal</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {slide.visual === "coin-drop" && (
                    <div className="text-center">
                      {/* Coin dropping animation */}
                      <div className="mb-6">
                        <div className="w-6 h-6 bg-stashbox-yellow rounded-full animate-bounce mx-auto mb-4 shadow-sm"></div>
                        <div className="flex justify-center">
                          <div className="w-1 h-12 bg-gradient-to-b from-stashbox-yellow/60 to-transparent rounded-full"></div>
                        </div>
                      </div>
                      
                      {/* Large Stashie jar */}
                      <div className="space-y-4">
                        <img 
                          src="/lovable-uploads/da7d41e5-363b-4f62-8f48-6bb81deaa23b.png" 
                          alt="Stashie" 
                          className="w-24 h-24 mx-auto"
                        />
                        
                        {/* Return percentage - More prominent */}
                        <div className="text-2xl font-bold text-stashbox-text">+6.5% APY</div>
                        
                        {/* Progress bar */}
                        <div className="w-32 h-2 bg-stashbox-cream/50 rounded-full mx-auto overflow-hidden">
                          <div className="w-3/4 h-full bg-stashbox-mint rounded-full animate-fluid-fill"></div>
                        </div>
                      </div>
                    </div>
                  )}

                  {slide.visual === "streaks-badges" && (
                    <div className="text-center">
                      {/* Streak flame */}
                      <div className="mb-6 relative inline-block">
                        <div className="text-5xl animate-bounce-gentle">🔥</div>
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-stashbox-orange rounded-full flex items-center justify-center text-white font-bold text-xs">7</div>
                      </div>
                      
                      {/* Celebrating Stashie */}
                      <div className="relative inline-block mb-4">
                        <img 
                          src="/lovable-uploads/da7d41e5-363b-4f62-8f48-6bb81deaa23b.png" 
                          alt="Celebrating Stashie" 
                          className="w-20 h-20 animate-sparkle"
                        />
                        
                        {/* Badge */}
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-stashbox-yellow rounded-full flex items-center justify-center text-lg animate-bounce-gentle">
                          🏆
                        </div>
                      </div>
                      
                      {/* Confetti */}
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-8 left-16 text-xl animate-sparkle">✨</div>
                        <div className="absolute top-12 right-16 text-xl animate-sparkle" style={{ animationDelay: '0.3s' }}>🎉</div>
                        <div className="absolute bottom-32 left-20 text-xl animate-sparkle" style={{ animationDelay: '0.6s' }}>⭐</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Text Content - Fixed at bottom */}
                <div className="pb-6 text-center space-y-3">
                  <h2 className="text-xl font-bold text-stashbox-text leading-tight">
                    {slide.title}
                  </h2>
                  <p className="text-stashbox-text/70 text-sm leading-relaxed px-4">
                    {slide.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center space-x-2 pb-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentSlide === index 
                  ? 'bg-stashbox-text w-6' 
                  : 'bg-stashbox-text/30 w-1.5'
              }`}
            />
          ))}
        </div>

        {/* Static CTA Button */}
        <div className="px-6 pb-6">
          <Button
            onClick={handleGetStarted}
            className="w-full bg-stashbox-mint text-stashbox-text hover:bg-stashbox-mint/90 font-bold py-4 rounded-3xl text-base transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center space-x-2 shadow-sm"
          >
            <img 
              src="/lovable-uploads/da7d41e5-363b-4f62-8f48-6bb81deaa23b.png" 
              alt="Stashie" 
              className="w-5 h-5"
            />
            <span>Get Started</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
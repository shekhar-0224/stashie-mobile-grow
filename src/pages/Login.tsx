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
                <div className="flex-1 flex items-center justify-center py-4">
                  {slide.visual === "jar-selection" && (
                    <div className="text-center w-full">
                      {/* Main Stashie character - Much bigger */}
                      <div className="mb-12">
                        <div className="relative inline-block">
                          <img 
                            src="/lovable-uploads/da7d41e5-363b-4f62-8f48-6bb81deaa23b.png" 
                            alt="Stashie" 
                            className="w-32 h-32 mx-auto animate-bounce-gentle drop-shadow-lg"
                          />
                          {/* Floating sparkles around Stashie */}
                          <div className="absolute -top-4 -left-4 text-2xl animate-sparkle">✨</div>
                          <div className="absolute -top-2 -right-6 text-xl animate-sparkle" style={{ animationDelay: '0.5s' }}>💫</div>
                          <div className="absolute -bottom-2 -left-6 text-xl animate-sparkle" style={{ animationDelay: '1s' }}>⭐</div>
                        </div>
                      </div>
                      
                      {/* Three jars - Much bigger and more colorful */}
                      <div className="flex justify-center space-x-8">
                        <div className="text-center">
                          <div className="w-20 h-28 bg-gradient-to-b from-blue-300 to-blue-400 rounded-3xl mb-3 flex items-end justify-center relative overflow-hidden shadow-lg transform hover:scale-105 transition-transform">
                            <div className="w-full h-1/2 bg-gradient-to-t from-green-300 to-green-200 rounded-b-3xl transition-all duration-1000 animate-pulse"></div>
                            <span className="absolute top-2 text-sm font-bold text-blue-800 bg-white/80 px-2 py-1 rounded-full">30d</span>
                            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 text-xs">💰</div>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="w-20 h-28 bg-gradient-to-b from-green-300 to-green-400 rounded-3xl mb-3 flex items-end justify-center relative overflow-hidden shadow-lg transform hover:scale-105 transition-transform">
                            <div className="w-full h-3/4 bg-gradient-to-t from-orange-300 to-orange-200 rounded-b-3xl transition-all duration-1000 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                            <span className="absolute top-2 text-sm font-bold text-green-800 bg-white/80 px-2 py-1 rounded-full">90d</span>
                            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 text-xs">💎</div>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="w-20 h-28 bg-gradient-to-b from-orange-300 to-orange-400 rounded-3xl mb-3 flex items-end justify-center relative overflow-hidden shadow-lg transform hover:scale-105 transition-transform">
                            <div className="w-full h-1/4 bg-gradient-to-t from-yellow-300 to-yellow-200 rounded-b-3xl transition-all duration-1000 animate-pulse" style={{ animationDelay: '1s' }}></div>
                            <span className="absolute top-2 text-sm font-bold text-orange-800 bg-white/80 px-2 py-1 rounded-full">Goal</span>
                            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 text-xs">🎯</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Add floating elements around */}
                      <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        <div className="absolute top-20 left-8 text-3xl animate-bounce" style={{ animationDelay: '0.3s' }}>💰</div>
                        <div className="absolute top-32 right-12 text-2xl animate-bounce" style={{ animationDelay: '0.8s' }}>📈</div>
                        <div className="absolute bottom-20 left-12 text-2xl animate-bounce" style={{ animationDelay: '1.2s' }}>🎉</div>
                      </div>
                    </div>
                  )}

                  {slide.visual === "coin-drop" && (
                    <div className="text-center w-full relative">
                      {/* Multiple coins dropping - More dynamic */}
                      <div className="mb-8 relative">
                        <div className="absolute left-1/2 transform -translate-x-1/2">
                          <div className="w-8 h-8 bg-gradient-to-b from-yellow-300 to-yellow-500 rounded-full animate-bounce mx-auto mb-2 shadow-lg"></div>
                          <div className="w-6 h-6 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-full animate-bounce mx-auto mb-2 shadow-lg" style={{ animationDelay: '0.3s' }}></div>
                          <div className="w-4 h-4 bg-gradient-to-b from-yellow-500 to-yellow-700 rounded-full animate-bounce mx-auto mb-2 shadow-lg" style={{ animationDelay: '0.6s' }}></div>
                        </div>
                        <div className="flex justify-center mt-16">
                          <div className="w-2 h-20 bg-gradient-to-b from-yellow-400/80 to-transparent rounded-full"></div>
                        </div>
                      </div>
                      
                      {/* Huge Stashie jar with glow effect */}
                      <div className="space-y-6 relative">
                        <div className="relative inline-block">
                          <img 
                            src="/lovable-uploads/da7d41e5-363b-4f62-8f48-6bb81deaa23b.png" 
                            alt="Stashie" 
                            className="w-40 h-40 drop-shadow-2xl animate-pulse"
                          />
                          {/* Glow effect */}
                          <div className="absolute inset-0 bg-green-200 rounded-full blur-xl opacity-30 scale-110 animate-pulse"></div>
                        </div>
                        
                        {/* Return percentage - Huge and glowing */}
                        <div className="relative">
                          <div className="text-4xl font-black text-green-600 drop-shadow-lg">+6.5% APY</div>
                          <div className="absolute inset-0 text-4xl font-black text-green-300 blur-sm">+6.5% APY</div>
                        </div>
                        
                        {/* Progress bar - Much bigger */}
                        <div className="w-48 h-4 bg-gray-200 rounded-full mx-auto overflow-hidden shadow-inner">
                          <div className="w-3/4 h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full animate-fluid-fill shadow-lg"></div>
                        </div>
                      </div>
                      
                      {/* Floating money symbols */}
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-12 left-16 text-2xl animate-bounce">💵</div>
                        <div className="absolute top-20 right-16 text-2xl animate-bounce" style={{ animationDelay: '0.4s' }}>💸</div>
                        <div className="absolute bottom-24 left-20 text-2xl animate-bounce" style={{ animationDelay: '0.8s' }}>💰</div>
                        <div className="absolute bottom-32 right-20 text-2xl animate-bounce" style={{ animationDelay: '1.2s' }}>📊</div>
                      </div>
                    </div>
                  )}

                  {slide.visual === "streaks-badges" && (
                    <div className="text-center w-full relative">
                      {/* Huge streak flame with effects */}
                      <div className="mb-8 relative inline-block">
                        <div className="text-8xl animate-bounce-gentle filter drop-shadow-lg">🔥</div>
                        <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-black text-lg shadow-lg animate-pulse">7</div>
                        {/* Fire particles */}
                        <div className="absolute -top-4 left-4 text-2xl animate-sparkle">💥</div>
                        <div className="absolute -top-2 right-8 text-xl animate-sparkle" style={{ animationDelay: '0.3s' }}>⚡</div>
                      </div>
                      
                      {/* Celebrating Stashie - Much bigger */}
                      <div className="relative inline-block mb-6">
                        <img 
                          src="/lovable-uploads/da7d41e5-363b-4f62-8f48-6bb81deaa23b.png" 
                          alt="Celebrating Stashie" 
                          className="w-32 h-32 animate-sparkle drop-shadow-2xl"
                        />
                        
                        {/* Multiple badges floating around */}
                        <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center text-2xl animate-bounce-gentle shadow-lg">🏆</div>
                        <div className="absolute -top-2 -left-6 w-10 h-10 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full flex items-center justify-center text-xl animate-bounce-gentle shadow-lg" style={{ animationDelay: '0.3s' }}>🥇</div>
                        <div className="absolute -bottom-2 -right-6 w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center text-lg animate-bounce-gentle shadow-lg" style={{ animationDelay: '0.6s' }}>⭐</div>
                        
                        {/* Celebration glow */}
                        <div className="absolute inset-0 bg-yellow-200 rounded-full blur-2xl opacity-20 scale-150 animate-pulse"></div>
                      </div>
                      
                      {/* Massive confetti explosion */}
                      <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        <div className="absolute top-8 left-12 text-3xl animate-bounce">🎊</div>
                        <div className="absolute top-16 right-8 text-3xl animate-bounce" style={{ animationDelay: '0.2s' }}>🎉</div>
                        <div className="absolute top-24 left-20 text-2xl animate-bounce" style={{ animationDelay: '0.4s' }}>✨</div>
                        <div className="absolute top-32 right-16 text-2xl animate-bounce" style={{ animationDelay: '0.6s' }}>🌟</div>
                        <div className="absolute bottom-28 left-8 text-3xl animate-bounce" style={{ animationDelay: '0.8s' }}>🎊</div>
                        <div className="absolute bottom-36 right-12 text-2xl animate-bounce" style={{ animationDelay: '1s' }}>💫</div>
                        <div className="absolute bottom-20 left-16 text-2xl animate-bounce" style={{ animationDelay: '1.2s' }}>⭐</div>
                        <div className="absolute bottom-32 right-20 text-2xl animate-bounce" style={{ animationDelay: '1.4s' }}>🎉</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Text Content - Fixed at bottom */}
                <div className="pb-4 text-center space-y-2">
                  <h2 className="text-2xl font-black text-stashbox-text leading-tight">
                    {slide.title}
                  </h2>
                  <p className="text-stashbox-text/80 text-sm leading-relaxed px-2 font-medium">
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
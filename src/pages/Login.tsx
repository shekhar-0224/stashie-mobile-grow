import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      background: "hsl(var(--stashbox-blue))",
      icon: "/lovable-uploads/da7d41e5-363b-4f62-8f48-6bb81deaa23b.png",
      title: "Pick a Jar, Start Saving",
      description: "Choose a plan that fits you — short-term, long-term, or custom goals."
    },
    {
      background: "hsl(var(--stashbox-mint))",
      icon: "/lovable-uploads/da7d41e5-363b-4f62-8f48-6bb81deaa23b.png",
      title: "Earn Streaks & Rewards",
      description: "Get rewarded for daily saves, hit milestones, and unlock badges!"
    },
    {
      background: "hsl(var(--stashbox-orange))",
      icon: "/lovable-uploads/da7d41e5-363b-4f62-8f48-6bb81deaa23b.png",
      title: "Let Genie Auto-Save for You",
      description: "Genie watches your expenses & nudges you to stash a little extra daily.",
      hasButton: true
    }
  ];

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        if (prev === slides.length - 1) return prev; // Stop on last slide
        return prev + 1;
      });
    }, 3200);

    return () => clearInterval(interval);
  }, [slides.length]);

  const handleLogin = () => {
    // Bypass login for now - navigate directly to home
    navigate("/home");
  };

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="min-h-screen bg-stashbox-cream flex flex-col">
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="p-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <img 
              src="/lovable-uploads/da7d41e5-363b-4f62-8f48-6bb81deaa23b.png" 
              alt="Stashie Mascot" 
              className="w-8 h-8 animate-bounce-gentle"
            />
            <h1 className="text-2xl font-bold text-stashbox-text">Stashbox</h1>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="flex-1 px-6 pb-6">
          <div className="relative h-full">
            {/* Carousel Content */}
            <div className="h-full overflow-hidden rounded-stashbox">
              <div 
                className="flex h-full transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {slides.map((slide, index) => (
                  <div
                    key={index}
                    className="w-full h-full flex-shrink-0 p-8 flex flex-col items-center justify-center text-center animate-slide-up"
                    style={{ backgroundColor: slide.background }}
                  >
                    <div className="mb-8">
                      <img 
                        src={slide.icon} 
                        alt={slide.title} 
                        className="w-16 h-16 mx-auto animate-bounce-gentle"
                      />
                    </div>
                    
                    <h2 className="text-2xl font-bold text-stashbox-text mb-4">
                      {slide.title}
                    </h2>
                    
                    <p className="text-stashbox-text/80 text-base leading-relaxed mb-8 max-w-sm">
                      {slide.description}
                    </p>

                    {slide.hasButton && (
                      <Button
                        onClick={handleLogin}
                        className="bg-white text-stashbox-text hover:bg-white/90 font-semibold py-4 px-8 rounded-stashbox text-lg transition-all duration-200 transform hover:scale-105 animate-bounce-gentle"
                      >
                        🚀 Get Started
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            {currentSlide > 0 && (
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm p-2 rounded-full transition-all duration-200 hover:bg-white/30"
              >
                <ChevronLeft className="w-6 h-6 text-stashbox-text" />
              </button>
            )}

            {currentSlide < slides.length - 1 && (
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm p-2 rounded-full transition-all duration-200 hover:bg-white/30"
              >
                <ChevronRight className="w-6 h-6 text-stashbox-text" />
              </button>
            )}
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center space-x-2 mt-6">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  currentSlide === index 
                    ? 'bg-stashbox-text scale-125' 
                    : 'bg-stashbox-text/30 hover:bg-stashbox-text/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
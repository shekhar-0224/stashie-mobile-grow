
import { useState } from "react";
import { User } from "lucide-react";

const Header = () => {
  const [user] = useState({
    name: "Emma",
    totalSaved: "1,200"
  });

  return (
    <header className="animate-fade-in p-6 bg-stashbox-cream">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img 
              src="/lovable-uploads/da7d41e5-363b-4f62-8f48-6bb81deaa23b.png" 
              alt="Stashie Mascot" 
              className="w-8 h-8 animate-bounce-gentle cursor-pointer hover:animate-sparkle"
              title="Stashie watches your jars!"
              onClick={() => {
                // Add mascot reaction animation
                if (navigator.vibrate) {
                  navigator.vibrate(100);
                }
              }}
            />
          </div>
          <div className="text-2xl font-bold text-stashbox-text">Stashbox</div>
        </div>
        <div className="w-10 h-10 bg-stashbox-orange rounded-full flex items-center justify-center">
          <User className="w-5 h-5 text-stashbox-text" />
        </div>
      </div>
      
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-stashbox-text leading-tight">
          Hey {user.name}, <br />
          let's grow <br />
          your stash!
        </h1>
        
        <div className="mt-6 p-4 bg-stashbox-mint rounded-stashbox">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-stashbox-text/80 mb-1">
                Your total saved so far:
              </p>
              <p className="text-3xl font-bold text-stashbox-text">
                ${user.totalSaved}
              </p>
            </div>
            <div className="relative">
              <img 
                src="/lovable-uploads/da7d41e5-363b-4f62-8f48-6bb81deaa23b.png" 
                alt="Stashie celebrating your savings" 
                className="w-16 h-16 animate-bounce-gentle hover:animate-sparkle cursor-pointer"
                title="Click me for a surprise!"
                onClick={() => {
                  // Trigger sparkle animation and haptic feedback
                  if (navigator.vibrate) {
                    navigator.vibrate([50, 100, 50]);
                  }
                }}
              />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-stashbox-orange rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

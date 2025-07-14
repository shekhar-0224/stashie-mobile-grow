
import { Sparkles } from "lucide-react";
import { useTranslation } from 'react-i18next';

const GenieModeBanner = () => {
  const { t } = useTranslation();
  const handleClick = () => {
    console.log("Opening Genie settings...");
    // This would open the Genie settings modal/page
  };

  return (
    <div 
      className="mx-6 p-4 bg-stashbox-yellow rounded-stashbox animate-fade-in cursor-pointer transition-all duration-200 hover:bg-stashbox-yellow/90 hover:scale-105"
      onClick={handleClick}
      title="Click to manage Genie notifications"
      style={{ animationDelay: '600ms' }}
    >
      <div className="flex items-center space-x-3">
        <div className="animate-sparkle">
          <Sparkles className="w-5 h-5 text-stashbox-text" />
        </div>
        <div className="flex-1">
          <p className="text-sm text-stashbox-text leading-relaxed">
            <span className="font-semibold">{t('genie.modeActive')}</span> {t('genie.watchingSpend')}
          </p>
        </div>
        <div className="text-stashbox-text/60">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default GenieModeBanner;

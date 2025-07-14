import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const languages = [
  { code: 'en', name: 'common.english' },
  { code: 'es', name: 'common.spanish' },
  { code: 'hi', name: 'common.hindi' },
  { code: 'ko', name: 'common.korean' },
  { code: 'id', name: 'common.indonesian' },
  { code: 'ja', name: 'common.japanese' },
  { code: 'th', name: 'common.thai' },
  { code: 'vi', name: 'common.vietnamese' },
  { code: 'zh', name: 'common.chinese' }
];

export const LanguageSelector = () => {
  const { i18n, t } = useTranslation();

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
  };

  const getCurrentLanguageName = () => {
    const currentLang = languages.find(lang => lang.code === i18n.language);
    return currentLang ? t(currentLang.name) : 'English';
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm"
          className="flex items-center gap-2 text-stashbox-text hover:bg-stashbox-orange/20"
        >
          <Globe className="w-5 h-5" />
          <span className="hidden sm:inline text-sm">🌐 {getCurrentLanguageName()}</span>
          <span className="sm:hidden text-lg">🌐</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-background border border-border">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={`cursor-pointer ${
              i18n.language === language.code 
                ? 'bg-accent text-accent-foreground' 
                : 'hover:bg-accent/50'
            }`}
          >
            {t(language.name)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
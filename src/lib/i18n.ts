import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
const en = {
  "common": {
    "language": "Language",
    "english": "English",
    "spanish": "Spanish", 
    "french": "French",
    "german": "German"
  },
  "header": {
    "appName": "Stashbox",
    "greeting": "Hey {{name}},",
    "subtitle": "let's grow",
    "subtitle2": "your stash!",
    "totalSaved": "Your total saved so far:",
    "mascotTitle": "Stashie watches your jars!",
    "celebratingTitle": "Click me for a surprise!"
  },
  "savings": {
    "myJars": "My Jars",
    "addJar": "Add Jar",
    "customJar": "Custom Jar",
    "vacationFund": "Vacation Fund",
    "emergencyFund": "Emergency Fund", 
    "newCarFund": "New Car Fund",
    "dreamHomeFund": "Dream Home Fund",
    "createJar": "Create Jar",
    "jarName": "Jar Name",
    "targetAmount": "Target Amount",
    "targetDate": "Target Date",
    "riskLevel": "Risk Level",
    "conservative": "Conservative",
    "moderate": "Moderate", 
    "aggressive": "Aggressive",
    "expectedReturn": "Expected Return",
    "apy": "APY"
  },
  "login": {
    "welcome": "Welcome to Stashbox",
    "subtitle": "Your friendly savings companion",
    "getStarted": "Get Started",
    "signIn": "Sign In"
  }
};

const es = {
  "common": {
    "language": "Idioma",
    "english": "Inglés",
    "spanish": "Español",
    "french": "Francés", 
    "german": "Alemán"
  },
  "header": {
    "appName": "Stashbox",
    "greeting": "Hola {{name}},",
    "subtitle": "hagamos crecer",
    "subtitle2": "tu reserva!",
    "totalSaved": "Tu total ahorrado hasta ahora:",
    "mascotTitle": "¡Stashie vigila tus frascos!",
    "celebratingTitle": "¡Haz clic para una sorpresa!"
  },
  "savings": {
    "myJars": "Mis Frascos",
    "addJar": "Agregar Frasco",
    "customJar": "Frasco Personalizado",
    "vacationFund": "Fondo de Vacaciones",
    "emergencyFund": "Fondo de Emergencia",
    "newCarFund": "Fondo para Auto Nuevo",
    "dreamHomeFund": "Fondo para Casa de Ensueño",
    "createJar": "Crear Frasco",
    "jarName": "Nombre del Frasco",
    "targetAmount": "Cantidad Objetivo",
    "targetDate": "Fecha Objetivo",
    "riskLevel": "Nivel de Riesgo",
    "conservative": "Conservador",
    "moderate": "Moderado",
    "aggressive": "Agresivo",
    "expectedReturn": "Retorno Esperado",
    "apy": "TAE"
  },
  "login": {
    "welcome": "Bienvenido a Stashbox",
    "subtitle": "Tu compañero amigable de ahorros",
    "getStarted": "Comenzar",
    "signIn": "Iniciar Sesión"
  }
};

const resources = {
  en: { translation: en },
  es: { translation: es },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n;
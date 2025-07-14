import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
const en = {
  "common": {
    "language": "Language",
    "english": "English",
    "spanish": "Spanish"
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
  "login": {
    "title": "Save in 3 easy steps",
    "slide1Title": "Pick a Jar",
    "slide1Description": "Choose how you want to save — short-term, long-term, or a custom goal.",
    "slide2Title": "Save & Earn",
    "slide2Description": "Add money anytime, earn fixed returns, and grow your stash.",
    "slide3Title": "Hit Streaks & Unlock Badges",
    "slide3Description": "Save daily, hit milestones, and unlock rewards with Genie Mode.",
    "getStarted": "Get Started"
  },
  "savings": {
    "myJars": "My Jars",
    "customJar": "Custom Jar",
    "quickSave": "QuickSave",
    "quickSaveSubtitle": "QuickSave · 30 days",
    "quickSaveCaption": "Fixed 4.5% APY",
    "safeStack": "SafeStack",
    "safeStackSubtitle": "SafeStack · 90 days", 
    "safeStackCaption": "Fixed 6.5% APY",
    "growFund": "GrowFund",
    "growFundSubtitle": "GrowFund · 180+ days",
    "growFundCaption": "Fixed 8.0% APY",
    "emergency": "Emergency",
    "emergencySubtitle": "Emergency Fund",
    "emergencyCaption": "High liquidity 2.5% APY",
    "createGoal": "Create Goal",
    "startSaving": "Start Saving",
    "saved": "saved",
    "progress": "Progress"
  },
  "modal": {
    "startQuickSave": "Start QuickSave",
    "startSafeStack": "Start SafeStack", 
    "startGrowFund": "Start GrowFund",
    "createGoalJar": "Create Goal Jar",
    "goalName": "Goal Name",
    "goalNamePlaceholder": "e.g., PS5",
    "enterAmount": "Enter Amount ($)",
    "targetAmount": "Target Amount ($)",
    "chooseRiskLevel": "Choose Risk Level",
    "higherRiskHigherReturns": "Higher risk, higher returns",
    "lowRisk": "Low Risk",
    "highRisk": "High Risk",
    "expectedReturn": "Expected Return",
    "potential": "potential",
    "duration": "Duration",
    "days": "days",
    "returnEstimate": "Return Estimate",
    "customReturnEstimate": "Custom Return Estimate",
    "youllGet": "You'll get ~${{amount}}",
    "estimatedReturn": "Est. return: ${{amount}}",
    "apy": "{{rate}}% APY",
    "depositToJar": "Deposit to Jar",
    "createJar": "Create Jar",
    "earlyWithdrawalPenalty": "⚠️ Early withdrawal penalty: {{penalty}}"
  },
  "toast": {
    "saved": "🎉 Saved!",
    "savedDescription": "Jar topped up. You're 1 step closer to your goal!",
    "streakMilestone": "🔥 Streak Milestone!",
    "streakDescription": "You've unlocked a new badge!",
    "goalCreated": "🎯 Goal Created!",
    "goalDescription": "Your custom savings goal is ready!"
  },
  "genie": {
    "modeActive": "Genie Mode active:",
    "watchingSpend": "Watching your spend to suggest round-ups!"
  },
  "streak": {
    "streak": "Streak: {{days}} days",
    "nextBadge": "Next badge at {{days}} days! 💪"
  }
};

const es = {
  "common": {
    "language": "Idioma",
    "english": "Inglés",
    "spanish": "Español"
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
  "login": {
    "title": "Ahorra en 3 pasos fáciles",
    "slide1Title": "Elige un Frasco",
    "slide1Description": "Elige cómo quieres ahorrar: corto plazo, largo plazo o una meta personalizada.",
    "slide2Title": "Ahorra y Gana",
    "slide2Description": "Agrega dinero cuando quieras, gana retornos fijos y haz crecer tu reserva.",
    "slide3Title": "Logra Rachas y Desbloquea Insignias",
    "slide3Description": "Ahorra diariamente, alcanza metas y desbloquea recompensas con el Modo Genio.",
    "getStarted": "Comenzar"
  },
  "savings": {
    "myJars": "Mis Frascos",
    "customJar": "Frasco Personalizado",
    "quickSave": "AhorroRápido",
    "quickSaveSubtitle": "AhorroRápido · 30 días",
    "quickSaveCaption": "TAE fija 4.5%",
    "safeStack": "PilaSegura",
    "safeStackSubtitle": "PilaSegura · 90 días",
    "safeStackCaption": "TAE fija 6.5%",
    "growFund": "FondoCrecimiento",
    "growFundSubtitle": "FondoCrecimiento · 180+ días",
    "growFundCaption": "TAE fija 8.0%",
    "emergency": "Emergencia",
    "emergencySubtitle": "Fondo de Emergencia",
    "emergencyCaption": "Alta liquidez TAE 2.5%",
    "createGoal": "Crear Meta",
    "startSaving": "Comenzar a Ahorrar",
    "saved": "ahorrado",
    "progress": "Progreso"
  },
  "modal": {
    "startQuickSave": "Iniciar AhorroRápido",
    "startSafeStack": "Iniciar PilaSegura",
    "startGrowFund": "Iniciar FondoCrecimiento", 
    "createGoalJar": "Crear Frasco de Meta",
    "goalName": "Nombre de la Meta",
    "goalNamePlaceholder": "ej., PS5",
    "enterAmount": "Ingresa Cantidad ($)",
    "targetAmount": "Cantidad Objetivo ($)",
    "chooseRiskLevel": "Elegir Nivel de Riesgo",
    "higherRiskHigherReturns": "Mayor riesgo, mayores retornos",
    "lowRisk": "Bajo Riesgo",
    "highRisk": "Alto Riesgo",
    "expectedReturn": "Retorno Esperado",
    "potential": "potencial",
    "duration": "Duración",
    "days": "días",
    "returnEstimate": "Estimación de Retorno",
    "customReturnEstimate": "Estimación de Retorno Personalizada",
    "youllGet": "Obtendrás ~${{amount}}",
    "estimatedReturn": "Retorno est.: ${{amount}}",
    "apy": "{{rate}}% TAE",
    "depositToJar": "Depositar en Frasco",
    "createJar": "Crear Frasco",
    "earlyWithdrawalPenalty": "⚠️ Penalidad por retiro anticipado: {{penalty}}"
  },
  "toast": {
    "saved": "🎉 ¡Guardado!",
    "savedDescription": "Frasco llenado. ¡Estás 1 paso más cerca de tu meta!",
    "streakMilestone": "🔥 ¡Hito de Racha!",
    "streakDescription": "¡Has desbloqueado una nueva insignia!",
    "goalCreated": "🎯 ¡Meta Creada!",
    "goalDescription": "¡Tu meta de ahorro personalizada está lista!"
  },
  "genie": {
    "modeActive": "Modo Genio activo:",
    "watchingSpend": "¡Vigilando tus gastos para sugerir redondeos!"
  },
  "streak": {
    "streak": "Racha: {{days}} días",
    "nextBadge": "¡Próxima insignia en {{days}} días! 💪"
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
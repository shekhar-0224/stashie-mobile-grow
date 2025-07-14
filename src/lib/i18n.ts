import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
const en = {
  "common": {
    "language": "Language",
    "english": "English",
    "spanish": "Spanish",
    "hindi": "Hindi",
    "korean": "Korean", 
    "indonesian": "Indonesian",
    "japanese": "Japanese",
    "thai": "Thai",
    "vietnamese": "Vietnamese",
    "chinese": "Chinese"
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
    "spanish": "Español",
    "hindi": "Hindi",
    "korean": "Coreano",
    "indonesian": "Indonesio", 
    "japanese": "Japonés",
    "thai": "Tailandés",
    "vietnamese": "Vietnamita",
    "chinese": "Chino"
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

const hi = {
  "common": {
    "language": "भाषा",
    "english": "अंग्रेजी",
    "spanish": "स्पेनिश",
    "hindi": "हिंदी",
    "korean": "कोरियाई",
    "indonesian": "इंडोनेशियाई",
    "japanese": "जापानी",
    "thai": "थाई",
    "vietnamese": "वियतनामी",
    "chinese": "चीनी"
  },
  "header": {
    "appName": "Stashbox",
    "greeting": "नमस्ते {{name}},",
    "subtitle": "आइए बढ़ाते हैं",
    "subtitle2": "आपका खजाना!",
    "totalSaved": "अब तक आपकी कुल बचत:",
    "mascotTitle": "Stashie आपके जार की निगरानी करता है!",
    "celebratingTitle": "सरप्राइज़ के लिए मुझे क्लिक करें!"
  },
  "login": {
    "title": "3 आसान चरणों में बचत करें",
    "slide1Title": "एक जार चुनें",
    "slide1Description": "चुनें कि आप कैसे बचत करना चाहते हैं — अल्पकालिक, दीर्घकालिक, या कस्टम लक्ष्य।",
    "slide2Title": "बचत करें और कमाएं",
    "slide2Description": "कभी भी पैसे जोड़ें, निश्चित रिटर्न कमाएं, और अपना खजाना बढ़ाएं।",
    "slide3Title": "स्ट्रीक हिट करें और बैज अनलॉक करें",
    "slide3Description": "रोज़ाना बचत करें, मील के पत्थर हासिल करें, और जीनी मोड के साथ रिवार्ड अनलॉक करें।",
    "getStarted": "शुरू करें"
  },
  "savings": {
    "myJars": "मेरे जार",
    "customJar": "कस्टम जार",
    "quickSave": "QuickSave",
    "quickSaveSubtitle": "QuickSave · 30 दिन",
    "quickSaveCaption": "निश्चित 4.5% APY",
    "safeStack": "SafeStack",
    "safeStackSubtitle": "SafeStack · 90 दिन",
    "safeStackCaption": "निश्चित 6.5% APY",
    "growFund": "GrowFund",
    "growFundSubtitle": "GrowFund · 180+ दिन",
    "growFundCaption": "निश्चित 8.0% APY",
    "emergency": "आपातकाल",
    "emergencySubtitle": "आपातकालीन फंड",
    "emergencyCaption": "उच्च तरलता 2.5% APY",
    "createGoal": "लक्ष्य बनाएं",
    "startSaving": "बचत शुरू करें",
    "saved": "बचत",
    "progress": "प्रगति"
  },
  "modal": {
    "startQuickSave": "QuickSave शुरू करें",
    "startSafeStack": "SafeStack शुरू करें",
    "startGrowFund": "GrowFund शुरू करें",
    "createGoalJar": "लक्ष्य जार बनाएं",
    "goalName": "लक्ष्य का नाम",
    "goalNamePlaceholder": "जैसे, PS5",
    "enterAmount": "राशि दर्ज करें ($)",
    "targetAmount": "लक्षित राशि ($)",
    "chooseRiskLevel": "जोखिम स्तर चुनें",
    "higherRiskHigherReturns": "अधिक जोखिम, अधिक रिटर्न",
    "lowRisk": "कम जोखिम",
    "highRisk": "अधिक जोखिम",
    "expectedReturn": "अपेक्षित रिटर्न",
    "potential": "संभावित",
    "duration": "अवधि",
    "days": "दिन",
    "returnEstimate": "रिटर्न अनुमान",
    "customReturnEstimate": "कस्टम रिटर्न अनुमान",
    "youllGet": "आपको मिलेगा ~${{amount}}",
    "estimatedReturn": "अनुमानित रिटर्न: ${{amount}}",
    "apy": "{{rate}}% APY",
    "depositToJar": "जार में जमा करें",
    "createJar": "जार बनाएं",
    "earlyWithdrawalPenalty": "⚠️ जल्दी निकासी जुर्माना: {{penalty}}"
  },
  "toast": {
    "saved": "🎉 सुरक्षित!",
    "savedDescription": "जार भर गया। आप अपने लक्ष्य के 1 कदम और करीब हैं!",
    "streakMilestone": "🔥 स्ट्रीक मील का पत्थर!",
    "streakDescription": "आपने एक नया बैज अनलॉक किया है!",
    "goalCreated": "🎯 लक्ष्य बनाया गया!",
    "goalDescription": "आपका कस्टम बचत लक्ष्य तैयार है!"
  },
  "genie": {
    "modeActive": "जीनी मोड सक्रिय:",
    "watchingSpend": "राउंड-अप सुझाने के लिए आपके खर्च पर नज़र रख रहा है!"
  },
  "streak": {
    "streak": "स्ट्रीक: {{days}} दिन",
    "nextBadge": "अगला बैज {{days}} दिनों में! 💪"
  }
};

const ko = {
  "common": {
    "language": "언어",
    "english": "영어",
    "spanish": "스페인어",
    "hindi": "힌디어",
    "korean": "한국어",
    "indonesian": "인도네시아어",
    "japanese": "일본어",
    "thai": "태국어",
    "vietnamese": "베트남어",
    "chinese": "중국어"
  },
  "header": {
    "appName": "Stashbox",
    "greeting": "안녕하세요 {{name}},",
    "subtitle": "함께 키워봐요",
    "subtitle2": "당신의 저금!",
    "totalSaved": "지금까지 총 저축금:",
    "mascotTitle": "Stashie가 당신의 저금통을 지켜보고 있어요!",
    "celebratingTitle": "서프라이즈를 위해 클릭하세요!"
  },
  "login": {
    "title": "3단계로 쉽게 저축",
    "slide1Title": "저금통 선택",
    "slide1Description": "저축 방법을 선택하세요 — 단기, 장기, 또는 맞춤 목표.",
    "slide2Title": "저축하고 수익내기",
    "slide2Description": "언제든지 돈을 추가하고, 고정 수익을 얻어 저축을 늘려보세요.",
    "slide3Title": "연속 달성하고 뱃지 잠금해제",
    "slide3Description": "매일 저축하고, 목표를 달성하며, 지니 모드로 보상을 잠금해제하세요.",
    "getStarted": "시작하기"
  },
  "savings": {
    "myJars": "내 저금통",
    "customJar": "맞춤 저금통",
    "quickSave": "QuickSave",
    "quickSaveSubtitle": "QuickSave · 30일",
    "quickSaveCaption": "고정 4.5% APY",
    "safeStack": "SafeStack",
    "safeStackSubtitle": "SafeStack · 90일",
    "safeStackCaption": "고정 6.5% APY",
    "growFund": "GrowFund",
    "growFundSubtitle": "GrowFund · 180+ 일",
    "growFundCaption": "고정 8.0% APY",
    "emergency": "비상금",
    "emergencySubtitle": "비상금 펀드",
    "emergencyCaption": "높은 유동성 2.5% APY",
    "createGoal": "목표 생성",
    "startSaving": "저축 시작",
    "saved": "저축됨",
    "progress": "진행률"
  },
  "modal": {
    "startQuickSave": "QuickSave 시작",
    "startSafeStack": "SafeStack 시작",
    "startGrowFund": "GrowFund 시작",
    "createGoalJar": "목표 저금통 생성",
    "goalName": "목표 이름",
    "goalNamePlaceholder": "예: PS5",
    "enterAmount": "금액 입력 ($)",
    "targetAmount": "목표 금액 ($)",
    "chooseRiskLevel": "위험 수준 선택",
    "higherRiskHigherReturns": "높은 위험, 높은 수익",
    "lowRisk": "낮은 위험",
    "highRisk": "높은 위험",
    "expectedReturn": "예상 수익",
    "potential": "잠재적",
    "duration": "기간",
    "days": "일",
    "returnEstimate": "수익 예상",
    "customReturnEstimate": "맞춤 수익 예상",
    "youllGet": "받게 될 금액 ~${{amount}}",
    "estimatedReturn": "예상 수익: ${{amount}}",
    "apy": "{{rate}}% APY",
    "depositToJar": "저금통에 입금",
    "createJar": "저금통 생성",
    "earlyWithdrawalPenalty": "⚠️ 조기 출금 수수료: {{penalty}}"
  },
  "toast": {
    "saved": "🎉 저장됨!",
    "savedDescription": "저금통이 채워졌습니다. 목표에 한 걸음 더 가까워졌어요!",
    "streakMilestone": "🔥 연속 달성!",
    "streakDescription": "새로운 뱃지를 잠금해제했습니다!",
    "goalCreated": "🎯 목표 생성됨!",
    "goalDescription": "맞춤 저축 목표가 준비되었습니다!"
  },
  "genie": {
    "modeActive": "지니 모드 활성:",
    "watchingSpend": "반올림 제안을 위해 지출을 지켜보고 있어요!"
  },
  "streak": {
    "streak": "연속: {{days}}일",
    "nextBadge": "다음 뱃지까지 {{days}}일! 💪"
  }
};

const id = {
  "common": {
    "language": "Bahasa",
    "english": "Inggris",
    "spanish": "Spanyol",
    "hindi": "Hindi",
    "korean": "Korea",
    "indonesian": "Indonesia",
    "japanese": "Jepang",
    "thai": "Thailand",
    "vietnamese": "Vietnam",
    "chinese": "Tiongkok"
  },
  "header": {
    "appName": "Stashbox",
    "greeting": "Hai {{name}},",
    "subtitle": "mari tumbuhkan",
    "subtitle2": "tabungan Anda!",
    "totalSaved": "Total tabungan Anda sejauh ini:",
    "mascotTitle": "Stashie mengawasi stoples Anda!",
    "celebratingTitle": "Klik saya untuk kejutan!"
  },
  "login": {
    "title": "Menabung dalam 3 langkah mudah",
    "slide1Title": "Pilih Stoples",
    "slide1Description": "Pilih cara Anda ingin menabung — jangka pendek, jangka panjang, atau tujuan kustom.",
    "slide2Title": "Tabung & Raih",
    "slide2Description": "Tambahkan uang kapan saja, dapatkan keuntungan tetap, dan kembangkan tabungan Anda.",
    "slide3Title": "Capai Streak & Buka Lencana",
    "slide3Description": "Menabung setiap hari, capai pencapaian, dan buka hadiah dengan Mode Genie.",
    "getStarted": "Mulai"
  },
  "savings": {
    "myJars": "Stoples Saya",
    "customJar": "Stoples Kustom",
    "quickSave": "TabungCepat",
    "quickSaveSubtitle": "TabungCepat · 30 hari",
    "quickSaveCaption": "APY tetap 4.5%",
    "safeStack": "TumpukAman",
    "safeStackSubtitle": "TumpukAman · 90 hari",
    "safeStackCaption": "APY tetap 6.5%",
    "growFund": "DanaTumbuh",
    "growFundSubtitle": "DanaTumbuh · 180+ hari",
    "growFundCaption": "APY tetap 8.0%",
    "emergency": "Darurat",
    "emergencySubtitle": "Dana Darurat",
    "emergencyCaption": "Likuiditas tinggi APY 2.5%",
    "createGoal": "Buat Tujuan",
    "startSaving": "Mulai Menabung",
    "saved": "tersimpan",
    "progress": "Kemajuan"
  },
  "modal": {
    "startQuickSave": "Mulai TabungCepat",
    "startSafeStack": "Mulai TumpukAman",
    "startGrowFund": "Mulai DanaTumbuh",
    "createGoalJar": "Buat Stoples Tujuan",
    "goalName": "Nama Tujuan",
    "goalNamePlaceholder": "cth., PS5",
    "enterAmount": "Masukkan Jumlah ($)",
    "targetAmount": "Jumlah Target ($)",
    "chooseRiskLevel": "Pilih Tingkat Risiko",
    "higherRiskHigherReturns": "Risiko tinggi, keuntungan tinggi",
    "lowRisk": "Risiko Rendah",
    "highRisk": "Risiko Tinggi",
    "expectedReturn": "Keuntungan Yang Diharapkan",
    "potential": "potensial",
    "duration": "Durasi",
    "days": "hari",
    "returnEstimate": "Estimasi Keuntungan",
    "customReturnEstimate": "Estimasi Keuntungan Kustom",
    "youllGet": "Anda akan mendapat ~${{amount}}",
    "estimatedReturn": "Perkiraan keuntungan: ${{amount}}",
    "apy": "{{rate}}% APY",
    "depositToJar": "Setorkan ke Stoples",
    "createJar": "Buat Stoples",
    "earlyWithdrawalPenalty": "⚠️ Penalti penarikan dini: {{penalty}}"
  },
  "toast": {
    "saved": "🎉 Tersimpan!",
    "savedDescription": "Stoples terisi. Anda 1 langkah lebih dekat ke tujuan!",
    "streakMilestone": "🔥 Pencapaian Streak!",
    "streakDescription": "Anda telah membuka lencana baru!",
    "goalCreated": "🎯 Tujuan Dibuat!",
    "goalDescription": "Tujuan tabungan kustom Anda sudah siap!"
  },
  "genie": {
    "modeActive": "Mode Genie aktif:",
    "watchingSpend": "Memantau pengeluaran Anda untuk menyarankan pembulatan!"
  },
  "streak": {
    "streak": "Streak: {{days}} hari",
    "nextBadge": "Lencana berikutnya dalam {{days}} hari! 💪"
  }
};

const ja = {
  "common": {
    "language": "言語",
    "english": "英語",
    "spanish": "スペイン語",
    "hindi": "ヒンディー語",
    "korean": "韓国語",
    "indonesian": "インドネシア語",
    "japanese": "日本語",
    "thai": "タイ語",
    "vietnamese": "ベトナム語",
    "chinese": "中国語"
  },
  "header": {
    "appName": "Stashbox",
    "greeting": "こんにちは {{name}}、",
    "subtitle": "一緒に育てましょう",
    "subtitle2": "あなたの貯金!",
    "totalSaved": "これまでの総貯蓄額:",
    "mascotTitle": "Stashieがあなたの瓶を見守っています!",
    "celebratingTitle": "サプライズのためにクリックしてください!"
  },
  "login": {
    "title": "3つの簡単なステップで貯金",
    "slide1Title": "瓶を選ぶ",
    "slide1Description": "貯金方法を選択してください — 短期、長期、またはカスタム目標。",
    "slide2Title": "貯金して稼ぐ",
    "slide2Description": "いつでもお金を追加し、固定リターンを得て、貯金を増やしましょう。",
    "slide3Title": "ストリークを達成してバッジを解除",
    "slide3Description": "毎日貯金し、マイルストーンを達成し、ジニーモードで報酬を解除しましょう。",
    "getStarted": "始める"
  },
  "savings": {
    "myJars": "マイ瓶",
    "customJar": "カスタム瓶",
    "quickSave": "クイックセーブ",
    "quickSaveSubtitle": "クイックセーブ · 30日",
    "quickSaveCaption": "固定4.5% APY",
    "safeStack": "セーフスタック",
    "safeStackSubtitle": "セーフスタック · 90日",
    "safeStackCaption": "固定6.5% APY",
    "growFund": "グロウファンド",
    "growFundSubtitle": "グロウファンド · 180+日",
    "growFundCaption": "固定8.0% APY",
    "emergency": "緊急時",
    "emergencySubtitle": "緊急資金",
    "emergencyCaption": "高流動性2.5% APY",
    "createGoal": "目標を作成",
    "startSaving": "貯金を開始",
    "saved": "貯金済み",
    "progress": "進捗"
  },
  "modal": {
    "startQuickSave": "クイックセーブを開始",
    "startSafeStack": "セーフスタックを開始",
    "startGrowFund": "グロウファンドを開始",
    "createGoalJar": "目標瓶を作成",
    "goalName": "目標名",
    "goalNamePlaceholder": "例: PS5",
    "enterAmount": "金額を入力 ($)",
    "targetAmount": "目標金額 ($)",
    "chooseRiskLevel": "リスクレベルを選択",
    "higherRiskHigherReturns": "高リスク、高リターン",
    "lowRisk": "低リスク",
    "highRisk": "高リスク",
    "expectedReturn": "期待リターン",
    "potential": "ポテンシャル",
    "duration": "期間",
    "days": "日",
    "returnEstimate": "リターン見積もり",
    "customReturnEstimate": "カスタムリターン見積もり",
    "youllGet": "約${{amount}}を得られます",
    "estimatedReturn": "推定リターン: ${{amount}}",
    "apy": "{{rate}}% APY",
    "depositToJar": "瓶に入金",
    "createJar": "瓶を作成",
    "earlyWithdrawalPenalty": "⚠️ 早期引き出しペナルティ: {{penalty}}"
  },
  "toast": {
    "saved": "🎉 保存されました!",
    "savedDescription": "瓶が満たされました。目標に1歩近づきました!",
    "streakMilestone": "🔥 ストリークマイルストーン!",
    "streakDescription": "新しいバッジを解除しました!",
    "goalCreated": "🎯 目標が作成されました!",
    "goalDescription": "カスタム貯金目標の準備ができました!"
  },
  "genie": {
    "modeActive": "ジニーモードアクティブ:",
    "watchingSpend": "端数切り上げを提案するため支出を監視中!"
  },
  "streak": {
    "streak": "ストリーク: {{days}}日",
    "nextBadge": "次のバッジまで{{days}}日! 💪"
  }
};

const th = {
  "common": {
    "language": "ภาษา",
    "english": "อังกฤษ",
    "spanish": "สเปน",
    "hindi": "ฮินดี",
    "korean": "เกาหลี",
    "indonesian": "อินโดนีเซีย",
    "japanese": "ญี่ปุ่น",
    "thai": "ไทย",
    "vietnamese": "เวียดนาม",
    "chinese": "จีน"
  },
  "header": {
    "appName": "Stashbox",
    "greeting": "สวัสดี {{name}},",
    "subtitle": "มาร่วมกันเติบโต",
    "subtitle2": "เงินออมของคุณ!",
    "totalSaved": "เงินออมทั้งหมดของคุณจนถึงตอนนี้:",
    "mascotTitle": "Stashie คอยดูแลโถของคุณ!",
    "celebratingTitle": "คลิกฉันเพื่อของขวัญ!"
  },
  "login": {
    "title": "ออมเงินใน 3 ขั้นตอนง่าย",
    "slide1Title": "เลือกโถ",
    "slide1Description": "เลือกวิธีที่คุณต้องการออมเงิน — ระยะสั้น ระยะยาว หรือเป้าหมายที่กำหนดเอง",
    "slide2Title": "ออมและหา",
    "slide2Description": "เพิ่มเงินได้ตลอดเวลา รับผลตอบแทนคงที่ และเติบโตเงินออมของคุณ",
    "slide3Title": "ทำสถิติและปลดล็อคเหรียญ",
    "slide3Description": "ออมเงินทุกวัน บรรลุเป้าหมาย และปลดล็อครางวัลด้วยโหมดจีนี่",
    "getStarted": "เริ่มต้น"
  },
  "savings": {
    "myJars": "โถของฉัน",
    "customJar": "โถที่กำหนดเอง",
    "quickSave": "ออมเร็ว",
    "quickSaveSubtitle": "ออมเร็ว · 30 วัน",
    "quickSaveCaption": "อัตราผลตอบแทนคงที่ 4.5%",
    "safeStack": "กองปลอดภัย",
    "safeStackSubtitle": "กองปลอดภัย · 90 วัน",
    "safeStackCaption": "อัตราผลตอบแทนคงที่ 6.5%",
    "growFund": "กองทุนเติบโต",
    "growFundSubtitle": "กองทุนเติบโต · 180+ วัน",
    "growFundCaption": "อัตราผลตอบแทนคงที่ 8.0%",
    "emergency": "ฉุกเฉิน",
    "emergencySubtitle": "กองทุนฉุกเฉิน",
    "emergencyCaption": "สภาพคล่องสูง 2.5% APY",
    "createGoal": "สร้างเป้าหมาย",
    "startSaving": "เริ่มออมเงิน",
    "saved": "ออมแล้ว",
    "progress": "ความคืบหนา"
  },
  "modal": {
    "startQuickSave": "เริ่มออมเร็ว",
    "startSafeStack": "เริ่มกองปลอดภัย",
    "startGrowFund": "เริ่มกองทุนเติบโต",
    "createGoalJar": "สร้างโถเป้าหมาย",
    "goalName": "ชื่อเป้าหมาย",
    "goalNamePlaceholder": "เช่น PS5",
    "enterAmount": "ใส่จำนวนเงิน ($)",
    "targetAmount": "จำนวนเป้าหมาย ($)",
    "chooseRiskLevel": "เลือกระดับความเสี่ยง",
    "higherRiskHigherReturns": "ความเสี่ยงสูง ผลตอบแทนสูง",
    "lowRisk": "ความเสี่ยงต่ำ",
    "highRisk": "ความเสี่ยงสูง",
    "expectedReturn": "ผลตอบแทนที่คาดหวัง",
    "potential": "ศักยภาพ",
    "duration": "ระยะเวลา",
    "days": "วัน",
    "returnEstimate": "ประมาณการผลตอบแทน",
    "customReturnEstimate": "ประมาณการผลตอบแทนที่กำหนดเอง",
    "youllGet": "คุณจะได้รับ ~${{amount}}",
    "estimatedReturn": "ผลตอบแทนประมาณ: ${{amount}}",
    "apy": "{{rate}}% APY",
    "depositToJar": "ฝากเงินในโถ",
    "createJar": "สร้างโถ",
    "earlyWithdrawalPenalty": "⚠️ ค่าปรับการถอนก่อนกำหนด: {{penalty}}"
  },
  "toast": {
    "saved": "🎉 บันทึกแล้ว!",
    "savedDescription": "โถเต็มแล้ว คุณใกล้เป้าหมาย 1 ก้าวแล้ว!",
    "streakMilestone": "🔥 เป้าหมายสถิติ!",
    "streakDescription": "คุณปลดล็อคเหรียญใหม่แล้ว!",
    "goalCreated": "🎯 สร้างเป้าหมายแล้ว!",
    "goalDescription": "เป้าหมายออมเงินที่กำหนดเองของคุณพร้อมแล้ว!"
  },
  "genie": {
    "modeActive": "โหมดจีนี่เปิดใช้งาน:",
    "watchingSpend": "กำลังดูการใช้จ่ายของคุณเพื่อแนะนำการปัดเศษ!"
  },
  "streak": {
    "streak": "สถิติ: {{days}} วัน",
    "nextBadge": "เหรียญถัดไปใน {{days}} วัน! 💪"
  }
};

const vi = {
  "common": {
    "language": "Ngôn ngữ",
    "english": "Tiếng Anh",
    "spanish": "Tiếng Tây Ban Nha",
    "hindi": "Tiếng Hindi",
    "korean": "Tiếng Hàn",
    "indonesian": "Tiếng Indonesia",
    "japanese": "Tiếng Nhật",
    "thai": "Tiếng Thái",
    "vietnamese": "Tiếng Việt",
    "chinese": "Tiếng Trung"
  },
  "header": {
    "appName": "Stashbox",
    "greeting": "Xin chào {{name}},",
    "subtitle": "hãy cùng phát triển",
    "subtitle2": "khoản tiết kiệm của bạn!",
    "totalSaved": "Tổng số tiền đã tiết kiệm của bạn:",
    "mascotTitle": "Stashie đang canh gác các hũ của bạn!",
    "celebratingTitle": "Nhấp vào tôi để có bất ngờ!"
  },
  "login": {
    "title": "Tiết kiệm trong 3 bước đơn giản",
    "slide1Title": "Chọn Hũ",
    "slide1Description": "Chọn cách bạn muốn tiết kiệm — ngắn hạn, dài hạn, hoặc mục tiêu tùy chỉnh.",
    "slide2Title": "Tiết kiệm & Kiếm",
    "slide2Description": "Thêm tiền bất kỳ lúc nào, nhận lợi nhuận cố định, và phát triển khoản tiết kiệm.",
    "slide3Title": "Đạt Chuỗi & Mở Khóa Huy Hiệu",
    "slide3Description": "Tiết kiệm hàng ngày, đạt mốc quan trọng, và mở khóa phần thưởng với Chế độ Thần Đèn.",
    "getStarted": "Bắt đầu"
  },
  "savings": {
    "myJars": "Hũ Của Tôi",
    "customJar": "Hũ Tùy Chỉnh",
    "quickSave": "TiếtKiệmNhanh",
    "quickSaveSubtitle": "TiếtKiệmNhanh · 30 ngày",
    "quickSaveCaption": "Lãi suất cố định 4.5%",
    "safeStack": "ChồngAnToàn",
    "safeStackSubtitle": "ChồngAnToàn · 90 ngày",
    "safeStackCaption": "Lãi suất cố định 6.5%",
    "growFund": "QuỹPhátTriển",
    "growFundSubtitle": "QuỹPhátTriển · 180+ ngày",
    "growFundCaption": "Lãi suất cố định 8.0%",
    "emergency": "Khẩn cấp",
    "emergencySubtitle": "Quỹ Khẩn Cấp",
    "emergencyCaption": "Tính thanh khoản cao 2.5% APY",
    "createGoal": "Tạo Mục Tiêu",
    "startSaving": "Bắt Đầu Tiết Kiệm",
    "saved": "đã tiết kiệm",
    "progress": "Tiến độ"
  },
  "modal": {
    "startQuickSave": "Bắt đầu TiếtKiệmNhanh",
    "startSafeStack": "Bắt đầu ChồngAnToàn",
    "startGrowFund": "Bắt đầu QuỹPhátTriển",
    "createGoalJar": "Tạo Hũ Mục Tiêu",
    "goalName": "Tên Mục Tiêu",
    "goalNamePlaceholder": "ví dụ, PS5",
    "enterAmount": "Nhập Số Tiền ($)",
    "targetAmount": "Số Tiền Mục Tiêu ($)",
    "chooseRiskLevel": "Chọn Mức Độ Rủi Ro",
    "higherRiskHigherReturns": "Rủi ro cao, lợi nhuận cao",
    "lowRisk": "Rủi Ro Thấp",
    "highRisk": "Rủi Ro Cao",
    "expectedReturn": "Lợi Nhuận Dự Kiến",
    "potential": "tiềm năng",
    "duration": "Thời gian",
    "days": "ngày",
    "returnEstimate": "Ước tính Lợi nhuận",
    "customReturnEstimate": "Ước tính Lợi nhuận Tùy chỉnh",
    "youllGet": "Bạn sẽ nhận được ~${{amount}}",
    "estimatedReturn": "Lợi nhuận ước tính: ${{amount}}",
    "apy": "{{rate}}% APY",
    "depositToJar": "Gửi vào Hũ",
    "createJar": "Tạo Hũ",
    "earlyWithdrawalPenalty": "⚠️ Phí rút sớm: {{penalty}}"
  },
  "toast": {
    "saved": "🎉 Đã lưu!",
    "savedDescription": "Hũ đã đầy. Bạn đã gần hơn 1 bước tới mục tiêu!",
    "streakMilestone": "🔥 Mốc Chuỗi!",
    "streakDescription": "Bạn đã mở khóa huy hiệu mới!",
    "goalCreated": "🎯 Đã Tạo Mục Tiêu!",
    "goalDescription": "Mục tiêu tiết kiệm tùy chỉnh của bạn đã sẵn sàng!"
  },
  "genie": {
    "modeActive": "Chế độ Thần Đèn đang hoạt động:",
    "watchingSpend": "Đang theo dõi chi tiêu của bạn để đề xuất làm tròn!"
  },
  "streak": {
    "streak": "Chuỗi: {{days}} ngày",
    "nextBadge": "Huy hiệu tiếp theo trong {{days}} ngày! 💪"
  }
};

const zh = {
  "common": {
    "language": "语言",
    "english": "英语",
    "spanish": "西班牙语",
    "hindi": "印地语",
    "korean": "韩语",
    "indonesian": "印尼语",
    "japanese": "日语",
    "thai": "泰语",
    "vietnamese": "越南语",
    "chinese": "中文"
  },
  "header": {
    "appName": "Stashbox",
    "greeting": "你好 {{name}},",
    "subtitle": "让我们一起增长",
    "subtitle2": "你的存款!",
    "totalSaved": "您迄今为止的总储蓄:",
    "mascotTitle": "Stashie 正在看护您的储蓄罐!",
    "celebratingTitle": "点击我获得惊喜!"
  },
  "login": {
    "title": "3步轻松储蓄",
    "slide1Title": "选择储蓄罐",
    "slide1Description": "选择您想要的储蓄方式 — 短期、长期或自定义目标。",
    "slide2Title": "储蓄 & 赚取",
    "slide2Description": "随时添加资金，获得固定收益，并增长您的储蓄。",
    "slide3Title": "达成连续记录 & 解锁徽章",
    "slide3Description": "每日储蓄，达成里程碑，并通过精灵模式解锁奖励。",
    "getStarted": "开始"
  },
  "savings": {
    "myJars": "我的储蓄罐",
    "customJar": "自定义储蓄罐",
    "quickSave": "快速储蓄",
    "quickSaveSubtitle": "快速储蓄 · 30天",
    "quickSaveCaption": "固定 4.5% APY",
    "safeStack": "安全堆栈",
    "safeStackSubtitle": "安全堆栈 · 90天",
    "safeStackCaption": "固定 6.5% APY",
    "growFund": "增长基金",
    "growFundSubtitle": "增长基金 · 180+天",
    "growFundCaption": "固定 8.0% APY",
    "emergency": "应急",
    "emergencySubtitle": "应急基金",
    "emergencyCaption": "高流动性 2.5% APY",
    "createGoal": "创建目标",
    "startSaving": "开始储蓄",
    "saved": "已储蓄",
    "progress": "进度"
  },
  "modal": {
    "startQuickSave": "开始快速储蓄",
    "startSafeStack": "开始安全堆栈",
    "startGrowFund": "开始增长基金",
    "createGoalJar": "创建目标储蓄罐",
    "goalName": "目标名称",
    "goalNamePlaceholder": "例如，PS5",
    "enterAmount": "输入金额 ($)",
    "targetAmount": "目标金额 ($)",
    "chooseRiskLevel": "选择风险级别",
    "higherRiskHigherReturns": "高风险，高回报",
    "lowRisk": "低风险",
    "highRisk": "高风险",
    "expectedReturn": "预期收益",
    "potential": "潜在",
    "duration": "期限",
    "days": "天",
    "returnEstimate": "收益估算",
    "customReturnEstimate": "自定义收益估算",
    "youllGet": "您将获得 ~${{amount}}",
    "estimatedReturn": "预估收益: ${{amount}}",
    "apy": "{{rate}}% APY",
    "depositToJar": "存入储蓄罐",
    "createJar": "创建储蓄罐",
    "earlyWithdrawalPenalty": "⚠️ 提前提取罚金: {{penalty}}"
  },
  "toast": {
    "saved": "🎉 已保存!",
    "savedDescription": "储蓄罐已满。您离目标又近了一步!",
    "streakMilestone": "🔥 连续记录里程碑!",
    "streakDescription": "您已解锁新徽章!",
    "goalCreated": "🎯 目标已创建!",
    "goalDescription": "您的自定义储蓄目标已准备就绪!"
  },
  "genie": {
    "modeActive": "精灵模式已激活:",
    "watchingSpend": "正在监控您的支出以建议舍入!"
  },
  "streak": {
    "streak": "连续: {{days}} 天",
    "nextBadge": "下一个徽章还需 {{days}} 天! 💪"
  }
};

const resources = {
  en: { translation: en },
  es: { translation: es },
  hi: { translation: hi },
  ko: { translation: ko },
  id: { translation: id },
  ja: { translation: ja },
  th: { translation: th },
  vi: { translation: vi },
  zh: { translation: zh },
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
'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en')

  const translations = {
    en: {
      heroTitle: 'Land Your Dream Job with',
      heroSubtitle: 'AI-Powered Resumes',
      heroDesc: 'Create professional, ATS-optimized CVs and tailored cover letters in seconds. Let our AI optimize your content for maximum impact.',
      buildBtn: 'Build My CV Now',
      viewTemplates: 'View Templates',
      signIn: 'Sign In',
      getStarted: 'Get Started',
      features: 'Features',
      pricing: 'Pricing',
      dashboard: 'Dashboard'
    },
    fr: {
      heroTitle: 'Décrochez le job de vos rêves avec',
      heroSubtitle: 'des CV boostés par l\'IA',
      heroDesc: 'Créez des CV professionnels optimisés pour l\'ATS et des lettres de motivation personnalisées en quelques secondes. Laissez notre IA optimiser votre contenu.',
      buildBtn: 'Créer mon CV maintenant',
      viewTemplates: 'Voir les modèles',
      signIn: 'Se connecter',
      getStarted: 'Commencer',
      features: 'Fonctionnalités',
      pricing: 'Tarifs',
      dashboard: 'Tableau de bord'
    }
  }

  const t = translations[lang]

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)

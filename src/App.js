import React, { useState, useEffect } from 'react';
import './App.css';
import {
  FaCopy, FaGlobe, FaUser, FaKey, FaShieldAlt, FaLock,
  FaDesktop, FaCode, FaHome, FaQuestionCircle,
  FaInfoCircle, FaTools, FaChevronRight, FaRocket, FaUserShield,
  FaLanguage, FaTrash, FaHistory
} from 'react-icons/fa';
import { Helmet } from 'react-helmet';
import useTranslation from './hooks/useTranslation';
import usePasswordGenerator from './hooks/usePasswordGenerator';
import ProgressBar from './components/ProgressBar';

function App() {
  const { t, language, toggleLanguage } = useTranslation();
  const [website, setWebsite] = useState('');
  const [username, setUsername] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [complexite, setComplexite] = useState('long');
  const [chargement, setChargement] = useState(false);
  const [copieReussie, setCopieReussie] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [activeFaq, setActiveFaq] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const {
    password,
    history,
    strength,
    generatePassword,
    clearHistory,
    deleteFromHistory,


  } = usePasswordGenerator();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.key === 'g') {
        e.preventDefault();
        genererMotDePasse();
      } else if (e.ctrlKey && e.key === 'c' && password) {
        e.preventDefault();
        copierDansLePressePapier();
      } else if (e.ctrlKey && e.key === 'l') {
        e.preventDefault();
        clearHistory();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [password, clearHistory,]);

  // Vérification de sécurité pour s'assurer que t est défini
  if (!t || !t.generator) {
    return (
      <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center text-white">
        <div className="text-center">
          <div className="spinner mb-4"></div>
          <p>Chargement...</p>
        </div>
      </div>
    );
  }

  const genererMotDePasse = () => {
    if (!website || !username || !secretKey) {
      alert(t.validation.required);
      return;
    }

    setChargement(true);
    setTimeout(() => {
      generatePassword(website, username, secretKey, complexite);
      setChargement(false);
    }, 1000);
  };

  const copierDansLePressePapier = async () => {
    try {
      await navigator.clipboard.writeText(password);
      setCopieReussie(true);
      setTimeout(() => setCopieReussie(false), 2000);
    } catch (err) {
      console.error('Erreur lors de la copie:', err);
    }
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const menuItems = [
    { id: 'home', icon: FaHome },
    { id: 'features', icon: FaTools },
    { id: 'faq', icon: FaQuestionCircle },
    { id: 'about', icon: FaInfoCircle },
  ];

  return (
    <div className="min-h-screen bg-[#1a1a2e]">
      <ProgressBar />
      {/* Navigation */}
      <nav className={`fixed ${isMobile ? 'top-0 left-0 w-full h-16' : 'left-0 top-1/2 -translate-y-1/2 h-auto w-16'} 
        bg-gray-900/30 backdrop-blur-xl flex ${isMobile ? 'flex-row justify-around items-center px-4' : 'flex-col items-center gap-8 py-6 px-2 rounded-r-2xl'} z-50
        transition-all duration-300`}>
        <div className={`absolute inset-0 bg-gradient-to-b from-purple-500/10 to-emerald-500/10 ${isMobile ? 'rounded-b-2xl' : 'rounded-r-2xl'}`}></div>

        {menuItems.map((item) => (
          <div key={item.id} className="relative group">
            {!isMobile && (
              <div className={`absolute left-0 w-1 h-8 rounded-r-full transition-all duration-300 transform -translate-y-1/2 top-1/2
                ${activeSection === item.id ? 'bg-gradient-to-b from-purple-500 to-emerald-500' : 'bg-transparent group-hover:bg-white/20'}`}
              ></div>
            )}
            <button
              onClick={() => scrollToSection(item.id)}
              className={`relative p-2 rounded-xl transition-all duration-300 group 
                ${activeSection === item.id
                  ? 'text-white bg-white/10 shadow-lg shadow-white/5'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
              <item.icon className={`text-xl transition-transform duration-300 ${activeSection === item.id ? 'scale-110' : 'group-hover:scale-110'}`} />

              {!isMobile && (
                <span className="absolute left-14 px-3 py-2 bg-gray-900/90 backdrop-blur text-white text-xs rounded-lg
                  opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap border border-white/10
                  shadow-lg shadow-black/20 pointer-events-none">
                  {t.nav[item.id]}
                  <span className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 border-[6px] border-transparent
                    border-r-gray-900/90"></span>
                </span>
              )}
            </button>
          </div>
        ))}

        <div className="relative group">
          <button
            onClick={toggleLanguage}
            className={`relative p-2 rounded-xl transition-all duration-300 text-gray-400 hover:text-white hover:bg-white/5 group
              ${isMobile ? 'flex items-center gap-2' : ''}`}
          >
            <FaLanguage className="text-xl transition-transform duration-300 group-hover:scale-110" />
            {isMobile && <span className="text-sm">{language === 'fr' ? 'EN' : 'FR'}</span>}
            {!isMobile && (
              <span className="absolute left-14 px-3 py-2 bg-gray-900/90 backdrop-blur text-white text-xs rounded-lg
                opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap border border-white/10
                shadow-lg shadow-black/20 pointer-events-none">
                {language === 'fr' ? 'English' : 'Français'}
                <span className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 border-[6px] border-transparent
                  border-r-gray-900/90"></span>
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className={`${isMobile ? 'pt-20 px-4' : 'pl-20'} w-full`}>
        <Helmet>
          <title>{t.generator.title}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        </Helmet>

        {/* Home Section */}
        <section id="home" className="min-h-screen flex flex-col items-center justify-center py-8 sm:py-20">
          <div className="glass-effect p-4 sm:p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 hover:scale-[1.02] mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-white mb-6 sm:mb-8 flex items-center justify-center gap-2 fade-in-up">
              <FaShieldAlt className="text-2xl sm:text-3xl animate-bounce text-purple-400" />
              {t.generator.title}
            </h1>
            <div className="space-y-4 sm:space-y-6">
              <div className="relative fade-in-up" style={{ animationDelay: '0.1s' }}>
                <label className="block text-white font-medium mb-2 text-sm sm:text-base">{t.generator.website}</label>
                <div className="relative">
                  <FaGlobe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 z-10" />
                  <input
                    type="text"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="pl-10 pr-4 py-2 sm:py-3 w-full border-2 border-white/20 rounded-lg focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all duration-300 text-gray-900 bg-white/90 text-sm sm:text-base"
                    placeholder={t.generator.websitePlaceholder}
                    title={t.generator.tooltips.website}
                  />
                </div>
              </div>
              <div className="relative fade-in-up" style={{ animationDelay: '0.2s' }}>
                <label className="block text-white font-medium mb-2 text-sm sm:text-base">{t.generator.username}</label>
                <div className="relative">
                  <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400 z-10" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10 pr-4 py-2 sm:py-3 w-full border-2 border-white/20 rounded-lg focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all duration-300 text-gray-900 bg-white/90 text-sm sm:text-base"
                    placeholder={t.generator.usernamePlaceholder}
                    title={t.generator.tooltips.username}
                  />
                </div>
              </div>
              <div className="relative fade-in-up" style={{ animationDelay: '0.3s' }}>
                <label className="block text-white font-medium mb-2 text-sm sm:text-base">{t.generator.secretKey}</label>
                <div className="relative">
                  <FaKey className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-400 z-10" />
                  <input
                    type="password"
                    value={secretKey}
                    onChange={(e) => setSecretKey(e.target.value)}
                    className="pl-10 pr-4 py-2 sm:py-3 w-full border-2 border-white/20 rounded-lg focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all duration-300 text-gray-900 bg-white/90 text-sm sm:text-base"
                    placeholder={t.generator.secretKeyPlaceholder}
                    title={t.generator.tooltips.secretKey}
                  />
                </div>
              </div>
              <div className="fade-in-up" style={{ animationDelay: '0.4s' }}>
                <label className="block text-white font-medium mb-2 text-sm sm:text-base">{t.generator.complexity}</label>
                <select
                  value={complexite}
                  onChange={(e) => setComplexite(e.target.value)}
                  className="w-full py-2 sm:py-3 px-4 border-2 border-white/20 rounded-lg focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-all duration-300 bg-white/90 text-gray-900 text-sm sm:text-base"
                  title={t.generator.tooltips.complexity}
                >
                  <option value="petit">{t.generator.complexityOptions.short}</option>
                  <option value="moyen">{t.generator.complexityOptions.medium}</option>
                  <option value="long">{t.generator.complexityOptions.long}</option>
                </select>
              </div>

              <button
                onClick={genererMotDePasse}
                className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white p-2 sm:p-3 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] font-medium shadow-lg hover:shadow-xl fade-in-up text-sm sm:text-base"
                style={{ animationDelay: '0.5s' }}
                title={t.generator.shortcuts.generate}
              >
                {chargement ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="spinner"></div>
                    {t.generator.generating}
                  </span>
                ) : (
                  t.generator.generateButton
                )}
              </button>

              {password && (
                <div className="mt-4 sm:mt-6 password-display p-3 sm:p-4 rounded-lg flex items-center justify-between group transition-all duration-300 fade-in-up">
                  <div className="flex-1">
                    <p className="text-gray-900 font-mono text-base sm:text-lg break-all">
                      {password}
                    </p>
                    <div className="mt-2">
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                        <span>Force du mot de passe:</span>
                        <div className="flex-1 h-1.5 sm:h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${strength <= 2 ? 'bg-red-500 w-1/4' :
                              strength <= 4 ? 'bg-yellow-500 w-1/2' :
                                strength <= 6 ? 'bg-green-500 w-3/4' :
                                  'bg-green-600 w-full'
                              }`}
                          ></div>
                        </div>
                        <span className="text-xs">
                          {strength <= 2 ? 'Faible' :
                            strength <= 4 ? 'Moyen' :
                              strength <= 6 ? 'Fort' :
                                'Très fort'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={copierDansLePressePapier}
                      className="copy-button text-purple-400 hover:text-purple-500 transition-all duration-300 p-1.5 sm:p-2 hover:bg-purple-50 rounded-full"
                      title="Copier le mot de passe"
                    >
                      <FaCopy className="text-lg sm:text-xl" />
                    </button>
                    {copieReussie && (
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm animate-fade-in-up">
                        Copié !
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Historique des mots de passe */}
          {history.length > 0 && (
            <div className="glass-effect p-4 sm:p-6 rounded-xl w-full max-w-md mb-6 sm:mb-8">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h2 className="text-lg sm:text-xl font-semibold text-white flex items-center gap-2">
                  <FaHistory className="text-purple-400" />
                  {t.generator.history.title}
                </h2>
                <button
                  onClick={clearHistory}
                  className="text-red-400 hover:text-red-500 transition-colors"
                  title={t.generator.history.clear}
                >
                  <FaTrash />
                </button>
              </div>
              <div className="space-y-2 sm:space-y-3">
                {history.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-2 sm:p-3 bg-white/10 rounded-lg">
                    <div className="flex-1">
                      <p className="text-white font-medium text-sm sm:text-base">{item.website}</p>
                      <p className="text-gray-400 text-xs sm:text-sm">{item.username}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(item.password);
                          setCopieReussie(true);
                          setTimeout(() => setCopieReussie(false), 2000);
                        }}
                        className="text-purple-400 hover:text-purple-500 transition-colors"
                        title={t.generator.history.copy}
                      >
                        <FaCopy />
                      </button>
                      <button
                        onClick={() => deleteFromHistory(item.id)}
                        className="text-red-400 hover:text-red-500 transition-colors"
                        title={t.generator.history.delete}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Features Section */}
        <section id="features" className="min-h-screen py-8 sm:py-16">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-16 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              {t.features.title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
              <div className="fade-in-up glass-effect p-6 rounded-xl" style={{ animationDelay: '0.1s' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-lg bg-blue-400/10">
                    <FaLock className="text-3xl text-blue-400" />
                  </div>
                  <h2 className="text-2xl font-semibold">{t.features.privacy.title}</h2>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  {t.features.privacy.description}
                </p>
              </div>

              <div className="fade-in-up glass-effect p-6 rounded-xl" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-lg bg-emerald-400/10">
                    <FaDesktop className="text-3xl text-emerald-400" />
                  </div>
                  <h2 className="text-2xl font-semibold">{t.features.offline.title}</h2>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  {t.features.offline.description}
                </p>
              </div>

              <div className="fade-in-up glass-effect p-6 rounded-xl" style={{ animationDelay: '0.3s' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-lg bg-purple-400/10">
                    <FaCode className="text-3xl text-purple-400" />
                  </div>
                  <h2 className="text-2xl font-semibold">{t.features.openSource.title}</h2>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  {t.features.openSource.description}
                </p>
              </div>

              <div className="fade-in-up glass-effect p-6 rounded-xl" style={{ animationDelay: '0.4s' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-lg bg-yellow-400/10">
                    <FaShieldAlt className="text-3xl text-yellow-400" />
                  </div>
                  <h2 className="text-2xl font-semibold">{t.features.security.title}</h2>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  {t.features.security.description}
                </p>
              </div>

              <div className="fade-in-up glass-effect p-6 rounded-xl" style={{ animationDelay: '0.5s' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-lg bg-red-400/10">
                    <FaRocket className="text-3xl text-red-400" />
                  </div>
                  <h2 className="text-2xl font-semibold">{t.features.performance.title}</h2>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  {t.features.performance.description}
                </p>
              </div>

              <div className="fade-in-up glass-effect p-6 rounded-xl" style={{ animationDelay: '0.6s' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-lg bg-pink-400/10">
                    <FaUserShield className="text-3xl text-pink-400" />
                  </div>
                  <h2 className="text-2xl font-semibold">{t.features.customization.title}</h2>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  {t.features.customization.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-8 sm:py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-12 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              {t.faq.title}
            </h2>
            <div className="space-y-3 sm:space-y-4">
              {t.faq.items.map((item, index) => (
                <div
                  key={index}
                  className="glass-effect rounded-lg overflow-hidden transition-all duration-300 cursor-pointer"
                  onClick={() => toggleFaq(index)}
                >
                  <div className="p-3 sm:p-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FaChevronRight
                        className={`text-emerald-400 transition-transform duration-300 ${activeFaq === index ? 'rotate-90' : ''
                          }`}
                      />
                      <h3 className="text-base sm:text-lg font-semibold text-white">{item.question}</h3>
                    </div>
                  </div>
                  <div
                    className={`transition-all duration-300 ${activeFaq === index ? 'max-h-48 opacity-100 p-3 sm:p-4' : 'max-h-0 opacity-0 overflow-hidden'
                      }`}
                  >
                    <p className="text-gray-400 text-sm leading-relaxed pl-6">{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-8 sm:py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-12 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              {t.about.title}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
              {/* Mission */}
              <div className="glass-effect p-6 rounded-xl transform hover:scale-[1.02] transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-lg bg-purple-400/10">
                    <FaShieldAlt className="text-3xl text-purple-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white">{t.about.mission}</h3>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  {t.about.description1}
                </p>
              </div>

              {/* Vision */}
              <div className="glass-effect p-6 rounded-xl transform hover:scale-[1.02] transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-lg bg-emerald-400/10">
                    <FaCode className="text-3xl text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white">{t.about.vision}</h3>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  {t.about.description2}
                </p>
              </div>

              {/* Valeurs */}
              <div className="glass-effect p-6 rounded-xl transform hover:scale-[1.02] transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-lg bg-blue-400/10">
                    <FaLock className="text-3xl text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white">Nos Valeurs</h3>
                </div>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                    Sécurité et confidentialité avant tout
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                    Transparence totale du code
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                    Innovation continue
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
                    Accessibilité pour tous
                  </li>
                </ul>
              </div>

              {/* Engagement */}
              <div className="glass-effect p-6 rounded-xl transform hover:scale-[1.02] transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-lg bg-red-400/10">
                    <FaUserShield className="text-3xl text-red-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white">Notre Engagement</h3>
                </div>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
                    Aucune collecte de données
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
                    Fonctionnement 100% hors ligne
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
                    Mises à jour régulières
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
                    Support communautaire actif
                  </li>
                </ul>
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-8 sm:mt-12 text-center">
              <a
                href="https://github.com/adellkl/Password-generator"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-emerald-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:from-purple-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] font-medium shadow-lg hover:shadow-xl text-sm sm:text-base"
              >
                <FaCode className="text-lg sm:text-xl" />
                Contribuer au projet
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;

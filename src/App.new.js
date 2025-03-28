import React, { useState, useEffect } from 'react';
import './App.css';
import {
    FaCopy, FaGlobe, FaUser, FaKey, FaShieldAlt, FaLock,
    FaDesktop, FaCode, FaChevronDown, FaHome, FaQuestionCircle,
    FaInfoCircle, FaTools, FaChevronRight, FaRocket, FaUserShield,
    FaLanguage, FaEye, FaEyeSlash, FaTrash, FaQrcode, FaHistory
} from 'react-icons/fa';
import { Helmet } from 'react-helmet';
import useTranslation from './hooks/useTranslation';
import usePasswordGenerator from './hooks/usePasswordGenerator';

function App() {
    // Tous les hooks d'état au début
    const [website, setWebsite] = useState('');
    const [username, setUsername] = useState('');
    const [secretKey, setSecretKey] = useState('');
    const [complexite, setComplexite] = useState('long');
    const [chargement, setChargement] = useState(false);
    const [copieReussie, setCopieReussie] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [activeFaq, setActiveFaq] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [showQRCode, setShowQRCode] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Les hooks personnalisés
    const { t, language, toggleLanguage } = useTranslation();
    const {
        password,
        history,
        strength,
        generatePassword,
        clearHistory,
        deleteFromHistory,
        getStrengthLabel
    } = usePasswordGenerator();

    // Les effets
    useEffect(() => {
        if (t && t.generator && t.generator.website && t.generator.username && t.generator.secretKey) {
            setIsLoading(false);
        }
    }, [t]);

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
    }, [password, clearHistory, genererMotDePasse, copierDansLePressePapier]);

    // Les fonctions
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

    // Rendu conditionnel pour le chargement
    if (!t || !t.generator) {
        return (
            <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center">
                <div className="text-white text-xl">Chargement des traductions...</div>
            </div>
        );
    }

    // Le reste du JSX reste inchangé
    return (
    // ... reste du code ...
  );
}

export default App; 
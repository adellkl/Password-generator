import { useState, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const STORAGE_KEY = 'password_history';
const MAX_HISTORY = 10;

const defaultOptions = {
    showPassword: false,
    excludeChars: '',
    avoidAmbiguous: true,
    customChars: '',
    memorable: false
};

const ambiguousChars = '0O1Il';
const defaultChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';

const usePasswordGenerator = () => {
    const [password, setPassword] = useState('');
    const [history, setHistory] = useState([]);
    const [options, setOptions] = useState(() => {
        const savedOptions = localStorage.getItem('password_options');
        return savedOptions ? JSON.parse(savedOptions) : defaultOptions;
    });
    const [strength, setStrength] = useState(0);

    useEffect(() => {
        const savedHistory = localStorage.getItem(STORAGE_KEY);
        if (savedHistory) {
            setHistory(JSON.parse(savedHistory));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('password_options', JSON.stringify(options));
    }, [options]);

    const calculateStrength = (pwd) => {
        let score = 0;
        if (pwd.length >= 8) score += 1;
        if (pwd.length >= 12) score += 1;
        if (pwd.length >= 16) score += 1;
        if (/[A-Z]/.test(pwd)) score += 1;
        if (/[a-z]/.test(pwd)) score += 1;
        if (/[0-9]/.test(pwd)) score += 1;
        if (/[^A-Za-z0-9]/.test(pwd)) score += 1;
        return Math.min(score, 7);
    };

    const generateMemorablePassword = () => {
        const words = [
            'voiture', 'maison', 'chat', 'chien', 'oiseau', 'fleur', 'arbre', 'livre',
            'table', 'chaise', 'fenetre', 'porte', 'mur', 'plafond', 'sol', 'lumiere',
            'temps', 'espace', 'amour', 'joie', 'paix', 'bonheur', 'sourire', 'musique',
            'couleur', 'forme', 'odeur', 'gout', 'toucher', 'vue', 'ouie', 'pensee'
        ];
        const wordCount = 4;
        let result = '';
        for (let i = 0; i < wordCount; i++) {
            const randomIndex = Math.floor(Math.random() * words.length);
            result += words[randomIndex];
            if (i < wordCount - 1) result += '-';
        }
        return result;
    };

    const generatePassword = (website, username, secretKey, complexity) => {
        let chars = options.customChars || defaultChars;

        if (options.excludeChars) {
            chars = chars.replace(new RegExp(`[${options.excludeChars}]`, 'g'), '');
        }

        if (options.avoidAmbiguous) {
            chars = chars.replace(new RegExp(`[${ambiguousChars}]`, 'g'), '');
        }

        if (options.memorable) {
            const newPassword = generateMemorablePassword();
            setPassword(newPassword);
            setStrength(calculateStrength(newPassword));
            return newPassword;
        }

        let length;
        switch (complexity) {
            case 'petit':
                length = 8;
                break;
            case 'moyen':
                length = 12;
                break;
            case 'long':
                length = 20;
                break;
            default:
                length = 20;
        }

        let newPassword = '';
        for (let i = 0; i < length; i++) {
            newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        setPassword(newPassword);
        setStrength(calculateStrength(newPassword));

        // Add to history
        const newEntry = {
            id: Date.now(),
            password: newPassword,
            website,
            username,
            date: new Date().toISOString()
        };

        setHistory(prev => {
            const updated = [newEntry, ...prev].slice(0, MAX_HISTORY);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return updated;
        });

        return newPassword;
    };

    const clearHistory = () => {
        setHistory([]);
        localStorage.removeItem(STORAGE_KEY);
    };

    const deleteFromHistory = (id) => {
        setHistory(prev => {
            const updated = prev.filter(item => item.id !== id);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return updated;
        });
    };

    const getStrengthLabel = () => {
        if (strength <= 2) return 'weak';
        if (strength <= 4) return 'medium';
        if (strength <= 6) return 'strong';
        return 'veryStrong';
    };

    const getQRCode = () => {
        const qr = new QRCodeCanvas({
            value: password,
            size: 256,
            level: 'H',
            includeMargin: true
        });
        return qr.toDataURL();
    };

    return {
        password,
        history,
        options,
        strength,
        generatePassword,
        clearHistory,
        deleteFromHistory,
        setOptions,
        getStrengthLabel,
        getQRCode
    };
};

export default usePasswordGenerator; 
import { useState, useEffect } from 'react';

const translations = {
    fr: {
        nav: {
            home: 'Accueil',
            features: 'Fonctionnalités',
            faq: 'FAQ',
            about: 'À propos'
        },
        generator: {
            title: 'PSWD - Générateur',
            website: 'Site Web',
            websitePlaceholder: 'Exemple: nike.com',
            username: 'Nom d\'utilisateur',
            usernamePlaceholder: 'Exemple: john_doe',
            secretKey: 'Clé secrète',
            secretKeyPlaceholder: 'Exemple: MaCléSecrète123$',
            complexity: 'Complexité du mot de passe',
            complexityOptions: {
                short: 'Court (8 caractères)',
                medium: 'Moyen (12 caractères)',
                long: 'Long (20 caractères)'
            },
            generating: 'Génération en cours...',
            generateButton: 'Générer le mot de passe 😎',
            copied: 'Copié !',
            options: {
                title: 'Options de génération',
                showPassword: 'Afficher le mot de passe',
                hidePassword: 'Masquer le mot de passe',
                excludeChars: 'Exclure des caractères',
                excludeCharsPlaceholder: 'Exemple: 0O1Il',
                avoidAmbiguous: 'Éviter les caractères ambigus',
                customChars: 'Caractères personnalisés',
                customCharsPlaceholder: 'Exemple: abc123!@#',
                memorable: 'Mot de passe mémorable',
                savePassword: 'Sauvegarder le mot de passe',
                sharePassword: 'Partager le mot de passe',
                strength: 'Force du mot de passe',
                strengthLevels: {
                    weak: 'Faible',
                    medium: 'Moyen',
                    strong: 'Fort',
                    veryStrong: 'Très fort'
                }
            },
            history: {
                title: 'Historique des mots de passe',
                empty: 'Aucun mot de passe généré',
                clear: 'Effacer l\'historique',
                copy: 'Copier',
                delete: 'Supprimer'
            },
            shortcuts: {
                generate: 'Générer (Ctrl + G)',
                copy: 'Copier (Ctrl + C)',
                clear: 'Effacer (Ctrl + L)'
            },
            tooltips: {
                website: 'Le nom du site web pour lequel vous générez le mot de passe',
                username: 'Votre nom d\'utilisateur sur ce site',
                secretKey: 'Une clé secrète personnelle pour la génération',
                complexity: 'Choisissez la longueur du mot de passe',
                customChars: 'Définissez vos propres caractères pour la génération',
                excludeChars: 'Spécifiez les caractères à exclure',
                avoidAmbiguous: 'Évite les caractères qui peuvent être confondus',
                memorable: 'Génère un mot de passe basé sur des mots',
                strength: 'Indique la force de votre mot de passe'
            }
        },
        scroll: 'Découvrez pourquoi nous sommes différents',
        features: {
            title: 'Pourquoi nous choisir ?',
            privacy: {
                title: 'Confidentialité Absolue',
                description: 'Vos données restent sur votre appareil. Aucune information ne quitte jamais votre ordinateur.'
            },
            offline: {
                title: '100% Hors-ligne',
                description: 'Fonctionne sans Internet. Testez-le en mode avion !'
            },
            openSource: {
                title: 'Open Source',
                description: 'Code source transparent et vérifié par la communauté.'
            },
            security: {
                title: 'Sécurité Maximale',
                description: 'Chiffrement de bout en bout sur votre appareil.'
            },
            performance: {
                title: 'Performance',
                description: 'Génération instantanée et interface réactive.'
            },
            customization: {
                title: 'Personnalisation',
                description: 'Adaptez la complexité selon vos besoins.'
            }
        },
        faq: {
            title: 'Questions Fréquentes',
            items: [
                {
                    question: "Comment PSWD protège-t-il mes mots de passe ?",
                    answer: "PSWD utilise une cryptographie avancée pour générer des mots de passe uniques. Toutes les opérations sont effectuées localement sur votre appareil, sans connexion à des serveurs externes."
                },
                {
                    question: "Qu'est-ce qui rend PSWD différent ?",
                    answer: "Contrairement aux autres solutions, PSWD est 100% open source, fonctionne hors ligne et ne collecte absolument aucune donnée. Nous priorisons votre confidentialité avant tout."
                },
                {
                    question: "Les mots de passe sont-ils vraiment aléatoires ?",
                    answer: "Notre générateur utilise un système à haute entropie basé sur des algorithmes cryptographiques reconnus. Chaque caractère est sélectionné de manière vraiment aléatoire."
                },
                {
                    question: "Les mots de passe générés sont-ils sécurisés ?",
                    answer: "Oui ! Nos mots de passe respectent les recommandations NIST et ANSSI, incluant une combinaison optimale de caractères spéciaux, de chiffres et de lettres."
                },
                {
                    question: "Puis-je personnaliser la génération ?",
                    answer: "Absolument ! Vous pouvez choisir la longueur et la complexité de vos mots de passe. Nous proposons différents profils adaptés à vos besoins spécifiques."
                },
                {
                    question: "Comment dois-je stocker mes mots de passe ?",
                    answer: "Nous recommandons d'utiliser un gestionnaire de mots de passe chiffré pour stocker vos identifiants. Évitez de les écrire en clair ou de les stocker dans des fichiers non sécurisés."
                }
            ]
        },
        about: {
            title: 'À propos de PSWD',
            mission: 'Notre Mission',
            vision: 'Notre Vision',
            description1: 'PSWD est né de la volonté de créer un outil de génération de mots de passe qui respecte pleinement la confidentialité des utilisateurs. Notre mission est de rendre la sécurité accessible à tous, sans compromettre la confidentialité.',
            description2: 'En tant que projet open source, nous croyons en la transparence totale et la collaboration communautaire. Chaque ligne de code est accessible et vérifiable, garantissant la confiance de nos utilisateurs.'
        },
        validation: {
            required: 'Ce champ est requis',
            minLength: 'Le mot de passe doit contenir au moins 8 caractères',
            maxLength: 'Le mot de passe ne doit pas dépasser 50 caractères',
            invalidChars: 'Caractères non autorisés',
            success: 'Mot de passe généré avec succès'
        }
    },
    en: {
        nav: {
            home: 'Home',
            features: 'Features',
            faq: 'FAQ',
            about: 'About'
        },
        generator: {
            title: 'PSWD - Generator',
            website: 'Website',
            websitePlaceholder: 'Example: nike.com',
            username: 'Username',
            usernamePlaceholder: 'Example: john_doe',
            secretKey: 'Secret Key',
            secretKeyPlaceholder: 'Example: MySecret123$',
            complexity: 'Password Complexity',
            complexityOptions: {
                short: 'Short (8 characters)',
                medium: 'Medium (12 characters)',
                long: 'Long (20 characters)'
            },
            generating: 'Generating...',
            generateButton: 'Generate Password 😎',
            copied: 'Copied!',
            options: {
                title: 'Generation Options',
                showPassword: 'Show Password',
                hidePassword: 'Hide Password'
            },
            history: {
                title: 'Password History',
                empty: 'No passwords generated',
                clear: 'Clear History',
                copy: 'Copy',
                delete: 'Delete'
            }
        },
        scroll: 'Discover why we are different',
        features: {
            title: 'Why Choose Us?',
            privacy: {
                title: 'Absolute Privacy',
                description: 'Your data stays on your device.'
            },
            offline: {
                title: '100% Offline',
                description: 'Works without internet.'
            },
            openSource: {
                title: 'Open Source',
                description: 'Transparent source code.'
            },
            security: {
                title: 'Maximum Security',
                description: 'End-to-end encryption on your device.'
            },
            performance: {
                title: 'Performance',
                description: 'Instant generation and reactive interface.'
            },
            customization: {
                title: 'Customization',
                description: 'Adapt complexity to your needs.'
            }
        },
        faq: {
            title: 'Frequently Asked Questions',
            items: [
                {
                    question: "How does PSWD protect my passwords?",
                    answer: "PSWD uses advanced cryptography to generate unique passwords."
                },
                {
                    question: "What makes PSWD different?",
                    answer: "Unlike other solutions, PSWD is 100% open source, works offline, and collects absolutely no data. We prioritize your privacy above all."
                },
                {
                    question: "Are the passwords truly random?",
                    answer: "Our generator uses a high-entropy system based on recognized cryptographic algorithms. Each character is selected in a truly random manner."
                },
                {
                    question: "Are generated passwords secure?",
                    answer: "Yes! Our passwords comply with NIST and ANSSI recommendations, including an optimal combination of special characters, numbers, and letters."
                },
                {
                    question: "Can I customize the generation?",
                    answer: "Absolutely! You can choose the length and complexity of your passwords. We offer different profiles adapted to your specific needs."
                },
                {
                    question: "How should I store my passwords?",
                    answer: "We recommend using an encrypted password manager to store your credentials. Avoid writing them in plain text or storing them in unsecured files."
                }
            ]
        },
        about: {
            title: 'About PSWD',
            mission: 'Our Mission',
            vision: 'Our Vision',
            description1: 'PSWD was born from the desire to create a password generation tool that fully respects user privacy. Our mission is to make security accessible to everyone, without compromising privacy.',
            description2: 'As an open source project, we believe in total transparency and community collaboration. Every line of code is accessible and verifiable, ensuring our users\' trust.'
        }
    }
};

const useTranslation = () => {
    const [language, setLanguage] = useState(() => {
        const savedLanguage = localStorage.getItem('language');
        return savedLanguage || 'fr';
    });

    useEffect(() => {
        localStorage.setItem('language', language);
    }, [language]);

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'fr' ? 'en' : 'fr');
    };

    // Fonction pour fusionner récursivement les objets
    const deepMerge = (target, source) => {
        const output = { ...target };
        for (const key in source) {
            if (isObject(target[key]) && isObject(source[key])) {
                output[key] = deepMerge(target[key], source[key]);
            } else {
                output[key] = source[key];
            }
        }
        return output;
    };

    // Fonction utilitaire pour vérifier si une valeur est un objet
    const isObject = (item) => {
        return item && typeof item === 'object' && !Array.isArray(item);
    };

    // Créer une copie profonde de l'objet de traduction par défaut
    const defaultTranslation = JSON.parse(JSON.stringify(translations.fr));

    // Fusionner avec les traductions de la langue sélectionnée
    const selectedTranslation = translations[language] || {};

    // Créer un objet de traduction complet en fusionnant les traductions par défaut avec celles de la langue sélectionnée
    const t = deepMerge(defaultTranslation, selectedTranslation);

    return { t, language, toggleLanguage };
};

export default useTranslation;

import React, { useState } from 'react';
import './App.css';
import { FaCopy, FaGlobe, FaUser, FaKey, FaShieldAlt } from 'react-icons/fa';
import { Helmet } from 'react-helmet';

function App() {
  const [motDePasse, setMotDePasse] = useState('');
  const [chargement, setChargement] = useState(false);
  const [complexite, setComplexite] = useState('long');

  const genererMotDePasse = () => {
    setChargement(true);
    setTimeout(() => {
      const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
      let nouveauMotDePasse = '';
      let longueur;
      switch (complexite) {
        case 'petit':
          longueur = 8;
          break;
        case 'moyen':
          longueur = 12;
          break;
        case 'long':
          longueur = 20;
          break;
        default:
          longueur = 20;
      }
      for (let i = 0; i < longueur; i++) {
        nouveauMotDePasse += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
      }
      setMotDePasse(nouveauMotDePasse);
      setChargement(false);
    }, 2000);
  };

  const copierDansLePressePapier = () => {
    navigator.clipboard.writeText(motDePasse);
    alert('Mot de passe copié dans le presse-papier');
  };

  return (
    <>
      <div className="background-container"></div>
      <div className="min-h-screen flex flex-col items-center justify-center text-white p-6">
        <Helmet>
          <title>PSWD - Générateur de mots de passe</title>
        </Helmet>
        <div className="bg-white/95 backdrop-blur-sm text-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 hover:scale-[1.02]">
          <h1 className="text-4xl font-bold text-center text-purple-700 mb-8 flex items-center justify-center gap-2">
            <FaShieldAlt className="text-3xl animate-bounce" />
            PSWD - Générateur
          </h1>
          <div className="space-y-6">
            <div className="relative">
              <label className="block text-gray-700 font-medium mb-2">Site web</label>
              <div className="relative">
                <FaGlobe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  className="pl-10 pr-4 py-3 w-full border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300"
                  placeholder="Exemple : nike.com"
                />
              </div>
            </div>
            <div className="relative">
              <label className="block text-gray-700 font-medium mb-2">Nom d'utilisateur</label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  className="pl-10 pr-4 py-3 w-full border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300"
                  placeholder="Exemple : adel_loukal"
                />
              </div>
            </div>
            <div className="relative">
              <label className="block text-gray-700 font-medium mb-2">Clé secrète</label>
              <div className="relative">
                <FaKey className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  className="pl-10 pr-4 py-3 w-full border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300"
                  placeholder="Exemple : Adelbg9210$"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Complexité du mot de passe</label>
              <select
                className="w-full py-3 px-4 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 bg-white"
                value={complexite}
                onChange={(e) => setComplexite(e.target.value)}
              >
                <option value="petit">Petit (8 caractères)</option>
                <option value="moyen">Moyen (12 caractères)</option>
                <option value="long">Long (20 caractères)</option>
              </select>
            </div>
            <button
              onClick={genererMotDePasse}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white p-3 rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] font-medium shadow-lg hover:shadow-xl"
            >
              {chargement ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Génération en cours...
                </span>
              ) : (
                'Générer le mot de passe 😎'
              )}
            </button>
            {motDePasse && (
              <div className="mt-6 bg-gray-50 p-4 rounded-lg border-2 border-gray-200 flex items-center justify-between group hover:border-purple-300 transition-all duration-300">
                <p className="text-gray-900 font-mono text-lg break-all">{motDePasse}</p>
                <button
                  onClick={copierDansLePressePapier}
                  className="text-gray-400 hover:text-purple-600 transition-all duration-300 p-2 hover:bg-purple-50 rounded-full"
                >
                  <FaCopy className="text-xl" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

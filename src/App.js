// src/App.js
import React, { useState } from 'react';
import './App.css';
import { FaCopy } from 'react-icons/fa';
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
    <div className="min-h-screen flex flex-col items-center justify-center relative">
      <Helmet>
        <title>Pashword - Générateur de mots de passe</title>
        <meta name="description" content="Pashword est un générateur de mots de passe sécurisés qui crée des mots de passe complexes pour protéger vos comptes." />
        <meta name="keywords" content="générateur de mots de passe, mots de passe sécurisés, sécurité en ligne" />
        <meta name="author" content="Votre Nom" />
        <meta property="og:title" content="Pashword - Générateur de mots de passe" />
        <meta property="og:description" content="Pashword est un générateur de mots de passe sécurisés qui crée des mots de passe complexes pour protéger vos comptes." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://votresiteweb.com" />
        <meta property="og:image" content="https://votresiteweb.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pashword - Générateur de mots de passe" />
        <meta name="twitter:description" content="Pashword est un générateur de mots de passe sécurisés qui crée des mots de passe complexes pour protéger vos comptes." />
        <meta name="twitter:image" content="https://votresiteweb.com/twitter-image.jpg" />
      </Helmet>
      <div className="relative z-10">
        <h1 className="text-5xl font-bold text-white mb-8 ">-- MDP --</h1>
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <div className="mb-4">
            <label className="block text-gray-700">Site web</label>
            <input type="text" className="mt-1 p-2 w-full border rounded" placeholder="Exemple : nike.com" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Nom d'utilisateur</label>
            <input type="text" className="mt-1 p-2 w-full border rounded" placeholder="Exemple : adel_loukal" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Clé secrète</label>
            <input type="password" className="mt-1 p-2 w-full border rounded" placeholder="Exemple : Adelbg9210$" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Complexité du mot de passe</label>
            <select
              className="mt-1 p-2 w-full border rounded"
              value={complexite}
              onChange={(e) => setComplexite(e.target.value)}
            >
              <option value="petit">Petit</option>
              <option value="moyen">Moyen</option>
              <option value="long">Long</option>
            </select>
          </div>
          <button 
            onClick={genererMotDePasse}
            className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700 transition duration-300"
          >
            Générer le mot de passe 😎
          </button>
          {chargement ? (
            <div className="mt-4 text-center">
              <div className="spinner  ml-36 mt-4"></div>
            </div>
          ) : (
            motDePasse && (
              <div className="mt-8 bg-gray-100 p-2 rounded flex items-center justify-between">
                <p className="text-gray-700 font-mono text-lg">{motDePasse}</p>
                <button 
                  onClick={copierDansLePressePapier}
                  className="text-gray-500 hover:text-gray-700 transition duration-300"
                >
                  <FaCopy />
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

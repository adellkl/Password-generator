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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 to-black text-white p-6">
      <Helmet>
        <title>MDP - Générateur de mots de passe</title>
      </Helmet>
      <div className="bg-white text-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-4xl font-bold text-center text-purple-700 mb-6">MDP - Générateur</h1>
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
            className="mt-1 p-2 w-full border rounded bg-gray-100"
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
          <div className="mt-4 text-center text-purple-700 font-bold">Chargement...</div>
        ) : (
          motDePasse && (
            <div className="mt-6 bg-gray-200 p-3 rounded flex items-center justify-between">
              <p className="text-gray-900 font-mono text-lg break-all">{motDePasse}</p>
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
  );
}

export default App;

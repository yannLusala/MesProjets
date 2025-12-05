# 🌦️ Application Météo (Open-Meteo, sans clé API)

Une application simple et responsive pour rechercher la météo d'une ville, avec géocodage et prévisions sur 5 jours. Construite avec HTML, CSS et JavaScript (modules ES6).

## ✨ Fonctionnalités
- 🔎 Recherche de ville (géocodage Open‑Meteo)
- ☁️ Météo actuelle (température, vent)
- 📅 Prévision 5 jours (max/min + icône)
- ⚠️ Gestion d'erreurs (ville introuvable, réseau)
- 📱 UI responsive

## 🚀 Démarrage
1. Ouvrez `index.html` dans un navigateur moderne
2. Tapez une ville (ex: "Paris") et validez

> Aucune clé API requise. Les données proviennent de `open-meteo.com`.

## 🗂️ Structure
```
Projets/Projet-3-MeteoApp/
├── index.html
├── css/
│   └── style.css
└── js/
    ├── app.js         # Logique d'application (événements, flux)
    ├── api.js         # Appels API (géocodage + météo)
    └── ui.js          # Rendu UI (status, météo, prévisions)
```

## 🧠 Concepts pédagogiques
- Découpage en modules : `app` (contrôle), `api` (données), `ui` (affichage)
- Asynchrone avec `async/await` et `try/catch`
- Séparation des responsabilités
- Utilisation de `URLSearchParams`, `fetch`, et `dataset`

## 🔧 Personnalisation & idées d'amélioration
- 🌍 Choix d'unités (°C/°F)
- 📌 Géolocalisation (position actuelle)
- 🕒 Détails horaires (hourly)
- 🌈 Thèmes clair/sombre
- 💾 Historique des recherches

---


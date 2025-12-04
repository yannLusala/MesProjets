# 📝 Todo List - Application de Gestion de Tâches

Une application web moderne et responsive pour gérer vos tâches quotidiennes, construite avec HTML5, CSS3 et JavaScript ES6+.

## ✨ Fonctionnalités

### 🎯 Gestion des tâches
- ✅ Ajouter de nouvelles tâches
- ✅ Marquer les tâches comme terminées/non terminées
- ✅ Modifier le texte des tâches
- ✅ Supprimer des tâches individuelles

### 🔍 Recherche et filtrage
- 🔎 Recherche en temps réel dans les tâches
- 📊 Filtres : Toutes, Actives, Terminées
- 📈 Statistiques en temps réel

### 💾 Persistance des données
- 🗄️ Sauvegarde automatique dans le localStorage
- 🔄 Chargement automatique au démarrage
- 🧹 Actions en masse (supprimer terminées, tout marquer)

### 🎨 Interface utilisateur
- 📱 Design responsive (mobile-friendly)
- 🎭 Animations et transitions fluides
- 🌈 Interface moderne avec dégradés
- ⌨️ Raccourcis clavier

## 🚀 Installation et utilisation

1. **Cloner ou télécharger** le projet
2. **Ouvrir** `index.html` dans un navigateur web moderne
3. **Commencer** à ajouter vos tâches !

## 🛠️ Technologies utilisées

- **HTML5** : Structure sémantique et accessible
- **CSS3** : Flexbox, animations, responsive design
- **JavaScript ES6+** : Classes, modules, localStorage, DOM manipulation
- **Font Awesome** : Icônes vectorielles

## 📁 Structure du projet

```
Projet-1-TodoList/
├── index.html          # Page principale
├── css/
│   └── style.css       # Styles CSS
├── js/
│   ├── app.js          # Application principale
│   ├── todo.js         # Classe Todo
│   └── storage.js      # Gestion du localStorage
└── README.md           # Documentation
```

## 🎮 Utilisation

### Ajouter une tâche
1. Tapez votre tâche dans le champ de saisie
2. Cliquez sur "Ajouter" ou appuyez sur Entrée

### Gérer les tâches
- **Cocher** : Cliquez sur la case à cocher pour marquer comme terminée
- **Modifier** : Cliquez sur l'icône crayon pour éditer
- **Supprimer** : Cliquez sur l'icône poubelle pour supprimer

### Rechercher et filtrer
- **Recherche** : Tapez dans le champ de recherche
- **Filtres** : Utilisez les boutons "Toutes", "Actives", "Terminées"

### Actions en masse
- **Supprimer terminées** : Supprime toutes les tâches cochées
- **Tout marquer** : Marque toutes les tâches comme terminées

## ⌨️ Raccourcis clavier

- **Ctrl + Entrée** : Focus sur le champ de saisie
- **Échap** : Vider la recherche

## 🔧 Fonctionnalités techniques

### Architecture modulaire
- **Todo.js** : Classe représentant une tâche
- **StorageManager.js** : Gestion de la persistance
- **App.js** : Logique principale de l'application

### Gestion d'état
- État centralisé dans la classe `TodoApp`
- Mise à jour réactive de l'interface
- Synchronisation automatique avec le localStorage

### Sécurité
- Échappement HTML pour éviter les injections
- Validation des entrées utilisateur
- Gestion d'erreurs robuste

## 🎯 Objectifs pédagogiques atteints

Ce projet démontre la maîtrise de :
- ✅ Programmation orientée objet en JavaScript
- ✅ Manipulation avancée du DOM
- ✅ Gestion des événements
- ✅ Persistance des données (localStorage)
- ✅ Architecture modulaire (ES6 modules)
- ✅ Design responsive et UX moderne
- ✅ Gestion d'état d'application
- ✅ Code propre et maintenable

## 🚀 Améliorations possibles

- 🌐 Synchronisation avec un serveur
- 👥 Gestion multi-utilisateurs
- 📅 Dates d'échéance
- 🏷️ Système de catégories/tags
- 📊 Graphiques et statistiques avancées
- 🌙 Mode sombre
- 📱 Application mobile (PWA)

---

**Développé avec ❤️ dans le cadre de l'apprentissage JavaScript**

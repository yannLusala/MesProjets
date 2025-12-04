<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title><?= $pageTitle ?? "Gestion d'utilisateurs"; ?></title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="public/css/style.css">
</head>

<body>

<header class="main-header">
    <div class="header-container">
        <h2 class="logo">Gestion d'utilisateurs</h2>

        <nav class="nav-links">
            <a href="index.php?action=list">Utilisateurs</a>
            <a href="index.php?action=create">Ajouter</a>
            <a href="index.php?action=login">Connexion</a>
        </nav>
    </div>
</header>

<!-- Contenu principal -->
<main class="main-content">

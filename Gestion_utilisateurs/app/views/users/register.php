<?php
    $pageTitle = "Creer un compte";
    include __DIR__ . '/../layouts/header.php';
?>

<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Creation de compte</title>
        <link rel="stylesheet" href="css/style.css">
    </head>
    <body>
        <div class="container">

            <h1>Creer un compte</h1>

            <?php if (!empty($errorMessage)): ?>
                <p style="color:red; margin-bottom:15px;"><?= htmlspecialchars($errorMessage) ?></p>
            <?php endif; ?>
        
            <form action="index.php?action=register" method="POST" class="form-box">

                <div class="form-group">
                    <label for="fullname">Nom complet :</label>
                    <input type="text" id="fullname" name="fullname" required>
                </div>
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="password">Mot de passe :</label>
                    <input type="password" id="password" name="password" required>
                </div>

                <button type="submit" class="btn">S'inscrire</button>
            </form>

            <p style="margin-top:15px;">
                Pas encore inscrit ? <a href="index.php?action=register">Créer un compte</a>
            </p>
        </div>

        <?php 
            include __DIR__ . '/../layouts/footer.php'; 
        ?>
    </body>
</html>

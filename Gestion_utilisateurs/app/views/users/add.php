<?php 
$pageTitle = "Ajouter un utilisateur";
include __DIR__ . '/../layouts/header.php';
?>

<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="utf-8">
        <title>Ajout des utilisateurs</title>
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <link rel="stylesheet" href="css/style.css">
    </head>
    <body>
        <div class="container">

            <h1>Ajouter un utilisateur</h1>

            <form action="index.php?action=store" method="POST" class="form-box">
                
                <div class="form-group">
                    <label for="fullname">Nom complet :</label>
                    <input type="text" id="fullname" name="fullname" required>
                </div>

                <div class="form-group">
                    <label for="email">Adresse email :</label>
                    <input type="email" id="email" name="email" required>
                </div>

                <div class="form-group">
                    <label for="password">Mot de passe :</label>
                    <input type="password" id="password" name="password" required>
                </div>

                <button type="submit" class="btn">Enregistrer</button>
            </form>
        </div>
    </body>
</html>

<?php include __DIR__ . '/../layouts/footer.php'; ?>

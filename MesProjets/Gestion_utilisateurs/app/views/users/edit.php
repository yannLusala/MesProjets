<?php 
$pageTitle = "Modifier un utilisateur";
include __DIR__ . '/../layouts/header.php';
?>

<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="utf-8">
        <title>Modifier un utilisateurs</title>
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <link rel="stylesheet" href="css/style.css">
    </head>
    <body>
        <div class="container">

            <h1>Modifier un utilisateur</h1>

            <?php if ($user): ?>
            <form action="index.php?action=update&id=<?= $user['id'] ?>" method="POST" class="form-box">

                <div class="form-group">
                    <label for="fullname">Nom complet :</label>
                    <input 
                        type="text" 
                        id="fullname" 
                        name="fullname" 
                        value="<?= htmlspecialchars($user['fullname']) ?>" 
                        required
                    >
                </div>

                <div class="form-group">
                    <label for="email">Adresse email :</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value="<?= htmlspecialchars($user['email']) ?>" 
                        required
                    >
                </div>

                <div class="form-group">
                    <label for="password">Nouveau mot de passe (laisser vide si inchangé) :</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password"
                    >
                </div>

                <button type="submit" class="btn">Mettre à jour</button>
            </form>

            <?php else: ?>
                <p style="color:red;">Utilisateur introuvable.</p>
            <?php endif; ?>

        </div>
    </body>
</html>

<?php include __DIR__ . '/../layouts/footer.php'; ?>

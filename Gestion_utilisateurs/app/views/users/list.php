<?php
    $pageTitle = "Liste des utilisateurs";
    include __DIR__ . '/../layouts/header.php';
?>
<?php
$users = $users ?? [];
?>
<!doctype html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <title>Liste des utilisateurs</title>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="container">

        <h1>Liste des utilisateurs</h1>

        <a href="index.php?action=create" class="btn">Ajouter un utilisateur</a>

        <table class="users-table" border="1" cellpadding="8" cellspacing="0">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nom complet</th>
                    <th>Email</th>
                    <th>Date de création</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                <?php if (!empty($users)): ?>
                    <?php foreach ($users as $user): ?>
                        <tr>
                            <td><?= htmlspecialchars($user['id'])?></td>
                            <td><?= htmlspecialchars($user['fullname'])?></td>
                            <td><?= htmlspecialchars($user['email']) ?></td>
                            <td><?= htmlspecialchars($user['created_at']) ?></td>
                            <td>
                                <a href="index.php?action=edit&id=<?= urlencode($user['id']) ?>" class="edit">Modifier</a>
                                |
                                <a href="index.php?action=delete&id=<?= urlencode($user['id']) ?>" class="delete">Supprimer</a>
                            </td>
                        </tr>
                    <?php endforeach; ?>

                <?php else: ?>
                    <tr>
                        <td colspan="5">Aucun utilisateur trouvé</td>
                    </tr>
                <?php endif; ?>
            </tbody>
        </table>
    </div>
</body>
</html>

<?php
    include __DIR__ . '/../layouts/footer.php';
?>
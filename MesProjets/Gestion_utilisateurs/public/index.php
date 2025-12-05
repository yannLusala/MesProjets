<?php

    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    require_once __DIR__ . '/../app/controllers/UserController.php';

    session_start();

    // Instanciation du controller
    $userController = new UserController();

    // Recuperation du controller
    $action = $_GET['action'] ?? 'list';

    // Routage selon l'action demandee
    switch($action)
    {
        case 'list':
            $userController->index();
            break;
        case 'create':
            $userController->create();
            break;
        case 'store':
            $userController->store();
            break;
        case 'edit':
            if(isset($_GET['id']))
            {
                $userController->edit($_GET['id']);
            }
            break;
        case 'update':
            if(isset($_GET['id']) && $_SERVER['REQUEST_METHOD'] === 'POST')
            {
                $userController->update($_GET['id']);
            }
            break;
        case 'delete':
            if(isset($_GET['id']))
            {
                $userController->delete($_GET['id']);
            }
            break;
        case 'login':
            $userController->login();
            break;
        case 'register':
            $userController->register();
            break;

        default:
            echo "Action inconnue !";
            break;
    }
?>
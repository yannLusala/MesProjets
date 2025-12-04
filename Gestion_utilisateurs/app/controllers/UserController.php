<?php

    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
    
    require_once __DIR__ . '/../models/User.php';

    class UserController{

        private $userModel;

        public function __construct()
        {
            $this->userModel = new User();
        }

        // Liste des utilisateurs

        public function index()
        {
            $users = $this->userModel->getAll();
            include __DIR__ .'/../views/users/list.php';
        }
        // Afficher le formulaire de creation d'un utilisateur

        public function create()
        {
            include __DIR__ . '/../views/users/add.php';
        }

        // Traitement du formulaire de creation d'un utilisateur

        public function store()
        {
            if(isset($_POST['fullname'], $_POST['email'], $_POST['password']))
            {
                $fullname = trim($_POST['fullname']);
                $email = trim($_POST['email']);
                $password = $_POST['password'];

                // verification email unique
                if($this->userModel->getByEmail($email))
                {
                    echo "L'email existe deja. Veuillez en choisir un autre.";
                    return;
                }

                $this->userModel->create($fullname, $email, $password);

                header("Location: index.php?action=list");
                exit();
            }
        }

        // Afficher le formulaire de modification d'un utilisateur

        public function edit($id)
        {
            $user = $this->userModel->getById($id);

            if(!$user)
            {
                die("Utilisateur introuvable !");
            }

            include __DIR__ . '/../views/users/edit.php';
        }

        // Traitement du formulaire de modification d'un utilisateur

        public function update($id)
        {
            if(isset($_POST['fullname'], $_POST['email']))
            {
                $fullname = trim($_POST['fullname']);
                $email = trim($_POST['email']);
                $password = $_POST['password'] ?? null;

                $this->userModel->update($id, $fullname, $email, $password);

                header("Location: index.php?action=list");
                exit();
            }
        }

        // Traitement de la suppression d'un utilisateur

        public function delete($id)
        {
            if($this->userModel->delete($id))
            {
                header("Location: index.php?action=list");
                exit();
            }
            else{
                echo "Erreur lors de la suppression de l'utilisateur.";
            }

        }

        // Connexion d'un utilisateur

        public function login()
        {
            $errorMessage = '';

            if($_SERVER['REQUEST_METHOD'] === 'POST')
            {
                $email = $_POST['email'];
                $password = $_POST['password'];

                $user = $this->userModel->getByEmail($email);

                if($user && password_verify($password, $user['password']))
                {
                    // On peut stocker les informations de l'utilisateur dans la session
                    $_SESSION['user'] = $user;

                    header("Location: index.php?action=list");
                    exit();
                }
                else{
                    $errorMessage = "Identifiants incorrects";
                }

            }
            else{
                include __DIR__ .'/../views/users/login.php';
            }
        }

        // Inscription utilisateur

        public function register()
        {
            $errorMessage = '';

            if ($_SERVER['REQUEST_METHOD'] === 'POST') 
            {
                $fullname = $_POST['fullname'];
                $email = $_POST['email'];
                $password = $_POST['password'];

                // Vérifier si email existe déjà
                $existingUser = $this->userModel->getByEmail($email);

                if ($existingUser) {
                    $errorMessage = "Un utilisateur avec cet email existe déjà.";
                } 
                else 
                {

                    // Appeler la méthode create du modèle
                    $this->userModel->create($fullname, $email, $hashedPassword);

                    // Redirection vers la liste
                    header("Location: index.php?action=list");
                    exit();
                }
            }

            include __DIR__ . '/../views/users/register.php';
        }

    }
?>
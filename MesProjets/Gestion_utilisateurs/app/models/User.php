<?php

    require_once __DIR__ . '/../config/Database.php';

    class User{

        private $conn;
        private $table = "users";

        public function __construct()
        {
            $database = new Database();
            $this->conn = $database->getConnection();
        }

        // Méthode pour créer un nouvel utilisateur

        public function create($fullname, $email, $password)
        {
            $sql = "INSERT INTO " . $this->table . " (fullname, email, password) VALUES (:fullname, :email, :password)";
            $stmt = $this->conn->prepare($sql);

            // Hash du mot de passe avant de le stocker
            $hashed_password = password_hash($password, PASSWORD_BCRYPT);

            $stmt->bindParam(':fullname', $fullname);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':password', $hashed_password);

            return $stmt->execute();
        }

        // Methode pour recuperer tous les utilisateurs

        public function getAll()
        {
            $sql = "SELECT * FROM " . $this->table . " ORDER BY id DESC";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
            
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        // Methode pour recuperer un utilisateur par son id
        public function getById($id)
        {
            $sql = "SELECT * FROM " .$this->table . " WHERE id = :id LIMIT 1";
            $stmt = $this->conn->prepare($sql);

            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
            $stmt->execute();

            return $stmt->fetch(PDO::FETCH_ASSOC);
        }

        // Verifier si un email est deja utilise
        public function getByEmail($email)
        {
            $sql = "SELECT * FROM " . $this->table . " WHERE email = :email LIMIT 1";
            $stmt = $this->conn->prepare($sql);

            $stmt->bindParam(':email', $email);
            $stmt->execute();

            return $stmt->fetch(PDO::FETCH_ASSOC);
        }

        // Methode pour modifier un utilisateur

        public function update($id, $fullname, $email, $password = null)
        {
            // Verification de l'insertion du mot de passe

            if(empty($password))
            {
                // Sans changer le mot de passe
                $sql = "UPDATE " . $this->table . " SET fullname = :fullname, email = :email WHERE id = :id";
                $stmt = $this->conn->prepare($sql);
            }
            else{
                // Avec changement de mot de passe
                $sql = "UPDATE " . $this->table . " SET fullname = :fullname, email = :email, password = :password WHERE id = :id";
                $stmt = $this->conn->prepare($sql);

                $hashed_password = password_hash($password, PASSWORD_BCRYPT);
                $stmt->bindParam(':password', $hashed_password);
            }
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':fullname', $fullname);
            $stmt->bindParam(':email', $email);

            return $stmt->execute();
        }

        // Methode pour supprimer un utilisateur

        public function delete($id)
        {
            $sql = "DELETE FROM " . $this->table . " WHERE id = :id";
            $stmt = $this->conn->prepare($sql);

            $stmt->bindParam(':id', $id, PDO::PARAM_INT);

            return $stmt->execute();
        }

        // Methode pour la connexion d'un utilisateur

        public function login($email, $password)
        {
            $sql = "SELECT * FROM " . $this->table . " WHERE email = :email LIMIT 1";
            $stmt = $this->conn->prepare($sql);

            $stmt->bindParam(':email', $email);
            $stmt->execute();

            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if($user && password_verify($password, $user['password']))
            {
                return $user; // Connexion reussie
            }

            return false; // Echec de la connexion
        }
    }
?>
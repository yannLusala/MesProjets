import { Todo } from './todo.js';

/**
 * Classe StorageManager - Gère la persistance des données
 */
export class StorageManager {
    constructor(storageKey = 'todoListApp') {
        this.storageKey = storageKey;
    }

    /**
     * Sauvegarde les tâches dans le localStorage
     */
    saveTodos(todos) {
        try {
            const todosData = todos.map(todo => todo.toJSON());
            localStorage.setItem(this.storageKey, JSON.stringify(todosData));
            return true;
        } catch (error) {
            console.error('Erreur lors de la sauvegarde:', error);
            return false;
        }
    }

    /**
     * Charge les tâches depuis le localStorage
     */
    loadTodos() {
        try {
            const data = localStorage.getItem(this.storageKey);
            if (!data) return [];

            const todosData = JSON.parse(data);
            return todosData.map(data => Todo.fromJSON(data));
        } catch (error) {
            console.error('Erreur lors du chargement:', error);
            return [];
        }
    }

    /**
     * Supprime toutes les données du localStorage
     */
    clearStorage() {
        try {
            localStorage.removeItem(this.storageKey);
            return true;
        } catch (error) {
            console.error('Erreur lors de la suppression:', error);
            return false;
        }
    }

    /**
     * Vérifie si le localStorage est disponible
     */
    isAvailable() {
        try {
            const test = '__localStorage_test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * Retourne la taille utilisée par le localStorage
     */
    getStorageSize() {
        try {
            const data = localStorage.getItem(this.storageKey);
            return data ? new Blob([data]).size : 0;
        } catch (error) {
            return 0;
        }
    }
}


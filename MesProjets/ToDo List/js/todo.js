/**
 * Classe Todo - Représente une tâche individuelle
 */
export class Todo {
    constructor(text, id = null) {
        this.id = id || this.generateId();
        this.text = text.trim();
        this.completed = false;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    /**
     * Génère un ID unique pour la tâche
     */
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).slice(2);
    }

    /**
     * Marque la tâche comme terminée ou non terminée
     */
    toggle() {
        this.completed = !this.completed;
        this.updatedAt = new Date();
    }

    /**
     * Met à jour le texte de la tâche
     */
    updateText(newText) {
        this.text = newText.trim();
        this.updatedAt = new Date();
    }

    /**
     * Retourne une représentation JSON de la tâche
     */
    toJSON() {
        return {
            id: this.id,
            text: this.text,
            completed: this.completed,
            createdAt: this.createdAt.toISOString(),
            updatedAt: this.updatedAt.toISOString()
        };
    }

    /**
     * Crée une instance Todo à partir d'un objet JSON
     */
    static fromJSON(data) {
        const todo = new Todo(data.text, data.id);
        todo.completed = data.completed;
        todo.createdAt = new Date(data.createdAt);
        todo.updatedAt = new Date(data.updatedAt);
        return todo;
    }
}


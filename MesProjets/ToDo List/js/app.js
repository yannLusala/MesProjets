import { Todo } from './todo.js';
import { StorageManager } from './storage.js';

/**
 * Classe TodoApp - Application principale
 */
class TodoApp {
    constructor() {
        this.todos = [];
        this.filteredTodos = [];
        this.currentFilter = 'all';
        this.searchTerm = '';
        this.storage = new StorageManager();
        
        this.initializeElements();
        this.bindEvents();
        this.loadTodos();
        this.render();
    }

    /**
     * Initialise les références aux éléments DOM
     */
    initializeElements() {
        // Formulaire d'ajout
        this.addTaskForm = document.getElementById('addTaskForm');
        this.taskInput = document.getElementById('taskInput');
        
        // Contrôles
        this.searchInput = document.getElementById('searchInput');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        
        // Statistiques
        this.totalTasksEl = document.getElementById('totalTasks');
        this.activeTasksEl = document.getElementById('activeTasks');
        this.completedTasksEl = document.getElementById('completedTasks');
        
        // Conteneurs
        this.tasksContainer = document.getElementById('tasksContainer');
        this.emptyState = document.getElementById('emptyState');
        
        // Actions en masse
        this.clearCompletedBtn = document.getElementById('clearCompleted');
        this.markAllCompleteBtn = document.getElementById('markAllComplete');
    }

    /**
     * Attache les événements aux éléments
     */
    bindEvents() {
        // Formulaire d'ajout
        this.addTaskForm.addEventListener('submit', (e) => this.handleAddTask(e));
        
        // Recherche
        this.searchInput.addEventListener('input', (e) => this.handleSearch(e));
        
        // Filtres
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleFilter(e));
        });
        
        // Actions en masse
        this.clearCompletedBtn.addEventListener('click', () => this.clearCompleted());
        this.markAllCompleteBtn.addEventListener('click', () => this.markAllComplete());
        
        // Raccourcis clavier
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }

    /**
     * Gère l'ajout d'une nouvelle tâche
     */
    handleAddTask(e) {
        e.preventDefault();
        
        const text = this.taskInput.value.trim();
        if (!text) {
            this.showMessage('Veuillez entrer une tâche valide', 'error');
            return;
        }

        const todo = new Todo(text);
        this.todos.unshift(todo); // Ajouter au début
        this.taskInput.value = '';
        
        this.saveTodos();
        this.filterTodos();
        this.render();
        this.showMessage('Tâche ajoutée avec succès !', 'success');
    }

    /**
     * Gère la recherche
     */
    handleSearch(e) {
        this.searchTerm = e.target.value.toLowerCase();
        this.filterTodos();
        this.render();
    }

    /**
     * Gère le filtrage
     */
    handleFilter(e) {
        // Mettre à jour les boutons actifs
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        
        this.currentFilter = e.target.dataset.filter;
        this.filterTodos();
        this.render();
    }

    /**
     * Filtre les tâches selon les critères
     */
    filterTodos() {
        let filtered = [...this.todos];

        // Filtre par statut
        switch (this.currentFilter) {
            case 'active':
                filtered = filtered.filter(todo => !todo.completed);
                break;
            case 'completed':
                filtered = filtered.filter(todo => todo.completed);
                break;
            // 'all' - pas de filtre supplémentaire
        }

        // Filtre par recherche
        if (this.searchTerm) {
            filtered = filtered.filter(todo => 
                todo.text.toLowerCase().includes(this.searchTerm)
            );
        }

        this.filteredTodos = filtered;
    }

    /**
     * Affiche les tâches dans le DOM
     */
    render() {
        this.updateStats();
        this.renderTasks();
        this.updateEmptyState();
    }

    /**
     * Met à jour les statistiques
     */
    updateStats() {
        const total = this.todos.length;
        const completed = this.todos.filter(todo => todo.completed).length;
        const active = total - completed;

        this.totalTasksEl.textContent = total;
        this.activeTasksEl.textContent = active;
        this.completedTasksEl.textContent = completed;
    }

    /**
     * Affiche les tâches
     */
    renderTasks() {
        this.tasksContainer.innerHTML = '';

        this.filteredTodos.forEach(todo => {
            const taskElement = this.createTaskElement(todo);
            this.tasksContainer.appendChild(taskElement);
        });
    }

    /**
     * Crée un élément DOM pour une tâche
     */
    createTaskElement(todo) {
        const taskDiv = document.createElement('div');
        taskDiv.className = `task-item ${todo.completed ? 'completed' : ''}`;
        taskDiv.dataset.id = todo.id;

        taskDiv.innerHTML = `
            <input 
                type="checkbox" 
                class="task-checkbox" 
                ${todo.completed ? 'checked' : ''}
            >
            <span class="task-text">${this.escapeHtml(todo.text)}</span>
            <div class="task-actions">
                <button class="task-btn btn-edit" title="Modifier">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="task-btn btn-delete" title="Supprimer">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;

        // Événements pour cette tâche
        const checkbox = taskDiv.querySelector('.task-checkbox');
        const editBtn = taskDiv.querySelector('.btn-edit');
        const deleteBtn = taskDiv.querySelector('.btn-delete');
        const taskText = taskDiv.querySelector('.task-text');

        // Toggle completion
        checkbox.addEventListener('change', () => this.toggleTodo(todo.id));

        // Édition
        editBtn.addEventListener('click', () => this.editTodo(todo.id, taskText));

        // Suppression
        deleteBtn.addEventListener('click', () => this.deleteTodo(todo.id));

        return taskDiv;
    }

    /**
     * Bascule l'état d'une tâche
     */
    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.toggle();
            this.saveTodos();
            this.filterTodos();
            this.render();
        }
    }

    /**
     * Édite une tâche
     */
    editTodo(id, textElement) {
        const todo = this.todos.find(t => t.id === id);
        if (!todo) return;

        const newText = prompt('Modifier la tâche:', todo.text);
        if (newText !== null && newText.trim() !== '') {
            todo.updateText(newText);
            this.saveTodos();
            this.filterTodos();
            this.render();
            this.showMessage('Tâche modifiée avec succès !', 'success');
        }
    }

    /**
     * Supprime une tâche
     */
    deleteTodo(id) {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
            this.todos = this.todos.filter(t => t.id !== id);
            this.saveTodos();
            this.filterTodos();
            this.render();
            this.showMessage('Tâche supprimée !', 'success');
        }
    }

    /**
     * Supprime toutes les tâches terminées
     */
    clearCompleted() {
        const completedCount = this.todos.filter(t => t.completed).length;
        if (completedCount === 0) {
            this.showMessage('Aucune tâche terminée à supprimer', 'error');
            return;
        }

        if (confirm(`Supprimer ${completedCount} tâche(s) terminée(s) ?`)) {
            this.todos = this.todos.filter(t => !t.completed);
            this.saveTodos();
            this.filterTodos();
            this.render();
            this.showMessage(`${completedCount} tâche(s) supprimée(s) !`, 'success');
        }
    }

    /**
     * Marque toutes les tâches comme terminées
     */
    markAllComplete() {
        const activeCount = this.todos.filter(t => !t.completed).length;
        if (activeCount === 0) {
            this.showMessage('Toutes les tâches sont déjà terminées !', 'error');
            return;
        }

        if (confirm(`Marquer ${activeCount} tâche(s) comme terminée(s) ?`)) {
            this.todos.forEach(todo => {
                if (!todo.completed) todo.toggle();
            });
            this.saveTodos();
            this.filterTodos();
            this.render();
            this.showMessage(`${activeCount} tâche(s) marquée(s) comme terminée(s) !`, 'success');
        }
    }

    /**
     * Met à jour l'état vide
     */
    updateEmptyState() {
        if (this.filteredTodos.length === 0) {
            this.emptyState.style.display = 'block';
            this.tasksContainer.style.display = 'none';
        } else {
            this.emptyState.style.display = 'none';
            this.tasksContainer.style.display = 'block';
        }
    }

    /**
     * Gère les raccourcis clavier
     */
    handleKeyboard(e) {
        // Ctrl + Enter pour ajouter une tâche
        if (e.ctrlKey && e.key === 'Enter') {
            this.taskInput.focus();
        }
        
        // Échap pour vider la recherche
        if (e.key === 'Escape') {
            this.searchInput.value = '';
            this.searchTerm = '';
            this.filterTodos();
            this.render();
        }
    }

    /**
     * Sauvegarde les tâches
     */
    saveTodos() {
        this.storage.saveTodos(this.todos);
    }

    /**
     * Charge les tâches
     */
    loadTodos() {
        this.todos = this.storage.loadTodos();
        this.filterTodos();
    }

    /**
     * Affiche un message temporaire
     */
    showMessage(text, type = 'success') {
        // Supprimer les messages existants
        const existingMessages = document.querySelectorAll('.message');
        existingMessages.forEach(msg => msg.remove());

        // Créer le nouveau message
        const message = document.createElement('div');
        message.className = `message ${type}`;
        message.textContent = text;

        // Insérer après l'en-tête
        const header = document.querySelector('.header');
        header.insertAdjacentElement('afterend', message);

        // Supprimer après 3 secondes
        setTimeout(() => {
            message.remove();
        }, 3000);
    }

    /**
     * Échappe le HTML pour éviter les injections
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialiser l'application quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    new TodoApp();
});


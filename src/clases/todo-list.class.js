import { Todo } from '.';

export class TodoList {
    constructor() {
        this.todos = this.cargarLocalStorage();
    }

    nuevoTodo(todo) {
        this.todos.unshift(todo);
        this.guardarLocalStorage();
    }
    eliminarTodo(id) {
        this.todos = this.todos.filter((todo) => todo.id !== id);
        this.guardarLocalStorage();
    }

    eliminarCompletados() {
        this.todos = this.todos.filter((todo) => !todo.completado);
        this.guardarLocalStorage();
    }

    actualizarTodo(id) {
        for (const todo of this.todos) {
            if (todo.id === id) {
                todo.completado = !todo.completado;
                break;
            }
        }
        this.guardarLocalStorage();
    }

    contarPendientes() {
        return this.todos.filter((todo) => todo.completado === false).length;
    }

    guardarLocalStorage() {
        localStorage.setItem('todoList', JSON.stringify(this.todos));
    }

    cargarLocalStorage() {
        const storage = JSON.parse(localStorage.getItem('todoList')) || [];

        return storage.map((todo) => Todo.fromJson(todo));
    }
}

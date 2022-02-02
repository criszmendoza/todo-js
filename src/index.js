import './styles.css';
import { Todo, TodoList } from './clases';
import { crearTodoHtml } from './js/componentes';

const todoList = new TodoList();

const todoListHtml = document.querySelector('.todo-list');
const textInput = document.querySelector('.new-todo');
const borrarCompletados = document.querySelector('.clear-completed');
const contadorPendientes = document.querySelector('.todo-count strong');

textInput.addEventListener('keyup', (event) => {
    const text = event.target.value.trim(),
        keyCode = event.keyCode;

    if (keyCode === 13) {
        if (text.length > 0) {
            const todo = new Todo(text);
            todoList.nuevoTodo(todo);
            todoListHtml.insertAdjacentHTML('afterbegin', crearTodoHtml(todo));
        }
        textInput.value = '';
    }
    contadorPendientes.textContent = todoList.contarPendientes();
});

todoListHtml.addEventListener('click', (event) => {
    const nombreElemento = event.target.localName;
    const todoElemento = event.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id');

    if (nombreElemento === 'button') {
        todoList.eliminarTodo(todoId);
        todoListHtml.removeChild(todoElemento);
    } else if (nombreElemento === 'input') {
        todoList.actualizarTodo(todoId);
        todoElemento.classList.toggle('completed');
        todoElemento.checked = false;
    }
    contadorPendientes.textContent = todoList.contarPendientes();
});

borrarCompletados.addEventListener('click', () => {
    const completados = document.querySelectorAll('.completed');

    for (const todo of completados) {
        todoListHtml.removeChild(todo);
    }
    todoList.eliminarCompletados();
    contadorPendientes.textContent = todoList.contarPendientes();
});

document.addEventListener('click', (e) => {
    if (e.target.className.includes('filtro')) {
        const filtro = e.target.textContent;
        const todos = todoListHtml.children;
        const buttonsFiltro = document.querySelectorAll('.selected');

        buttonsFiltro.forEach((btn) => btn.classList.remove('selected'));
        e.target.classList.add('selected');

        switch (filtro) {
            case 'Todos':
                for (const todo of todos) {
                    todo.style.display = 'block';
                }
                break;
            case 'Pendientes':
                for (const todo of todos) {
                    if (todo.className.includes('completed')) {
                        todo.style.display = 'none';
                    } else {
                        todo.style.display = 'block';
                    }
                }
                break;
            case 'Completados':
                for (const todo of todos) {
                    if (!todo.className.includes('completed')) {
                        todo.style.display = 'none';
                    } else {
                        todo.style.display = 'block';
                    }
                }
                break;
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const todos = todoList.todos;
    if (todos.length > 0) {
        for (const todo of todos) {
            todoListHtml.insertAdjacentHTML('beforeend', crearTodoHtml(todo));
        }
    }
    contadorPendientes.textContent = todoList.contarPendientes();
});

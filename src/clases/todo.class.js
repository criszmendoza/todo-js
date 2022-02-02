export class Todo {
    static fromJson(todo) {
        const { tarea, id, completado, creado } = todo;
        return new Todo(tarea, id, completado, creado);
    }

    constructor(
        tarea,
        id = String(new Date().getTime()),
        completado = false,
        creado = new Date().toISOString()
    ) {
        this.tarea = tarea;
        this.id = id;
        this.completado = completado;
        this.creado = creado;
    }
}

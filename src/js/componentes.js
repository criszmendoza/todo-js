export const crearTodoHtml = (todo) => {
    const { tarea, id, completado } = todo;

    const html = `
	<li class=${completado && 'completed'} data-id=${id}>
		<div class="view">
			<input class="toggle" type="checkbox" ${completado && 'checked'}>
			<label>${tarea}</label>
			<button class="destroy"></button>
		</div>
		<input class="edit" value="Create a TodoMVC template">
	</li>
	`;

    return html;
};

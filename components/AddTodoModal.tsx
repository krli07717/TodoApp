import * as React from 'react';


const AddTodoModal = () => {
	return (
		<form>
			<input placeholder='Todo title' type='text'/>
			<br />
			<textarea placeholder='Description..' />
			<br />
			<label>Due Date:</label><input placeholder='Choose due' type='date'/>
			<br />
			<input name="isDone" type="checkbox"/><label>Completed</label>
			<br />
			<button type="submit">Add Todo</button>
		</form>
		);
};

export default AddTodoModal;


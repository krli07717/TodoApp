import * as React from 'react';

interface TodoProps {
	key: string;
	index: string;
	caption: string;
	description: string;
	addedDate: string;
	due: string;
	isCompleted: boolean;
	ToggleIsComplete: (key: string) => void;
	DeleteTodo: (key: string) => void;
}

const Todo: React.FunctionComponent<TodoProps> = ({key, index, caption, description, addedDate, due, isCompleted, ToggleIsComplete, DeleteTodo}) => {
	return (
		<>
			<h3>{caption}</h3><button type="button">Expand</button>
			<p>{description}</p>
			<h6>Added_{addedDate}</h6>
			<h6>Due_{due}</h6>
			<p>Done_{isCompleted.toString()}</p>
			<button type="button" onClick={()=>ToggleIsComplete(index)}>Complete</button>
			<button type="button">Edit</button>
			<button type="button" onClick={()=>DeleteTodo(index)}>Delete</button>
		</>
	);
};

export default Todo;
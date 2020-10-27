import * as React from 'react';
import {useState} from 'react';

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
	
	const [expand, setExpand] = useState<boolean>(false);

	return (
		<>
			<button type='button' onClick={() => {
				setExpand(!expand);
			}}>...</button><h3>{caption}</h3>
			{
				expand ? <>
									<p>{description}</p>
									<h6>Due_{(due !== "") ? new Date(due).toLocaleDateString('zh-TW', {month: '2-digit', day: '2-digit'}) : 'Due not set'}</h6>
									<h6>Added_{addedDate.slice(5)}</h6>
									<p>Done_{isCompleted.toString()}</p>
								 </> : null
			}
			<button type="button" onClick={()=>ToggleIsComplete(index)}>Complete</button>
			<button type="button">Edit</button>
			<button type="button" onClick={()=>DeleteTodo(index)}>Delete</button>
			<br/>
		</>
	);
};

export default Todo;
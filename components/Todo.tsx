import * as React from 'react';
import {useState} from 'react';
import EditTodoForm from './EditTodoForm';

interface IeditedFormElements {
		index:string;
    editedCaption: string;
    editedDescription: string;
    editedDue: string;
    editedIsDone: boolean;
}

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
	pastDue: boolean;
	EditTodoArray: (editedFormElements:IeditedFormElements) => void;
}

const Todo: React.FunctionComponent<TodoProps> = ({key, index, caption, description, addedDate, due, isCompleted, ToggleIsComplete, DeleteTodo, pastDue, EditTodoArray}) => {
	
	const [expand, setExpand] = useState<boolean>(false); //set to false again when rerender (e.g. after search text/sort)

	const [editMode, setEditMode] = useState<boolean>(false);

	return (
		<>
			<button type='button' onClick={() => {
				setExpand(!expand);
			}}>...</button>
			<h3>{caption}</h3>
			{ pastDue ? <h5>Due!</h5> : null }
			{
				expand ? <>
									<p>{description}</p>
									<h6>Due_{(due !== "") ? new Date(due).toLocaleDateString('zh-TW', {month: '2-digit', day: '2-digit'}) : 'Due not set'}</h6>
									<h6>Added_{addedDate.slice(5)}</h6>
									<p>Done_{isCompleted.toString()}</p>
								 </> : null
			}
			<button type="button" onClick={()=>ToggleIsComplete(index)}>Complete</button>
			<button type="button" onClick={()=>setEditMode(!editMode)}>Edit</button> 
			<button type="button" onClick={()=>DeleteTodo(index)}>Delete</button>
			<br/>
			{editMode ? <EditTodoForm key={key} index={index} caption={caption} description={description} addedDate={addedDate} due={due} isCompleted={isCompleted} 
																SetEditMode={setEditMode} EditTodoArray={EditTodoArray}/> : null}
		</>
	);
};

export default Todo;
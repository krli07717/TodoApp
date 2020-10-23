import * as React from 'react';
import {useRef} from 'react';

interface ITodoProps {
	caption: string;
	description: string;
	addedDate?: Date;
	due?: Date;
	isCompleted: boolean;
}

interface AddTodoModalProps {
	addNewTodoToArray: (childNewForm: ITodoProps) => void;
}

const AddTodoModal: React.FunctionComponent<AddTodoModalProps> = ({addNewTodoToArray}) => {
	
	const newTitleValue = useRef<HTMLInputElement>(null);
	const newDescriptionValue = useRef<HTMLTextAreaElement>(null);
	const newDueDate = useRef<HTMLInputElement>(null);
	const newIsDone = useRef<HTMLInputElement>(null);

	return (
		<form>
			<input placeholder='Todo title' type='text' ref={newTitleValue}/>
			<br />
			<textarea placeholder='Description..' ref={newDescriptionValue} />
			<br />
			<label>Due Date:</label><input placeholder='Choose due' type='date' ref={newDueDate}/>
			<br />
			<input name="isDone" type="checkbox" ref={newIsDone}/><label>Completed</label>
			<br />
			<button type="button" onClick={()=>{
				//to avoid 'error: object is possibly null'
				let newFormElements: ITodoProps | string;
				if ( newTitleValue && newDescriptionValue && newIsDone && newTitleValue.current && newDescriptionValue.current && newIsDone.current) {
					newFormElements = {
							caption: newTitleValue.current.value,
							description: newDescriptionValue.current.value,
							// due: newDueDate.current.value,
							isCompleted: Boolean(newIsDone.current.checked),
					} 
				} else {
					newFormElements = 'Failure building Form. Something is null.'
				}
				if (typeof newFormElements !== 'string') {
					addNewTodoToArray(newFormElements);
				}
			}
			}>Add Todo</button>
		</form>
		);
};

export default AddTodoModal;

// 1. inside child function: use useRefs to get all the form change 
// 2. on child component button click: put all form details into a new object newFormElements (and check if 'current' is null)
// 3. pass the parent function 'addNewTodoToArray' to it (e.g. addNewTodoToArray(newFormElements)) 

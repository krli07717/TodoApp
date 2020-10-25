import * as React from 'react';
import {useRef, useState} from 'react';

interface ITodoProps {
	key: string;
	index: string;
	caption: string;
	description: string;
	addedDate: string;
	due: string;
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

	const [todoKey, setTodoKey] = useState(0)

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
				setTodoKey(todoKey + 1)
				let newFormElements: ITodoProps | string;
				//to avoid 'error: object is possibly null'
				if ( newTitleValue && newDescriptionValue && newIsDone && newDueDate && newDueDate.current && newTitleValue.current && newDescriptionValue.current && newIsDone.current) {
					newFormElements = {
							key: todoKey.toString(),
							index: todoKey.toString(),
							caption: newTitleValue.current.value,
							description: newDescriptionValue.current.value,
							addedDate: (new Date()).toLocaleDateString('zh-TW'),
							due: newDueDate.current.value,
							isCompleted: Boolean(newIsDone.current.checked),
					};
				} else {
					newFormElements = 'Failure building Form. Something is null.'
				}
				if (typeof newFormElements !== 'string' && (newTitleValue && newDescriptionValue && newIsDone && newTitleValue.current && newDescriptionValue.current && newIsDone.current)) {
					addNewTodoToArray(newFormElements);
					// reset form to empty
					newTitleValue.current.value = '';
					description: newDescriptionValue.current.value = '';
					if (newDueDate && newDueDate.current) {newDueDate.current.value = ''}
					newIsDone.current.checked = false;
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

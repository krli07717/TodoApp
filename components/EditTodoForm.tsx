import * as React from 'react';
import {useRef, useState} from 'react';

interface IeditedFormElements {
		index:string;
    editedCaption: string;
    editedDescription: string;
    editedDue: string;
    editedIsDone: boolean;
}

interface EditTodoFormProps {
	key: string;
	index: string;
	caption: string;
	description: string;
	addedDate: string;
	due: string;
	isCompleted: boolean;
	SetEditMode: React.Dispatch<React.SetStateAction<boolean>>;
	EditTodoArray: (editedFormElements:IeditedFormElements) => void;
}

const EditTodoForm: React.FunctionComponent<EditTodoFormProps> = ({key, index, caption, description, addedDate, due, isCompleted, SetEditMode, EditTodoArray}) => {
	
	const editTitleValue = useRef<HTMLInputElement>(null);
	const editDescriptionValue = useRef<HTMLTextAreaElement>(null);
	const editDueDate = useRef<HTMLInputElement>(null);
	const editIsDone = useRef<HTMLInputElement>(null);

	return (
		<form>
			<input contentEditable="true" placeholder='Todo title' type='text' ref={editTitleValue} defaultValue={caption}/>
			<br />
			<textarea contentEditable="true" placeholder='Description..' ref={editDescriptionValue} defaultValue={description}/>
			<br />
			<label>Due Date:</label><input contentEditable="true" placeholder='Choose due' type='date' ref={editDueDate} defaultValue={due}/>
			<br />
			<input contentEditable="true" name="isDone" type="checkbox" ref={editIsDone} defaultChecked={isCompleted}/><label>Completed</label>
			<br />
			<button type="button" onClick={()=>{
				if ( editTitleValue && editDescriptionValue && editIsDone && editDueDate && editDueDate.current && editTitleValue.current && editDescriptionValue.current && editIsDone.current) {
					const editedFormElements: IeditedFormElements = {
						index: index,
						editedCaption: editTitleValue.current.value,
						editedDescription: editDescriptionValue.current.value,
						editedDue: editDueDate.current.value,
						editedIsDone: editIsDone.current.checked,
					}
					EditTodoArray(editedFormElements);
					SetEditMode(false);
				}
			}}>Save</button>
			<button type='button' onClick={()=>{
				SetEditMode(false);
			}}>Cancel</button>
		</form>
		);
};

export default EditTodoForm;
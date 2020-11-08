import React from "react";
import { useRef, useContext } from "react";
import { LanguageContext } from "./languages";

interface IeditedFormElements {
	index: string;
	editedCaption: string;
	editedDescription: string;
	editedDue: string;
	editedIsDone: boolean;
}

interface EditTodoFormProps {
	index: string;
	caption: string;
	description: string;
	due: string;
	isCompleted: boolean;
	SetEditMode: React.Dispatch<React.SetStateAction<boolean>>;
	EditTodoArray: (editedFormElements: IeditedFormElements) => void;
}

const EditTodoForm: React.FunctionComponent<EditTodoFormProps> = ({
	index,
	caption,
	description,
	due,
	isCompleted,
	SetEditMode,
	EditTodoArray,
}) => {
	const editTitleValue = useRef<HTMLInputElement>(null);
	const editDescriptionValue = useRef<HTMLTextAreaElement>(null);
	const editDueDate = useRef<HTMLInputElement>(null);
	const editIsDone = useRef<HTMLInputElement>(null);
	const language = useContext(LanguageContext);

	return (
		<form>
			<input
				contentEditable="true"
				role="editTodoTitle"
				placeholder={language.ToDoTitle}
				type="text"
				ref={editTitleValue}
				defaultValue={caption}
			/>
			<br />
			<textarea
				contentEditable="true"
				placeholder={language.Description}
				ref={editDescriptionValue}
				defaultValue={description}
			/>
			<br />
			<label>{language.Due}</label>
			<input
				contentEditable="true"
				placeholder="Choose due"
				type="date"
				ref={editDueDate}
				defaultValue={due}
			/>
			<br />
			<input
				contentEditable="true"
				name="isDone"
				type="checkbox"
				ref={editIsDone}
				defaultChecked={isCompleted}
			/>
			<label>{language.Completed}</label>
			<br />
			<button
				type="button"
				role="saveEdit"
				onClick={() => {
					if (
						editTitleValue &&
						editDescriptionValue &&
						editIsDone &&
						editDueDate &&
						editDueDate.current &&
						editTitleValue.current &&
						editDescriptionValue.current &&
						editIsDone.current
					) {
						const editedFormElements: IeditedFormElements = {
							index: index,
							editedCaption: editTitleValue.current.value,
							editedDescription: editDescriptionValue.current.value,
							editedDue: editDueDate.current.value,
							editedIsDone: editIsDone.current.checked,
						};
						EditTodoArray(editedFormElements);
						SetEditMode(false);
					}
				}}
			>
				<i className="fas fa-check"></i>
			</button>
			<button
				type="button"
				onClick={() => {
					SetEditMode(false);
				}}
			>
				<i className="fas fa-times"></i>
			</button>
		</form>
	);
};

export default EditTodoForm;

import React from "react";
import { useRef, useContext } from "react";
import { LanguageContext } from "./languages";

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
	SetKeyOfNewTodo: () => void;
	todoKey: number;
	ShowAddTodoForm: () => void;
}

const AddTodoModal: React.FunctionComponent<AddTodoModalProps> = ({
	addNewTodoToArray,
	SetKeyOfNewTodo,
	todoKey,
	ShowAddTodoForm,
}) => {
	const newTitleValue = useRef<HTMLInputElement>(null);
	const newDescriptionValue = useRef<HTMLTextAreaElement>(null);
	const newDueDate = useRef<HTMLInputElement>(null);
	const newIsDone = useRef<HTMLInputElement>(null);
	const language = useContext(LanguageContext);

	return (
		<form>
			<input
				role="newTodoTitleInput"
				placeholder={language.ToDoTitle}
				type="text"
				ref={newTitleValue}
			/>
			<br />
			<textarea
				role="newTodoDescriptionInput"
				placeholder={language.Description}
				ref={newDescriptionValue}
			/>
			<br />
			<label>{language.Due}</label>
			<input role="ChooseDue" type="date" ref={newDueDate} />
			<br />
			<input role="isDone" type="checkbox" ref={newIsDone} />
			<label>{language.Completed}</label>
			<br />
			<button
				type="button"
				role="addTodo"
				onClick={() => {
					SetKeyOfNewTodo();
					console.log(`todoKey: ${todoKey}`);
					let newFormElements: ITodoProps | string;
					//to avoid 'error: object is possibly null'
					if (
						newTitleValue &&
						newDescriptionValue &&
						newIsDone &&
						newDueDate &&
						newDueDate.current &&
						newTitleValue.current &&
						newDescriptionValue.current &&
						newIsDone.current
					) {
						newFormElements = {
							key: todoKey.toString(),
							index: todoKey.toString(),
							caption: newTitleValue.current.value,
							description: newDescriptionValue.current.value,
							addedDate: new Date().toLocaleDateString("zh-TW", {
								year: "numeric",
								month: "2-digit",
								day: "2-digit",
								hour: "numeric",
								minute: "2-digit",
							}),
							due: newDueDate.current.value,
							isCompleted: Boolean(newIsDone.current.checked),
						};
					} else {
						newFormElements = "Failure building Form. Something is null.";
					}
					if (
						typeof newFormElements !== "string" &&
						newTitleValue &&
						newDescriptionValue &&
						newIsDone &&
						newTitleValue.current &&
						newDescriptionValue.current &&
						newIsDone.current
					) {
						addNewTodoToArray(newFormElements);
						// reset form to empty
						newTitleValue.current.value = "";
						description: newDescriptionValue.current.value = "";
						if (newDueDate && newDueDate.current) {
							newDueDate.current.value = "";
						}
						newIsDone.current.checked = false;
					}
				}}
			>
				<i className="fas fa-check"></i>
			</button>
			<button
				type="button"
				onClick={() => {
					ShowAddTodoForm();
				}}
			>
				<i className="fas fa-times"></i>
			</button>
		</form>
	);
};

export default AddTodoModal;

// 1. inside child function: use useRefs to get all the form change
// 2. on child component button click: put all form details into a new object newFormElements (and check if 'current' is null)
// 3. pass the parent function 'addNewTodoToArray' to it (e.g. addNewTodoToArray(newFormElements))

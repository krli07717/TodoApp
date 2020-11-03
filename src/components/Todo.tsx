import React from "react";
import { useState, useContext } from "react";
import EditTodoForm from "./EditTodoForm";
import { LanguageContext } from "./languages";

interface IeditedFormElements {
	index: string;
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
	EditTodoArray: (editedFormElements: IeditedFormElements) => void;
}

const Todo: React.FunctionComponent<TodoProps> = ({
	key,
	index,
	caption,
	description,
	addedDate,
	due,
	isCompleted,
	ToggleIsComplete,
	DeleteTodo,
	pastDue,
	EditTodoArray,
}) => {
	const language = useContext(LanguageContext);

	const [expand, setExpand] = useState<boolean>(false); //set to false again when rerender (e.g. after search text/sort)

	const [editMode, setEditMode] = useState<boolean>(false);

	return (
		<>
			<button
				type="button"
				role="expandTodo"
				onClick={() => {
					setExpand(!expand);
				}}
			>
				...
			</button>
			<h3>{caption}</h3>
			{pastDue ? <h5>DueImage!</h5> : null}
			{expand ? (
				<>
					<p>{description}</p>
					{due !== "" ? (
						<h6>
							{language.Due}:
							{new Date(due).toLocaleDateString("zh-TW", {
								month: "2-digit",
								day: "2-digit",
							})}
						</h6>
					) : null}
					{
						//Bug in eng Mode: still is 下午 there
					}
					<h6>
						{language.AddedDate}:{addedDate.slice(5)}
					</h6>
					<p>Done_{isCompleted.toString()}</p>
				</>
			) : null}
			<button type="button" onClick={() => ToggleIsComplete(index)}>
				V
			</button>
			<button
				type="button"
				role="EditTodoForm"
				onClick={() => setEditMode(!editMode)}
			>
				Pen
			</button>
			<button type="button" role="DeleteTodo" onClick={() => DeleteTodo(index)}>
				X
			</button>
			<br />
			{editMode ? (
				<EditTodoForm
					key={key}
					index={index}
					caption={caption}
					description={description}
					due={due}
					isCompleted={isCompleted}
					SetEditMode={setEditMode}
					EditTodoArray={EditTodoArray}
				/>
			) : null}
		</>
	);
};

export default Todo;

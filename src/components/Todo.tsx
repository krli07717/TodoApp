import React from "react";
import { useState, useContext, lazy, Suspense } from "react";
// import EditTodoForm from "./EditTodoForm";
import { LanguageContext } from "./languages";
import "./Todo.css";

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

	const renderLoader = () => <p styleName="loading"> {language.Loading}</p>;  

	const EditTodoForm = lazy(()=> import('./EditTodoForm'));

	const [expand, setExpand] = useState<boolean>(false); //set to false again when rerender (e.g. after search text/sort)

	const [editMode, setEditMode] = useState<boolean>(false);

	return (
		<div styleName="todo-div">
			<button
				type="button"
				role="expandTodo"
				styleName="todo-children"
				onClick={() => {
					setExpand(!expand);
				}}
			>
				<i className="fas fa-list"></i>
			</button>
			{pastDue && !isCompleted ? (
				<i styleName="todo-children" className="fas fa-exclamation-circle"></i>
			) : null}
			<h3
				styleName={
					isCompleted
						? "background todo-children todo-caption completed"
						: pastDue
						? "background todo-children todo-caption pastDue"
						: "background todo-children todo-caption"
				}
			>
				{caption}
			</h3>
			<button
				type="button"
				styleName="todo-children"
				onClick={() => ToggleIsComplete(index)}
			>
				<i className="far fa-check-circle"></i>
			</button>
			<button
				type="button"
				role="EditTodoForm"
				styleName="todo-children"
				onClick={() => setEditMode(!editMode)}
			>
				<i className="fas fa-pen"></i>
			</button>
			<button
				type="button"
				role="DeleteTodo"
				styleName="todo-children"
				onClick={() => DeleteTodo(index)}
			>
				<i className="far fa-trash-alt"></i>
			</button>
			{expand ? (
				<div styleName="todo-children todo-description">
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
				</div>
			) : null}
			<br />
			{editMode ? (
				<Suspense fallback={renderLoader()}>
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
				</Suspense>
			) : null}
		</div>
	);
};

export default Todo;

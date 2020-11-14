import React from "react";
import Todo from "./Todo";
import { useContext } from "react";
import { LanguageContext } from "./languages";
import "./Todo.css";

interface IeditedFormElements {
	index: string;
	editedCaption: string;
	editedDescription: string;
	editedDue: string;
	editedIsDone: boolean;
}

interface ITodoProps {
	key: string;
	index: string;
	caption: string;
	description: string;
	addedDate: string;
	due: string;
	isCompleted: boolean;
}

interface TodosTableProps {
	SelectByDoneState: string;
	SelectSortMethodState: string;
	SearchText: string;
	TodosArray: ITodoProps[];
	ToggleIsComplete: (index: ITodoProps["index"]) => void;
	DeleteTodo: (index: ITodoProps["index"]) => void;
	EditTodoArray: (editedFormElements: IeditedFormElements) => void;
}

const TodosTable: React.FunctionComponent<TodosTableProps> = ({
	SelectByDoneState,
	SelectSortMethodState,
	SearchText,
	TodosArray,
	ToggleIsComplete,
	DeleteTodo,
	EditTodoArray,
}) => {
	const language = useContext(LanguageContext);

	if (SelectSortMethodState === "Date Added") {
		TodosArray.sort((a, b) => parseInt(a.index) - parseInt(b.index));
	} else if (SelectSortMethodState === "Due") {
		// sort all the NaNs to the last
		TodosArray.sort((a, b) => {
			const dateNumberA = new Date(a.due).getTime();
			const dateNumberB = new Date(b.due).getTime();
			if (isNaN(dateNumberB) || (isNaN(dateNumberA) && isNaN(dateNumberB))) {
				return -1;
			} else if (isNaN(dateNumberA)) {
				return 1;
			} else {
				return dateNumberA - dateNumberB;
			}
		}); // this method of sorting dates may not be the best practice according to stackoverflow
	} else if (SelectSortMethodState === "Caption") {
		TodosArray.sort((a, b) => {
			const captionA = a.caption.toLowerCase();
			const captionB = b.caption.toLowerCase();
			if (captionA < captionB) {
				return -1;
			}
			if (captionA > captionB) {
				return 1;
			}
			return 0;
		});
	}

	let NoResults = 0;

	return (
		<>
			{
				// <h1>Sort by {SelectByDoneState} and {SelectSortMethodState}</h1>
			}
			{TodosArray.length === 0 ? (
				<div>
					<h4 style={{ textAlign: "center" }}>{language.AddYourFirstTodo}</h4>
				</div>
			) : null}
			{TodosArray.filter((todoBySearchText) => {
				if (
					todoBySearchText.caption
						.toLowerCase()
						.includes(SearchText.toLowerCase()) ||
					todoBySearchText.description
						.toLowerCase()
						.includes(SearchText.toLowerCase())
				) {
					return true;
				} else {
					NoResults++;
					return false;
				}
				return (
					todoBySearchText.caption
						.toLowerCase()
						.includes(SearchText.toLowerCase()) ||
					todoBySearchText.description
						.toLowerCase()
						.includes(SearchText.toLowerCase())
				);
			})
				.filter((todoByDoneState) => {
					if (SelectByDoneState === "Done") {
						if (todoByDoneState.isCompleted === true) {
							return true;
						} else {
							NoResults++;
							return false;
						}
					} else if (SelectByDoneState === "To Do") {
						if (todoByDoneState.isCompleted === false) {
							return true;
						} else {
							NoResults++;
							return false;
						}
					} else {
						return todoByDoneState;
					}
				})
				.map((filteredTodo) => {
					// console.log(`filteredTodo: ${filteredTodo}`);
					const {
						key,
						index,
						caption,
						description,
						addedDate,
						due,
						isCompleted,
					} = filteredTodo;
					let pastDue = false;
					const today = new Date();
					if (
						due !== "" &&
						today.getTime() >
							new Date(
								new Date(due).setDate(new Date(due).getDate() + 1)
							).getTime()
					) {
						pastDue = true;
					} //if (today > due.tomorrow)
					return (
						<Todo
							key={key}
							index={index}
							caption={caption}
							description={description}
							addedDate={addedDate}
							due={due}
							isCompleted={isCompleted}
							ToggleIsComplete={ToggleIsComplete}
							DeleteTodo={DeleteTodo}
							pastDue={pastDue}
							EditTodoArray={EditTodoArray}
						/>
					);
				})}
			{NoResults !== 0 && NoResults === TodosArray.length ? (
				<h3 styleName="no-result" style={{ textAlign: "center" }}>
					{language.NoResultsFound}
				</h3>
			) : null}
		</>
	);
};

export default TodosTable;

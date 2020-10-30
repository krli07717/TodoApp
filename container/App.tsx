import * as React from "react";
import { useState } from "react";
import * as ReactDOM from "react-dom";
import ShowTopBarButton from "../components/ShowTopBarButton";
import ShowAddTodoFormButton from "../components/ShowAddTodoFormButton";
import TopBar from "../components/TopBar";
import TodosTable from "../components/TodosTable";
import AddTodoModal from "../components/AddTodoModal";
import { languages, LanguageContext } from "../components/languages";

type DoneState = "All Tasks" | "Done" | "To Do";
type SortMethodState = "Date Added" | "Caption" | "Due";

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

const App = () => {
	const [doneState, setDoneState] = useState<DoneState>("All Tasks");

	const [sortMethodState, setSortMethodState] = useState<SortMethodState>(
		"Date Added"
	);

	const [searchText, setSearchText] = useState<string>("");

	const selectByDone = (option: React.FormEvent<HTMLSelectElement>) => {
		setDoneState(option.currentTarget.value as DoneState);
	};

	const selectSortMethod = (option: React.FormEvent<HTMLSelectElement>) => {
		setSortMethodState(option.currentTarget.value as SortMethodState);
	};

	const onSearchChange = (event: React.FormEvent<HTMLInputElement>) => {
		setSearchText(event.currentTarget.value);
	};

	const TODOS = localStorage.getItem("TODOS");

	const [todosArray, setTodosArray] = useState<ITodoProps[]>(
		TODOS ? JSON.parse(TODOS) : []
	);

	// const [todosArray, setTodosArray] = useState<ITodoProps[]>([])

	const TODOKEY = localStorage.getItem("TODOKEY");

	const [todoKey, setTodoKey] = useState(TODOKEY ? JSON.parse(TODOKEY) + 1 : 0);

	const setKeyOfNewTodo = () => {
		setTodoKey(todoKey + 1);
		localStorage.setItem("TODOKEY", JSON.stringify(todoKey));
	};

	const addNewTodoToArray = (childNewForm: ITodoProps) => {
		console.log("childNewForm:");
		console.log(childNewForm); //if is not initialNewForm, then success passing data from child to parent component
		console.log("todosArray - nothing done");
		console.log(todosArray);
		const newTodosArray = [...todosArray, childNewForm]; //How one should update the array with useState(?). todosArray is async, newTodosArray is sync
		console.log("newTodosArray - setup");
		console.log(newTodosArray);
		console.log("todosArray - after new is setup");
		console.log(todosArray);
		setTodosArray(newTodosArray);
		console.log("newTodosArray - reset array");
		console.log(newTodosArray);
		console.log("todosArray - reset array");
		console.log(todosArray);
		setShowAddTodoForm(!showAddTodoFormState);
		localStorage.setItem("TODOS", JSON.stringify(newTodosArray));
	};

	const toggleIsComplete = (index: ITodoProps["index"]) => {
		console.log(`filtered by index${index}:`);
		console.log(todosArray.filter((todo) => todo.index === index)); //how to get updated todosArray since setTodosArray() does not update itself immediately?
		const newTodosArray = [...todosArray];
		for (const todo of newTodosArray) {
			if (todo.index === index) {
				todo.isCompleted = !todo.isCompleted;
			}
		} //Async is screwed up
		setTodosArray(newTodosArray);
		localStorage.setItem("TODOS", JSON.stringify(newTodosArray));
	};

	const deleteTodo = (index: ITodoProps["index"]) => {
		console.log(`todosArray before deleting, newTodosArray`);
		console.log(todosArray);
		const newTodosArray = [...todosArray];
		for (let i = 0; i < newTodosArray.length; i++) {
			if (newTodosArray[i].index === index) {
				newTodosArray.splice(i, 1);
			}
		} // not the best practice since accessing by index now takes O(n) instead of O(1)
		setTodosArray(newTodosArray);
		console.log(`todosArray after deleting, newTodosArray`);
		console.log(todosArray);
		console.log(newTodosArray);
		localStorage.setItem("TODOS", JSON.stringify(newTodosArray));
	};

	const [showTopBarState, setShowTopBarState] = useState<boolean>(false);

	const [showAddTodoFormState, setShowAddTodoForm] = useState<boolean>(false);

	const showTopBar = () => {
		setShowTopBarState(!showTopBarState);
	};

	const showAddTodoForm = () => {
		setShowAddTodoForm(!showAddTodoFormState);
	};

	const editTodoArray = (editedFormElements: IeditedFormElements) => {
		console.log("success!");
		console.log(editedFormElements);
		const {
			index,
			editedCaption,
			editedDescription,
			editedDue,
			editedIsDone,
		} = editedFormElements;
		const newTodosArray = [...todosArray];
		for (const todo of newTodosArray) {
			if (todo.index === index) {
				todo.caption = editedCaption;
				todo.description = editedDescription;
				todo.due = editedDue;
				todo.isCompleted = editedIsDone;
			}
		}
		console.log("newTodosArray after reassignment");
		console.log(newTodosArray);
		setTodosArray(newTodosArray);
		console.log("todosArray after reassignment");
		console.log(todosArray);
		localStorage.setItem("TODOS", JSON.stringify(newTodosArray));
	};

	const languagePreference = localStorage.getItem("TWLanguage");

	const [TWLanguage, setTWLanguage] = useState<boolean>(
		languagePreference ? JSON.parse(languagePreference) : true
	);

	const changeLanguage = () => {
		setTWLanguage(!TWLanguage);
		localStorage.setItem("TWLanguage", JSON.stringify(!TWLanguage));
	};

	return (
		<>
			<LanguageContext.Provider
				value={
					(languagePreference ? JSON.parse(languagePreference) : TWLanguage)
						? languages.tw
						: languages.en
				}
			>
				<ShowTopBarButton ShowTopBar={showTopBar} />
				<br />
				<TopBar
					SelectByDone={selectByDone}
					SelectSortMethod={selectSortMethod}
					onSearchChange={onSearchChange}
					ShowTopBarState={showTopBarState}
					ChangeLanguage={changeLanguage}
					TWLanguage={TWLanguage}
				/>
				<br />
				<TodosTable
					SelectByDoneState={doneState}
					SelectSortMethodState={sortMethodState}
					SearchText={searchText}
					TodosArray={todosArray}
					ToggleIsComplete={toggleIsComplete}
					DeleteTodo={deleteTodo}
					EditTodoArray={editTodoArray}
				/>
				<br />
				<ShowAddTodoFormButton ShowAddTodoForm={showAddTodoForm} />
				{showAddTodoFormState ? (
					<AddTodoModal
						addNewTodoToArray={addNewTodoToArray}
						SetKeyOfNewTodo={setKeyOfNewTodo}
						todoKey={todoKey}
						ShowAddTodoForm={showAddTodoForm}
					/>
				) : null}
			</LanguageContext.Provider>
		</>
	);
};

export default App;

import React from "react";
import { useState, useEffect, useContext, lazy, Suspense } from "react";
import AddTodoModal from "../components/AddTodoModal";
import ShowAddTodoFormButton from "../components/ShowAddTodoFormButton";
import TopBar from "../components/TopBar";

import { languages, LanguageContext } from "../components/languages";
import "./App.css";

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

const App: React.FunctionComponent = () => {
	// React Lazy

	const TodosTable = lazy(() => import("../components/TodosTable"));

	// const AddTodoModal = lazy(() => import("../components/AddTodoModal"));

	const renderLoader = () => <p styleName="loading"> {language.Loading}</p>;

	//TopBar

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

	//AddTodo Button (+)

	const [showAddTodoFormState, setShowAddTodoForm] = useState<boolean>(false);

	const showAddTodoForm = () => {
		setShowAddTodoForm((prevAddFormState) => !prevAddFormState);
	};

	const [test, setTest] = useState<number>(1);

	//Language

	const language = useContext(LanguageContext);

	const languagePreference = localStorage.getItem("TWLanguage");

	const [TWLanguage, setTWLanguage] = useState<boolean>(
		languagePreference ? JSON.parse(languagePreference) : true
	);

	const changeLanguage = () => {
		setTWLanguage((prevTWLanguage) => !prevTWLanguage);
		localStorage.setItem("TWLanguage", JSON.stringify(!TWLanguage));
	};
	// The following will unexpectedly trigger setItem effect via non-button-clicking Method
	// useEffect(()=> {
	// 	localStorage.setItem("TWLanguage", JSON.stringify(!TWLanguage));
	// },[TWLanguage])

	// Dark Theme

	const DARK = localStorage.getItem("DARK");

	const [darkTheme, setDarkTheme] = useState<boolean>(
		DARK ? JSON.parse(DARK) : false
	);

	const htmlTag = document.getElementsByTagName("HTML")[0];

	htmlTag.setAttribute("dark-theme", JSON.stringify(darkTheme));

	const changeTheme = () => {
		setDarkTheme((prevDarkTheme) => !prevDarkTheme);
		localStorage.setItem("DARK", JSON.stringify(!darkTheme));
		htmlTag.setAttribute("dark-theme", JSON.stringify(!darkTheme));
	};

	// Todos - key

	const TODOKEY = localStorage.getItem("TODOKEY");

	const [todoKey, setTodoKey] = useState<number>(
		TODOKEY ? JSON.parse(TODOKEY) + 1 : 0
	);

	const setKeyOfNewTodo = () => {
		setTodoKey((prevTodoKey) => prevTodoKey + 1);
	};

	useEffect(() => {
		localStorage.setItem("TODOKEY", JSON.stringify(todoKey));
	}, [todoKey]);

	// Todos - array

	const TODOS = localStorage.getItem("TODOS");

	const [todosArray, setTodosArray] = useState<ITodoProps[]>(() => {
		const initial = TODOS ? JSON.parse(TODOS) : [];
		return initial;
	});

	// Todos - CRUD

	const addNewTodoToArray = (childNewForm: ITodoProps) => {
		setTodosArray((prevTodosArray) => [...prevTodosArray, childNewForm]);
		setShowAddTodoForm((prevAddFormState) => !prevAddFormState);
	};

	const toggleIsComplete = (index: ITodoProps["index"]) => {
		setTodosArray((prevTodosArray) => {
			return prevTodosArray.map((todo) => {
				if (todo.index === index) {
					return { ...todo, isCompleted: !todo.isCompleted };
				}
				return todo;
			});
		});
	};

	const deleteTodo = (index: ITodoProps["index"]) => {
		setTodosArray((prevTodosArray) => {
			return prevTodosArray.filter((todo) => todo.index !== index);
		});
	};

	const editTodoArray = (editedFormElements: IeditedFormElements) => {
		const {
			index,
			editedCaption,
			editedDescription,
			editedDue,
			editedIsDone,
		} = editedFormElements;
		setTodosArray((prevTodosArray) => {
			return prevTodosArray.map((todo) => {
				if (todo.index === index) {
					return {
						...todo,
						caption: editedCaption,
						description: editedDescription,
						due: editedDue,
						isCompleted: editedIsDone,
					};
				}
				return todo;
			});
		});
	};

	useEffect(() => {
		localStorage.setItem("TODOS", JSON.stringify(todosArray));
	}, [todosArray]);

	return (
		<div styleName="app-components">
			<LanguageContext.Provider
				value={
					(languagePreference ? JSON.parse(languagePreference) : TWLanguage)
						? languages.tw
						: languages.en
				}
			>
				<br />
				<TopBar
					SelectByDone={selectByDone}
					SelectSortMethod={selectSortMethod}
					onSearchChange={onSearchChange}
					ChangeLanguage={changeLanguage}
					TWLanguage={TWLanguage}
					ChangeTheme={changeTheme}
					darkTheme={darkTheme}
				/>
				<br />
				<Suspense fallback={renderLoader}>
					<TodosTable
						SelectByDoneState={doneState}
						SelectSortMethodState={sortMethodState}
						SearchText={searchText}
						TodosArray={todosArray}
						ToggleIsComplete={toggleIsComplete}
						DeleteTodo={deleteTodo}
						EditTodoArray={editTodoArray}
					/>
				</Suspense>
				<br />
				<ShowAddTodoFormButton ShowAddTodoForm={showAddTodoForm} />
				<p>{test.toString()}</p>
				<button onClick={() => setTest((n) => n + 1)}>Test Me</button>
				<div styleName={showAddTodoFormState ? "hideAddButton" : ""}>
					<AddTodoModal
						addNewTodoToArray={addNewTodoToArray}
						SetKeyOfNewTodo={setKeyOfNewTodo}
						todoKey={todoKey}
						ShowAddTodoForm={showAddTodoForm}
					/>
				</div>
			</LanguageContext.Provider>
		</div>
	);
};

export default App;

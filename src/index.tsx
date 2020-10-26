import React, {useState} from "react";
import ReactDOM from "react-dom";
import TopBar from '../components/TopBar';
import TodosTable from '../components/TodosTable';
import AddTodoModal from '../components/AddTodoModal';

type DoneState = 'All Tasks' | 'Done' | 'To Do';
type SortMethodState = 'Date Added' | 'Caption' | 'Due'; 

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

	const [doneState, setDoneState] = useState<DoneState>('All Tasks')

	const [sortMethodState, setSortMethodState] = useState<SortMethodState>('Date Added')

	const [searchText, setSearchText] = useState<string>('')

	const selectByDone = (option: React.FormEvent<HTMLSelectElement>) => {
		setDoneState(option.currentTarget.value as DoneState);
	}

	const selectSortMethod = (option: React.FormEvent<HTMLSelectElement>) => {
		setSortMethodState(option.currentTarget.value as SortMethodState);
	}

	const onSearchChange = (event: React.FormEvent<HTMLInputElement>) => {
		setSearchText(event.currentTarget.value);
	}

	const [todosArray, setTodosArray] = useState<ITodoProps[]>([
			// {
			// 	caption: 'Buy milk',
			// 	description: 'Want to buy milk',
			// 	//addedDate: new Date,
			// 	//due: 'select Date'
			// 	isCompleted: false,
			// },
			// {
			// 	caption: 'Do yoga',
			// 	description: 'Exercise is important :D',
			// 	//addedDate: new Date,
			// 	//due: 'select Date'
			// 	isCompleted: true,
			// },
		])

	const addNewTodoToArray = (childNewForm: ITodoProps) => {
		console.log('childNewForm:');
		console.log(childNewForm); //if is not initialNewForm, then success passing data from child to parent component 
		console.log('todosArray - nothing done')
		console.log(todosArray);
		const newTodosArray = [...todosArray, childNewForm]; //How one should update the array with useState(?). todosArray is async, newTodosArray is sync
		console.log('newTodosArray - setup')
		console.log(newTodosArray);
		console.log('todosArray - after new is setup')
		console.log(todosArray);
		setTodosArray(newTodosArray);
		console.log('newTodosArray - reset array')
		console.log(newTodosArray);
		console.log('todosArray - reset array');
		console.log(todosArray);
	}

	const toggleIsComplete = (index: ITodoProps["index"]) => {
		console.log(`filtered by index${index}:`);
		console.log(todosArray.filter(todo => todo.index === index)); //how to get updated todosArray since setTodosArray() does not update itself immediately? 
		const newTodosArray = [...todosArray];
		for (const todo of newTodosArray) {if (todo.index === index) {todo.isCompleted = !todo.isCompleted}}  //Async is screwed up
		setTodosArray(newTodosArray);
	}

	const deleteTodo = (index: ITodoProps["index"]) => {
		console.log(`todosArray before deleting, newTodosArray`);
		console.log(todosArray);
		const newTodosArray = [...todosArray];
		for (let i = 0; i < newTodosArray.length; i++) {if (newTodosArray[i].index === index) {newTodosArray.splice(i,1);}} // not the best practice since accessing by index now takes O(n) instead of O(1)
		setTodosArray(newTodosArray);
		console.log(`todosArray after deleting, newTodosArray`);
		console.log(todosArray);
		console.log(newTodosArray);
	}

	return (
			<>
			  <TopBar SelectByDone={selectByDone} SelectSortMethod={selectSortMethod} onSearchChange={onSearchChange} />
			  <TodosTable SelectByDoneState={doneState} SelectSortMethodState={sortMethodState} SearchText={searchText} 
			  						TodosArray={todosArray} ToggleIsComplete={toggleIsComplete} DeleteTodo={deleteTodo}/>
			  <AddTodoModal addNewTodoToArray={addNewTodoToArray} />
		  </>
	  );
};


ReactDOM.render(
  <App />,
  document.getElementById("root")
);

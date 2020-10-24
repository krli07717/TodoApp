import React, {useState} from "react";
import ReactDOM from "react-dom";
import TopBar from '../components/TopBar';
import TodosTable from '../components/TodosTable';
import AddTodoModal from '../components/AddTodoModal';

type DoneState = 'All Tasks' | 'Done' | 'To Do';
type SortMethodState = 'Date Added' | 'Caption' | 'Due'; 

interface ITodoProps {
	caption: string;
	description: string;
	addedDate: string;
	due: string;
	isCompleted: boolean;
}

const App = () => {	

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
		const newTodosArray = [...todosArray, childNewForm]; //How one should update the array with useState
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

	const [doneState, setDoneState] = useState<DoneState>('All Tasks')

	const [sortMethodState, setSortMethodState] = useState<SortMethodState>('Date Added')

	const [searchText, setSearchText] = useState<string>('')

	return (
			<>
			  <TopBar SelectByDone={selectByDone} SelectSortMethod={selectSortMethod} onSearchChange={onSearchChange} />
			  <TodosTable SelectByDoneState={doneState} SelectSortMethodState={sortMethodState} SearchText={searchText} 
			  						TodosArray={todosArray} />
			  <AddTodoModal addNewTodoToArray={addNewTodoToArray} />
		  </>
	  );
};


ReactDOM.render(
  <App />,
  document.getElementById("root")
);



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
	addedDate?: Date;
	due?: Date;
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
			{
				caption: 'Buy milk',
				description: 'Want to buy milk',
				//addedDate: new Date,
				//due: 'select Date'
				isCompleted: false,
			},
			{
				caption: 'Do yoga',
				description: 'Exercise is important :D',
				//addedDate: new Date,
				//due: 'select Date'
				isCompleted: true,
			},
			{
				caption: 'Not writing description',
				description: '',
				//addedDate: new Date,
				//due: 'select Date'
				isCompleted: false,
			},
			{
				caption: 'W',
				description: 'Not writing caption',
				//addedDate: new Date,
				//due: 'select Date'
				isCompleted: false,
			},
			{
				caption: `Ay I'm sorted to top`,
				description: 'Not writing caption',
				//addedDate: new Date,
				//due: 'select Date'
				isCompleted: false,
			},
		])

	const addNewTodoToArray = (childNewForm: ITodoProps) => {
		console.log('childNewForm:');
		console.log(childNewForm); //if is not initialNewForm, then success passing data from child to parent component 
		// setNewFormElements(childNewForm); //Problem here updating newform object
		console.log('todosArray - nothing done')
		console.log(todosArray);
		const newTodosArray = todosArray;
		console.log('newTodosArray - let = todosArray')
		console.log(newTodosArray);
		newTodosArray.push(childNewForm);
		console.log('newTodosArray - after push')
		console.log(newTodosArray);
		console.log('todosArray - after new is pushed')
		console.log(todosArray);
		setTodosArray([...todosArray, ...newTodosArray]); //NOT 'setTodosArray(newTodosArray)'. Super important
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



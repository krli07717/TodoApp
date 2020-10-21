import React, {useState} from "react";
import ReactDOM from "react-dom";
import TopBar from '../components/TopBar';
import TodosTable from '../components/TodosTable';
import AddTodoModal from '../components/AddTodoModal';

// enum DoneState {
// 	AllTask = 'All Task',
// 	Done = 'Done',
// 	ToDo = 'To Do',
// }

// enum SortMethodState {
// 	DateAdded = 'Date Added',
// 	Caption = 'Caption',
// 	Due = 'Due',
// }

interface ITodoProps {
	caption: string;
	description: string;
	addedDate?: Date;
	due?: Date;
	isCompleted: boolean;
}

const App = () => {	

	const selectByDone = (option: React.FormEvent<HTMLSelectElement>) => {
		setDoneState(option.currentTarget.value);
	}

	const selectSortMethod = (option: React.FormEvent<HTMLSelectElement>) => {
		setSortMethodState(option.currentTarget.value);
	}

	const onSearchChange = (event: React.FormEvent<HTMLInputElement>) => {
		setSearchText(event.currentTarget.value);
	}

	const [doneState, setDoneState] = useState<string>('All Task')

	const [sortMethodState, setSortMethodState] = useState<string>('Date Added')

	const [searchText, setSearchText] = useState<string>('')

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
				caption: `Ay Bro I'm sorted to top`,
				description: 'Not writing caption',
				//addedDate: new Date,
				//due: 'select Date'
				isCompleted: false,
			},
		])


	return (
			<>
			  <TopBar SelectByDone={selectByDone} SelectSortMethod={selectSortMethod} onSearchChange={onSearchChange} />
			  <TodosTable SelectByDoneState={doneState} SelectSortMethodState={sortMethodState} SearchText={searchText} TodosArray={todosArray} />
			  {//<AddTodoModal/>
			  }
		  </>
	  );
};


ReactDOM.render(
  <App />,
  document.getElementById("root")
);


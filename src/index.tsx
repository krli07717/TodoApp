import React, {useState} from "react";
import ReactDOM from "react-dom";
import TopBar from '../components/TopBar';
import TodosTable from '../components/TodosTable';
import AddTodoModal from '../components/AddTodoModal';

type DoneState = 'All Task' | 'Done' | 'To Do';
type SortMethodState = 'Date Added' | 'Caption' | 'Due';

interface ITodoProps {
	caption: string;
	description: string;
	addedDate?: Date;
	due?: Date;
	isCompleted: boolean;
}

const App = () => {	

	const [doneState, setDoneState] = useState<DoneState>('All Task')

	const [sortMethodState, setSortMethodState] = useState<SortMethodState>('Date Added')

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
		])


	return (
			<>
			  {// <TopBar SelectByDone={} SelectSortMethod={} onSearchChange={} />
			  }
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
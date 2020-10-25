import * as React from 'react';
import Todo from './Todo';

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
	toggleIsComplete: (index: ITodoProps["index"]) => void;
}

const TodosTable: React.FunctionComponent<TodosTableProps> = ({SelectByDoneState, SelectSortMethodState, SearchText, TodosArray, toggleIsComplete}) => {
	
	if (SelectSortMethodState === 'Caption') {
		TodosArray.sort((a, b) => {
			let captionA = a.caption.toLowerCase();
			let captionB = b.caption.toLowerCase();
			if (captionA < captionB) {
				return -1;
			}
			if (captionA > captionB) {
				return 1;
			}
			return 0;
		});					
	};

	return (
					<>
						<h1>Sort by {SelectByDoneState} and {SelectSortMethodState}</h1>
						{
							TodosArray
							.filter(todoBySearchText => todoBySearchText.caption.includes(SearchText) ||
							 todoBySearchText.description.includes(SearchText))
							.filter(todoByDoneState => {
								if (SelectByDoneState === 'Done') {
									return todoByDoneState.isCompleted === true;
								} else if (SelectByDoneState === 'To Do') {
									return todoByDoneState.isCompleted === false;
								} else {
									return todoByDoneState;
								}
							})
							.map((filteredTodo) => {
									const {key, index, caption, description, addedDate, due, isCompleted} = filteredTodo;
									return (
										<Todo key={key} index={index} caption={caption} description={description} addedDate={addedDate} due={due} isCompleted={isCompleted} toggleIsComplete={toggleIsComplete}/>
									)
									})
						}
					</>
				 );
};

export default TodosTable;
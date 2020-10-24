import * as React from 'react';
import Todo from './Todo';

interface ITodoProps {
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
}

const TodosTable: React.FunctionComponent<TodosTableProps> = ({SelectByDoneState, SelectSortMethodState, SearchText, TodosArray}) => {
	
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
							.map(filteredTodo => {
									const {caption, description, addedDate, due, isCompleted} = filteredTodo;
									return (
										<Todo caption={caption} description={description} addedDate={addedDate} due={due} isCompleted={isCompleted} />
									)
									})
						}
					</>
				 );
};

export default TodosTable;
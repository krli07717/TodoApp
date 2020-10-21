import * as React from 'react';
import Todo from './Todo';

interface ITodoProps {
	caption: string;
	description: string;
	addedDate?: Date;
	due?: Date;
	isCompleted: boolean;
}

interface TodosTableProps {
	SelectByDoneState: string;
	SelectSortMethodState: string;
	SearchText: string;
	TodosArray: ITodoProps[];
}

const TodosTable: React.FunctionComponent<TodosTableProps> = ({SelectByDoneState, SelectSortMethodState, SearchText, TodosArray}) => {
	return (
					<>
						{
							TodosArray
							.filter(todo => todo.caption.includes(SearchText) ||
							 todo.description.includes(SearchText))
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
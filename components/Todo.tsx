import * as React from 'react';

interface TodoProps {
	caption: string;
	description: string;
	addedDate: string;
	due: string;
	isCompleted: boolean;
}

const Todo: React.FunctionComponent<TodoProps> = ({caption, description, addedDate, due, isCompleted}) => {
	return (
		<>
			<h3>{caption}</h3>
			<p>{description}</p>
			<h6>Added: {addedDate}</h6>
			<h6>Due: {due}</h6>
			<p>Done?: {isCompleted.toString()}</p>
		</>
	);
};

export default Todo;
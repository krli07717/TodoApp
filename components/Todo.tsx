import * as React from 'react';

interface TodoProps {
	caption: string;
	description: string;
	addedDate?: Date;
	due?: Date;
	isCompleted: boolean;
}

const Todo: React.FunctionComponent<TodoProps> = ({caption, description, addedDate, due, isCompleted}) => {
	return (
		<>
			<h3>{caption}</h3>
			<p>{description}</p>
			<p>Added{addedDate}</p>
			<p>Due: {due}</p>
			<p>Done?: {isCompleted}</p>
		</>
	);
};

export default Todo;
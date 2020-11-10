import React from "react";
import "./Todo.css";

interface ShowAddTodoFormButtonProps {
	ShowAddTodoForm: () => void;
}

const ShowAddTodoFormButton: React.FunctionComponent<ShowAddTodoFormButtonProps> = ({
	ShowAddTodoForm,
}) => {
	return (
		<div styleName="new-todo-button-div">
			<button
				type="button"
				role="ShowAddTodoFormButton"
				onClick={() => ShowAddTodoForm()}
			>
				<i className="fas fa-plus"></i>
			</button>
		</div>
	);
};

export default ShowAddTodoFormButton;

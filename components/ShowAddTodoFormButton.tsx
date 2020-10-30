import * as React from "react";

interface ShowAddTodoFormButtonProps {
	ShowAddTodoForm: () => void;
}

const ShowAddTodoFormButton: React.FunctionComponent<ShowAddTodoFormButtonProps> = ({
	ShowAddTodoForm,
}) => {
	return (
		<button type="button" onClick={() => ShowAddTodoForm()}>
			+
		</button>
	);
};

export default ShowAddTodoFormButton;

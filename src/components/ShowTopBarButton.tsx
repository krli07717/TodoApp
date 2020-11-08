import React from "react";

interface ShowTopBarButtonProps {
	ShowTopBar: () => void;
}

const ShowTopBarButton: React.FunctionComponent<ShowTopBarButtonProps> = ({
	ShowTopBar,
}) => {
	return (
		<button type="button" role="ShowTopBarButton" onClick={() => ShowTopBar()}>
			<i className="fas fa-ellipsis-v"></i>
		</button>
	);
};

export default ShowTopBarButton;

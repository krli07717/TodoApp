import React from "react";

interface ShowTopBarButtonProps {
	ShowTopBar: () => void;
}

const ShowTopBarButton: React.FunctionComponent<ShowTopBarButtonProps> = ({
	ShowTopBar,
}) => {
	return (
		<button type="button" role="ShowTopBarButton" onClick={() => ShowTopBar()}>
			...
		</button>
	);
};

export default ShowTopBarButton;

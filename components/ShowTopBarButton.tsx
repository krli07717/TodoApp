import * as React from 'react';

interface ShowTopBarButtonProps {
	ShowTopBar: () => void;
}

const ShowTopBarButton: React.FunctionComponent<ShowTopBarButtonProps> = ({ShowTopBar}) => {
	return (
		<button type='button' onClick={()=>ShowTopBar()}>Show TopBar</button>
		);
};

export default ShowTopBarButton;
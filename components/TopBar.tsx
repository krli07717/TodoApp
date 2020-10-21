import * as React from 'react';
import Sort from './Sort';
import SearchBar from './SearchBar';

interface TopBarProps {
	SelectByDone: (event: React.ChangeEvent<HTMLSelectElement>)=> void;
	SelectSortMethod: (event: React.ChangeEvent<HTMLSelectElement>)=> void;
	onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TopBar: React.FunctionComponent<TopBarProps> = ({SelectByDone,SelectSortMethod,onSearchChange}) => {
	return (
			<>
				<Sort SelectByDone={SelectByDone} SelectSortMethod={SelectSortMethod} />
				<SearchBar onSearchChange={onSearchChange} />
			</>
		);
};

export default TopBar;
import * as React from 'react';

interface SearchBarProp {
	onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
} 

const SearchBar: React.FunctionComponent<SearchBarProp> = ({onSearchChange}) => {
	return (
		<>
			<input
            type="Search"
            placeholder="Search here"
            value=""
            onChange={onSearchChange}
      />
		</>
		);
};

export default SearchBar;

import * as React from 'react';
import {useContext} from 'react';
import {languages, LanguageContext} from './languages';

interface SearchBarProp {
	onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
} 

const SearchBar: React.FunctionComponent<SearchBarProp> = ({onSearchChange}) => {
	const language = useContext(LanguageContext);
	return (
		<>
			<input
            type="Search"
            placeholder={language.SearchHere}
            onChange={onSearchChange}
      />
		</>
		);
};

export default SearchBar;

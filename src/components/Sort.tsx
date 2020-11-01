import React from "react";
import { useContext } from "react";
import { LanguageContext } from "./languages";

interface SortProps {
	SelectByDone: (event: React.ChangeEvent<HTMLSelectElement>) => void;
	SelectSortMethod: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Sort: React.FunctionComponent<SortProps> = ({
	SelectByDone,
	SelectSortMethod,
}) => {
	const language = useContext(LanguageContext);
	return (
		<>
			<label>{language.sortBy}</label>
			<select onChange={SelectByDone}>
				<option value="All Tasks">{language.sortAllTask}</option>
				<option value="Done">{language.Done}</option>
				<option value="To Do">{language.ToDo}</option>
			</select>
			<select onChange={SelectSortMethod}>
				<option value="Date Added">{language.AddedDate}</option>
				<option value="Due">{language.Due}</option>
				<option value="Caption">{language.Caption}</option>
			</select>
		</>
	);
};

export default Sort;

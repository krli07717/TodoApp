import * as React from 'react';

interface SortProps {
	SelectByDone: (event: React.ChangeEvent<HTMLSelectElement>)=> void;
	SelectSortMethod: (event: React.ChangeEvent<HTMLSelectElement>)=> void;
}

const Sort: React.FunctionComponent<SortProps> = ({SelectByDone, SelectSortMethod}) => {
	return (
			<>
			<label >Sort by:</label>
				<select	onChange={SelectByDone}>
			    <option value="All Tasks">All Tasks</option>
			    <option value="Done">Done</option>
			    <option value="To Do">To Do</option>
		    </select>
		    <select	onChange={SelectSortMethod}>
			    <option value="Date Added">Date Added</option>
			    <option value="Due">Due</option>
			    <option value="Caption">Caption</option>
		    </select>
			</>
		);
};

export default Sort;
import * as React from 'react';

interface SortProps {
	SelectByDone: (event: React.ChangeEvent<HTMLSelectElement>)=> void;
	SelectSortMethod: (event: React.ChangeEvent<HTMLSelectElement>)=> void;
}

const Sort: React.FunctionComponent<SortProps> = ({SelectByDone, SelectSortMethod}) => {
	return (
			<>
			<label >Sort by:</label>
				<select value='' 
								onChange={SelectByDone}
				>
			    <option selected value="All Task">All Task</option>
			    <option value="Done">Done</option>
			    <option value="To Do">To Do</option>
		    </select>
		    <select value='' 
		    				onChange={SelectSortMethod}
		    >
			    <option selected value="Date Added">Date Added</option>
			    <option value="Caption">Caption</option>
			    <option value="Due">Due</option>
		    </select>
			</>
		);
};

export default Sort;
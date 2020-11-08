import React from "react";
import Sort from "./Sort";
import SearchBar from "./SearchBar";

interface TopBarProps {
	SelectByDone: (event: React.ChangeEvent<HTMLSelectElement>) => void;
	SelectSortMethod: (event: React.ChangeEvent<HTMLSelectElement>) => void;
	onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	ShowTopBarState: boolean;
	ChangeLanguage: () => void;
	TWLanguage: boolean;
	ChangeTheme: () => void;
	darkTheme: boolean;
}

const TopBar: React.FunctionComponent<TopBarProps> = ({
	SelectByDone,
	SelectSortMethod,
	onSearchChange,
	ShowTopBarState,
	ChangeLanguage,
	TWLanguage,
	ChangeTheme,
	darkTheme,
}) => {
	return (
		<div style={{ visibility: ShowTopBarState ? "visible" : "hidden" }}>
			<Sort SelectByDone={SelectByDone} SelectSortMethod={SelectSortMethod} />
			<SearchBar onSearchChange={onSearchChange} />
			<button
				type="button"
				role="ChangeLanguage"
				onClick={() => ChangeLanguage()}
			>
				{TWLanguage ? "En" : "繁"}
			</button>
			<button type="button" onClick={() => ChangeTheme()}>
				<i className={darkTheme ? "fas fa-sun" : "fas fa-moon"}></i>
			</button>
			<button
				onClick={() =>
					window.open("https://github.com/krli07717/TodoApp", "_blank")
				}
			>
				<i className="fas fa-code"></i>
			</button>
		</div>
	);
};

export default TopBar;

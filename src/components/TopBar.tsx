import React from "react";
import Sort from "./Sort";
import SearchBar from "./SearchBar";
import "./TopBar.css";

interface TopBarProps {
	SelectByDone: (event: React.ChangeEvent<HTMLSelectElement>) => void;
	SelectSortMethod: (event: React.ChangeEvent<HTMLSelectElement>) => void;
	onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	// ShowTopBarState: boolean;
	ChangeLanguage: () => void;
	TWLanguage: boolean;
	ChangeTheme: () => void;
	darkTheme: boolean;
}

const TopBar: React.FunctionComponent<TopBarProps> = ({
	SelectByDone,
	SelectSortMethod,
	onSearchChange,
	// ShowTopBarState,
	ChangeLanguage,
	TWLanguage,
	ChangeTheme,
	darkTheme,
}) => {
	return (
		<div styleName="topbar-div">
			<div styleName="topbar-children">
				<button
					type="button"
					styleName="topbar-children topbar-button"
					onClick={() => ChangeTheme()}
				>
					<i className={darkTheme ? "fas fa-sun" : "fas fa-moon"}></i>
				</button>
				<button
					type="button"
					role="ChangeLanguage"
					styleName="topbar-children topbar-button"
					onClick={() => ChangeLanguage()}
				>
					{TWLanguage ? "En" : "繁"}
				</button>
				<button
					styleName="topbar-children topbar-button"
					onClick={() =>
						window.open("https://github.com/krli07717/TodoApp", "_blank")
					}
				>
					<i className="fas fa-code"></i>
				</button>
				<br />
				<Sort SelectByDone={SelectByDone} SelectSortMethod={SelectSortMethod} />
				<SearchBar onSearchChange={onSearchChange} />
			</div>
		</div>
	);
};

export default TopBar;

import * as React from "react";

const languages = {
	en: {
		sortBy: "Sort-",
		sortAllTask: "All",
		Done: "Done",
		ToDo: "To Do",
		AddedDate: "Added",
		Due: "Due",
		Caption: "Title",
		SearchHere: "Search..",
		AddYourFirstTodo: "Add your first Todo below!",
		NoResultsFound: "No Results Found",
		ToDoTitle: "Title",
		Description: "Description",
		Completed: "Completed",
	},
	tw: {
		sortBy: "排序-",
		sortAllTask: "所有",
		Done: "已完成",
		ToDo: "未完成",
		AddedDate: "新增日期",
		Due: "到期日",
		Caption: "標題",
		SearchHere: "搜尋..",
		AddYourFirstTodo: "點擊下方開始建立代辦事項",
		NoResultsFound: "沒有搜尋結果",
		ToDoTitle: "標題",
		Description: "內容",
		Completed: "已完成",
	},
};

const LanguageContext = React.createContext(languages.en);

export { languages, LanguageContext };

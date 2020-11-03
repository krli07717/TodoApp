import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../containers/App";

describe("App", () => {
	it("its test is working", () => {
		expect(2 + 2).toEqual(4);
	});

	it("renders correct components, localstorage getItem() works", () => {
		const getItemLS = jest.spyOn(window.localStorage.__proto__, "getItem");
		const { getByText, getByRole } = render(<App />);
		expect(getItemLS).toHaveBeenCalledWith("TODOS");
		expect(getItemLS).toHaveBeenCalledWith("TODOKEY");
		expect(getItemLS).toHaveBeenCalledWith("TWLanguage");
		//renders correct components
		screen.queryByText("沒有任何代辦事項");
		screen.queryByRole("ShowTopBarButton");
		screen.queryByRole("ShowAddTodoFormButton");
	});

	it("allows users to add/edit/delete Todos that display on screen and are saved to localstorage", () => {
		// renders
		const { getByRole, getByText } = render(<App />);
		// adds first todo
		const addTodoFormButton = getByRole("ShowAddTodoFormButton");
		userEvent.click(addTodoFormButton);

		const titleInput = screen.getByRole("newTodoTitleInput");
		const descriptionInput = screen.getByRole("newTodoDescriptionInput");
		const dueInput = screen.getByRole("ChooseDue");
		const isDoneCheckBox = screen.getByRole("isDone");
		const addTodoSubmit = screen.getByRole("addTodo");
		const setItemLS = jest.spyOn(window.localStorage.__proto__, "setItem");

		userEvent.type(titleInput, "test title");
		userEvent.type(descriptionInput, "test description");
		userEvent.type(dueInput, "2020-11-02");
		userEvent.click(isDoneCheckBox);
		userEvent.click(addTodoSubmit);
		expect(setItemLS).toBeCalledWith("TODOKEY", JSON.stringify(0));
		expect(setItemLS).toHaveBeenCalledTimes(2); //set todoarray and set todokey

		screen.queryByText("test title");
		expect(screen.queryByText("test description")).not.toBeInTheDocument();

		//expand todo details
		const expandTodo = getByRole("expandTodo");
		userEvent.click(expandTodo);
		screen.queryByText("test description");

		//edit todo
		const EditTodoFormButton = getByRole("EditTodoForm");
		userEvent.click(EditTodoFormButton);
		const EditTodoTitleInput = getByRole("editTodoTitle");
		userEvent.type(EditTodoTitleInput, "edited");
		const SaveEditButton = getByRole("saveEdit");
		userEvent.click(SaveEditButton);

		screen.queryByText("edited");
		expect(setItemLS).toHaveBeenCalledTimes(3); //update localstorage

		//delete todo
		const DeleteTodoButton = getByRole("DeleteTodo");
		userEvent.click(DeleteTodoButton);
		expect(setItemLS).toHaveBeenCalledTimes(4); //update localstorage
		expect(screen.queryByText("edited")).not.toBeInTheDocument();
		expect(screen.queryAllByRole("expandTodo")).toHaveLength(0);

		// successfully adds second todo that has even no contents in it
		const addTodoFormButton2 = getByRole("ShowAddTodoFormButton");
		userEvent.click(addTodoFormButton2);
		const addTodoSubmit2 = screen.getByRole("addTodo");
		userEvent.click(addTodoSubmit2);
		expect(setItemLS).toBeCalledWith("TODOKEY", JSON.stringify(1));
		expect(screen.queryAllByRole("expandTodo")).toHaveLength(1);
		expect(setItemLS).toHaveBeenCalledTimes(6);
	});

	it("has working a search bar and filter feature", () => {
		// renders
		const { getByRole, getByText } = render(<App />);
		// adds first todo
		const addTodoFormButton = getByRole("ShowAddTodoFormButton");
		userEvent.click(addTodoFormButton);

		const titleInput = screen.getByRole("newTodoTitleInput");
		const descriptionInput = screen.getByRole("newTodoDescriptionInput");
		const dueInput = screen.getByRole("ChooseDue");
		const isDoneCheckBox = screen.getByRole("isDone");
		const addTodoSubmit = screen.getByRole("addTodo");
		const setItemLS = jest.spyOn(window.localStorage.__proto__, "setItem");

		userEvent.type(titleInput, "test title");
		userEvent.type(descriptionInput, "test description");
		userEvent.type(dueInput, "2020-11-02");
		userEvent.click(isDoneCheckBox);
		userEvent.click(addTodoSubmit);
		screen.queryByText("test title");

		//search
		const ShowTopBarButton = screen.getByRole("ShowTopBarButton");
		userEvent.click(ShowTopBarButton);

		const SearchTodoInput = screen.getByRole("SearchTodo");
		userEvent.type(SearchTodoInput, "not finding me");
		expect(screen.queryByText("test title")).not.toBeInTheDocument();
		screen.queryByText("沒有搜尋結果");

		userEvent.type(SearchTodoInput, "");
		screen.queryByText("test title");

		//filter
		const filterByAllTask = getByText("所有");
		userEvent.click(filterByAllTask);
		const filterByToDoFilter = getByText("未完成");
		userEvent.click(filterByAllTask);
		expect(screen.queryByText("test title")).not.toBeInTheDocument();
		screen.queryByText("沒有搜尋結果");
	});

	it("allows switching language and saves language preference to localstorage", () => {
		const { getByRole } = render(<App />);
		const ShowTopBarButton = screen.getByRole("ShowTopBarButton");
		const setItemLS = jest.spyOn(window.localStorage.__proto__, "setItem");

		userEvent.click(ShowTopBarButton);
		//shows 排序, 搜尋..
		expect(screen.queryByText("Sort")).not.toBeInTheDocument();
		expect(screen.queryByText("Search..")).not.toBeInTheDocument();

		const ChangeLanguageButton = screen.getByRole("ChangeLanguage");
		userEvent.click(ChangeLanguageButton);
		screen.queryByText("Sort");
		screen.queryByText("Search..");

		expect(setItemLS).toBeCalledWith("TWLanguage", JSON.stringify(false));
	});
});

//Test Coverage 11/03
// ----------------------------|---------|----------|---------|---------|---------------------------
// File                        | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
// ----------------------------|---------|----------|---------|---------|---------------------------
// All files                   |   77.84 |    68.27 |      75 |   77.89 |
//  components                 |   70.37 |    66.28 |   77.78 |   69.81 |
//   AddTodoModal.tsx          |   90.48 |    86.96 |   66.67 |      90 | 89,116
//   EditTodoForm.tsx          |   91.67 |       90 |   66.67 |   91.67 | 105
//   SearchBar.tsx             |     100 |      100 |     100 |     100 |
//   ShowAddTodoFormButton.tsx |     100 |      100 |     100 |     100 |
//   ShowTopBarButton.tsx      |     100 |      100 |     100 |     100 |
//   Sort.tsx                  |     100 |      100 |     100 |     100 |
//   Todo.tsx                  |   88.89 |     87.5 |      80 |   88.89 | 81
//   TodosTable.tsx            |   43.75 |    41.46 |   71.43 |   42.55 | 47-70,100,111-115,118-122
//   TopBar.tsx                |      75 |      100 |   66.67 |      75 | 36
//   languages.tsx             |     100 |      100 |     100 |     100 |
//  containers                 |   87.21 |    77.78 |   69.23 |    88.1 |
//   App.tsx                   |   87.21 |    77.78 |   69.23 |    88.1 | 41,45,89-98
// ----------------------------|---------|----------|---------|---------|---------------------------

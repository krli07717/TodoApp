import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../containers/App";

test("its test is working", () => {
	expect(2 + 2).toEqual(4);
});

test("renders the correct components", () => {
	const { getByText, getByRole } = render(<App />);
	getByText("沒有任何代辦事項");
	getByRole("ShowTopBarButton");
	getByRole("ShowAddTodoFormButton");
});

test("allows users to add Todos and they display on screen and saved to localstorage ", () => {
	const { getByPlaceholderText, getByRole, getByText } = render(<App />);

	const addTodoFormButton1 = getByRole("ShowAddTodoFormButton");
	userEvent.click(addTodoFormButton1);

	const titleInput = screen.getByRole("newTodoTitleInput");
	const descriptionInput = screen.getByRole("newTodoDescriptionInput");
	const dueInput = screen.getByRole("ChooseDue");
	const isDoneCheckBox = screen.getByRole("isDone");
	const addTodoSubmit = screen.getByRole("addTodo");

	//user can add a todo even if there's nothing inside (intended feature)
	userEvent.click(addTodoSubmit);
	getByRole("expandTodo"); //an empty todo is added successfully

	const addTodoFormButton2 = getByRole("ShowAddTodoFormButton");
	userEvent.click(addTodoFormButton2);
	userEvent.type(titleInput, "Hello");
	userEvent.type(descriptionInput, "test description");
	userEvent.type(dueInput, "2020-11-02");
	userEvent.click(isDoneCheckBox);
	userEvent.click(addTodoSubmit);

	getByText("Hello");
});

test("correctly displays data from localstorage", () => {});

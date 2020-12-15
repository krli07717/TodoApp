//for Todo.tsx
export interface IeditedFormElements {
	index: string;
	editedCaption: string;
	editedDescription: string;
	editedDue: string;
	editedIsDone: boolean;
}

export interface TodoProps {
	key: string;
	index: string;
	caption: string;
	description: string;
	addedDate: string;
	due: string;
	isCompleted: boolean;
	ToggleIsComplete: (key: string) => void;
	DeleteTodo: (key: string) => void;
	pastDue: boolean;
	EditTodoArray: (editedFormElements: IeditedFormElements) => void;
}

//for TodosTable.tsx
export interface ITodoProps {
	key: string;
	index: string;
	caption: string;
	description: string;
	addedDate: string;
	due: string;
	isCompleted: boolean;
}

export interface TodosTableProps {
	SelectByDoneState: string;
	SelectSortMethodState: string;
	SearchText: string;
	TodosArray: ITodoProps[];
	ToggleIsComplete: (index: ITodoProps["index"]) => void;
	DeleteTodo: (index: ITodoProps["index"]) => void;
	EditTodoArray: (editedFormElements: IeditedFormElements) => void;
}

//for TopBar
export interface TopBarProps {
	SelectByDone: (event: React.ChangeEvent<HTMLSelectElement>) => void;
	SelectSortMethod: (event: React.ChangeEvent<HTMLSelectElement>) => void;
	onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	// ShowTopBarState: boolean;
	ChangeLanguage: () => void;
	TWLanguage: boolean;
	ChangeTheme: () => void;
	darkTheme: boolean;
}

// Edit todos

export interface EditTodoFormProps {
	index: string;
	caption: string;
	description: string;
	due: string;
	isCompleted: boolean;
	SetEditMode: React.Dispatch<React.SetStateAction<boolean>>;
	EditTodoArray: (editedFormElements: IeditedFormElements) => void;
}

//Add Todos

export interface AddTodoModalProps {
	addNewTodoToArray: (childNewForm: ITodoProps) => void;
	SetKeyOfNewTodo: () => void;
	todoKey: number;
	ShowAddTodoForm: () => void;
}

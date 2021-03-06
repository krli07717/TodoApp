import React from "react";
import Todo from "./Todo";
import AddTodoModal from "./AddTodoModal";
import ShowAddTodoFormButton from "./ShowAddTodoFormButton";
import { useState, useContext } from "react";
import { LanguageContext } from "./languages";
import "./Todo.css";
import "../containers/App.css";
import { TodosTableProps } from "./interfaces";

const TodosTable: React.FunctionComponent<TodosTableProps> = ({
  SelectByDoneState,
  SelectSortMethodState,
  SearchText,
  TodosArray,
  ToggleIsComplete,
  DeleteTodo,
  EditTodoArray,
  addNewTodoToArray,
  SetKeyOfNewTodo,
  todoKey,
  //   ShowAddTodoForm,
}) => {
  const language = useContext(LanguageContext);

  //AddTodo Button (+)

  const [showAddTodoFormState, setShowAddTodoForm] = useState<boolean>(true);

  const showAddTodoForm = () => {
    setShowAddTodoForm((prevAddFormState) => !prevAddFormState);
  };

  // sorting
  if (SelectSortMethodState === "Date Added") {
    TodosArray.sort((a, b) => parseInt(a.index) - parseInt(b.index));
  } else if (SelectSortMethodState === "Due") {
    // sort all the NaNs to the last
    TodosArray.sort((a, b) => {
      const dateNumberA = new Date(a.due).getTime();
      const dateNumberB = new Date(b.due).getTime();
      if (isNaN(dateNumberB) || (isNaN(dateNumberA) && isNaN(dateNumberB))) {
        return -1;
      } else if (isNaN(dateNumberA)) {
        return 1;
      } else {
        return dateNumberA - dateNumberB;
      }
    }); // this method of sorting dates may not be the best practice according to stackoverflow
  } else if (SelectSortMethodState === "Caption") {
    TodosArray.sort((a, b) => {
      const captionA = a.caption.toLowerCase();
      const captionB = b.caption.toLowerCase();
      if (captionA < captionB) {
        return -1;
      }
      if (captionA > captionB) {
        return 1;
      }
      return 0;
    });
  }

  let NoResultsCounter = 0;

  return (
    <>
      {
        // <h1>Sort by {SelectByDoneState} and {SelectSortMethodState}</h1>
      }
      {TodosArray.length === 0 ? (
        <div>
          <h4 styleName="no-todoarray" style={{ textAlign: "center" }}>
            {language.AddYourFirstTodo}
          </h4>
        </div>
      ) : null}
      {TodosArray.filter((todoBySearchText) => {
        console.log("table being filtered");
        if (
          todoBySearchText.caption
            .toLowerCase()
            .includes(SearchText.toLowerCase()) ||
          todoBySearchText.description
            .toLowerCase()
            .includes(SearchText.toLowerCase())
        ) {
          return true;
        } else {
          NoResultsCounter++;
          return false;
        }
        return (
          todoBySearchText.caption
            .toLowerCase()
            .includes(SearchText.toLowerCase()) ||
          todoBySearchText.description
            .toLowerCase()
            .includes(SearchText.toLowerCase())
        );
      })
        .filter((todoByDoneState) => {
          if (SelectByDoneState === "Done") {
            if (todoByDoneState.isCompleted === true) {
              return true;
            } else {
              NoResultsCounter++;
              return false;
            }
          } else if (SelectByDoneState === "To Do") {
            if (todoByDoneState.isCompleted === false) {
              return true;
            } else {
              NoResultsCounter++;
              return false;
            }
          } else {
            return todoByDoneState;
          }
        })
        .map((filteredTodo) => {
          // console.log(`filteredTodo: ${filteredTodo}`);
          const {
            key,
            index,
            caption,
            description,
            addedDate,
            due,
            isCompleted,
          } = filteredTodo;
          let pastDue = false;
          const today = new Date();
          if (
            due !== "" &&
            today.getTime() >
              new Date(
                new Date(due).setDate(new Date(due).getDate() + 1)
              ).getTime()
          ) {
            pastDue = true;
          } //if (today > due.tomorrow)
          return (
            <Todo
              key={key}
              index={index}
              caption={caption}
              description={description}
              addedDate={addedDate}
              due={due}
              isCompleted={isCompleted}
              ToggleIsComplete={ToggleIsComplete}
              DeleteTodo={DeleteTodo}
              pastDue={pastDue}
              EditTodoArray={EditTodoArray}
            />
          );
        })}
      {NoResultsCounter !== 0 && NoResultsCounter === TodosArray.length ? (
        <h3 styleName="no-result" style={{ textAlign: "center" }}>
          {language.NoResultsFound}
        </h3>
      ) : null}
      <>
        <ShowAddTodoFormButton ShowAddTodoForm={showAddTodoForm} />
        <div styleName={showAddTodoFormState ? "hideAddButton" : ""}>
          <AddTodoModal
            addNewTodoToArray={addNewTodoToArray}
            SetKeyOfNewTodo={SetKeyOfNewTodo}
            todoKey={todoKey}
            ShowAddTodoForm={showAddTodoForm}
          />
        </div>
      </>
    </>
  );
};

export default TodosTable;

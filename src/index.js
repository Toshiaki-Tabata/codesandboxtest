import "./styles.scss";

/*
 * テキストの値を取得しTodoに追加する。
 */
const addTodo = () => {
  const inputText = document.getElementById("add-text").value;
  document.getElementById("add-text").value = "";
  const li = createTodoElInProgress(inputText);

  const progressList = document.getElementById("progress-list");

  progressList.appendChild(li);
  console.log(li);
};

/*
 * 進行中リストに追加するTodoエレメントを作成して返す。
 * @param inputText 追加するTodo文字列
 */
const createTodoElInProgress = (inputText) => {
  const li = document.createElement("li");
  const title = document.createElement("div");
  title.className = "todo-title";
  li.appendChild(title);
  title.innerText = inputText;

  const buttonComplete = document.createElement("button");
  buttonComplete.innerText = "完了";
  buttonComplete.addEventListener("click", runCompleteTodo);
  li.appendChild(buttonComplete);

  const buttonDelete = document.createElement("button");
  buttonDelete.innerText = "削除";
  buttonDelete.addEventListener("click", () => {
    const deleteTarget = buttonDelete.parentNode;
    document.getElementById("progress-list").removeChild(deleteTarget);
    console.log(deleteTarget);
  });
  li.appendChild(buttonDelete);

  return li;
};

/*
 ” 進行中リストから削除し、完了リストに追加する。
 */
const runCompleteTodo = (event) => {
  const todoTarget = event.target.parentNode;
  const todoTitle = todoTarget.firstChild.innerText;
  const li = document.createElement("li");
  const title = document.createElement("div");
  title.className = "todo-title";
  title.innerText = todoTitle;
  li.appendChild(title);

  const buttonBack = document.createElement("button");
  buttonBack.innerText = "戻す";
  buttonBack.addEventListener("click", runBackCompleteToProgressTodo);
  li.appendChild(buttonBack);

  document.getElementById("progress-list").removeChild(todoTarget);
  document.getElementById("complete-list").appendChild(li);
};

/*
 * 完了したTODOを進行中リストに戻す。
 */
const runBackCompleteToProgressTodo = (event) => {
  const todoTarget = event.target.parentNode;
  const todoTitle = todoTarget.firstChild.innerText;

  const li = createTodoElInProgress(todoTitle);

  document.getElementById("complete-list").removeChild(todoTarget);
  document.getElementById("progress-list").appendChild(li);
};

document.getElementById("todo-add").addEventListener("click", () => addTodo());

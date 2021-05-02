const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_Ls = "toDos";

let toDos = [];

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id, 10);
  });
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_Ls, JSON.stringify(toDos));
}

function toggleToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;

  toDos.forEach(function (todo) {
    if (todo.id === parseInt(li.id, 10)) {
      if (todo.isFinished) {
        li.classList.remove("finished");
        todo.isFinished = false;
      } else {
        li.className = "finished";
        todo.isFinished = true;
      }
    }
  });
  saveToDos();
}

function paintToDo(text, isFinished) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const toggleBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  delBtn.innerHTML = "✖";
  delBtn.addEventListener("click", deleteToDo);
  toggleBtn.innerHTML = "✔";
  toggleBtn.addEventListener("click", toggleToDo);

  span.innerText = text;
  li.appendChild(toggleBtn);
  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = newId;

  if (isFinished) {
    li.className = "finished";
  }
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId,
    isFinished: isFinished,
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_Ls);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text, toDo.isFinished);
    });
  }
}
function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();

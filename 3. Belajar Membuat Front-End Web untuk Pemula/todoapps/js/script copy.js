const todos = [];
const RENDER_EVENT = "render-todo";

document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.getElementById("form");
  submitForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addTodo();
  });

  //membuat fungsi addtodo
  function addTodo() {
    const textTodo = document.getElementById("title").value;
    const timestamp = document.getElementById("date").value;

    const generatedID = generateId();
    const todoObject = generateTodoObject(
      generatedID,
      textTodo,
      timestamp,
      false
    );
    todos.push(todoObject);

    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
  }

  //membuat fungsi struktur data generateId
  function generateId() {
    return +new Date();
  }

  function generateTodoObject(id, task, timestamp, isCompleted) {
    return {
      id,
      task,
      timestamp,
      isCompleted,
    };
  }

  //membuat listener untuk melihat pada console dan menampilkan array todos
  // document.addEventListener(RENDER_EVENT, function(){
  //     console.log(todos);
  // });

  //membuat fungsi render dri input container add ke container todo list
  function makeTodo(todoObject) {
    //untuk menampilkan tittle
    const textTitle = document.createElement("h2");
    textTitle.innerText = todoObject.task;

    //untuk menampilkan tanggal
    const textTimestamp = document.createElement("p");
    textTimestamp.innerText = todoObject.timestamp;

    //untuk menampilkan container
    const textContainer = document.createElement("div");
    textContainer.classList.add("inner");
    textContainer.append(textTitle, textTimestamp);

    //untuk menampilkan style dari container
    const container = document.createElement("div");
    container.classList.add("item", "shadow");
    container.append(textContainer);
    container.setAttribute("id", `todo-${todoObject.id}`);

    //membuat logika perbandingan
    if (todoObject.isCompleted) {
      //membuat tombol undo menjadi lebih interaktif
      const undoButton = document.createElement("button");
      undoButton.classList.add("undo-button");
      //membuat event pada tombol undo
      undoButton.addEventListener("click", function () {
        undoTaskFromCompleted(todoObject.id);
      });

      //membuat tombol trash menjadi lebih interaktif
      const trashButton = document.createElement("button");
      trashButton.classList.add("trash-button");
      //membuat event pada tombol trash
      trashButton.addEventListener("click", function () {
        removeTaskFromCompleted(todoObject.id);
      });

      container.append(undoButton, trashButton);
    } else {
      //membuat tombol trash menjadi lebih interaktif
      const checkButton = document.createElement("button");
      checkButton.classList.add("check-button");
      //membuat event pada tombol trash
      checkButton.addEventListener("click", function () {
        addTaskToCompleted(todoObject.id);
      });

      container.append(checkButton);
    }

    //mengembalikan hasil
    return container;
  }

  //membuat fungsi perpindahan todo dari 'yang harus dilakukan' ke 'yang sudah dilakukan'
  function addTaskToCompleted(todoId) {
    const todoTarget = findTodo(todoId);

    if (todoTarget == null) return;

    todoTarget.isCompleted = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
  }

  //membuat fungsi findtodo
  function findTodo(todoId) {
    for (const todoItem of todos) {
      if (todoItem.id === todoId) {
        return todoItem;
      }
    }
    return nulll;
  }

  //membuat fungsi hapus (trash)
  function removeTaskFromCompleted(todoId) {
    const todoTarget = findTodoIndex(todoId);

    if (todoTarget === -1) return;

    todos.splice(todoTarget, 1);
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
  }

  //membuat fungsi undo
  function undoTaskFromCompleted(todoId) {
    const todoTarget = findTodo(todoId);

    if (todoTarget == null) return;

    todoTarget.isCompleted = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
  }

  //membuat fungsi untuk menghapus index
  function findTodoIndex(todoId) {
    for (const index in todos) {
      if (todos[index].id === todoId) {
        return index;
      }
    }
    return -1;
  }

  //membuat listener untuk render data dan menampilkan nya pada container todo list (web page)
  document.addEventListener(RENDER_EVENT, function () {
    // console.log(todos);
    const uncompletedTODOList = document.getElementById("todos");
    uncompletedTODOList.innerHTML = "";

    const completedTODOList = document.getElementById("completed-todos");
    completedTODOList.innerHTML = "";

    for (const todoItem of todos) {
      const todoElement = makeTodo(todoItem);
      if (!todoItem.isCompleted) uncompletedTODOList.append(todoElement);
      else completedTODOList.append(todoElement);
    }
  });

  ////////////////////STORAGE//////////////////
  //membuat fungsi menyimpan data ke web storage ketika array ada perubahan
  function saveData() {
    if (isStorageExist()) {
      const parsed = JSON.stringify(todos);
      localStorage.setItem(STORAGE_KEY, parsed);
      document.dispatchEvent(new Event(SAVED_EVENT));
    }
  }

  //variabel custom event untuk debugging
  const SAVED_EVENT = "saved-todo";
  //inisialisasikan key untuk storage local
  const STORAGE_KEY = "TODO_APPS";

  //Memeriksa browser mendukung fitur web storage
  function isStorageExist() /*Boolean*/ {
    if (typeof Storage === undefined) {
      alert("Browser kamu tidak mendukung local storage");
      return false;
    }
    return false;
  }

  //untuk memudahkan mengetahui pada setiap perubahan data bisa sukses di perbarui
  document.addEventListener(SAVED_EVENT, function () {
    console.log(localStorage.getItem(STORAGE_KEY));
  });
});

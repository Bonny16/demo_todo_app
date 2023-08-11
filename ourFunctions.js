document.addEventListener("DOMContentLoaded", () => {
  const ourTodoForm = document.querySelector(".todo-form");
  const ourTodoList = document.querySelector(".todo-list");
  const userNameElement = document.getElementById("user-name");
  const searchInput = document.getElementById("search-input");
  const deleteAllButton = document.getElementById("delete-all-button");
  const deleteSelectedButton = document.getElementById("delete-selected-button");

  //user's name input
  const userName = prompt("Please enter your name:");
  if (userName !== null && userName.trim() !== "") {
    userNameElement.textContent = userName;
  }

  //level view
  function createNewTaskItem(newItemText) {
    const ourTaskItem = document.createElement("div");
    ourTaskItem.className = "todo-item";

    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    ourTaskItem.appendChild(checkBox);

    const labelText = document.createElement("label");
    labelText.innerText = newItemText + " (" + getCurrentDate() + ")";
    ourTaskItem.appendChild(labelText);

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.innerHTML = "X";
    ourTaskItem.appendChild(deleteButton);

    const editButton = document.createElement("button");
    editButton.className = "edit-button";
    editButton.innerHTML = "Edit";
    ourTaskItem.appendChild(editButton);

    return ourTaskItem;
  }

  //for generating date-time
  function getCurrentDate() {
    const currentDate = new Date();
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return currentDate.toLocaleDateString('en-US', options);
  }

   //for create element-task
  ourTodoForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const newTasktext = document.getElementById("new-task");
    console.log("New input text is : ", newTasktext.value);

    if (newTasktext.value.trim() !== "") {
      const newlyCreatedItem = createNewTaskItem(newTasktext.value);

      ourTodoList.appendChild(newlyCreatedItem);

      newTasktext.value = "";
    }
  });

   //for delete option(one by one)
  ourTodoList.addEventListener("click", (event) => {
    if (event.target.matches(".delete-button")) {
      const ourItem = event.target.parentElement;
      console.log("Our parent Element ", ourItem);

      if (confirm("Do you want to delete it?")) {
        ourTodoList.removeChild(ourItem);
      }
    }
  });
 
  //for edit option
  ourTodoList.addEventListener("click", (event) => {
    if (event.target.matches(".edit-button")) {
      const ourItem = event.target.parentElement;
      const labelText = ourItem.querySelector("label");
      const currentTaskText = labelText.innerText;
      const newTaskText = prompt("Edit task:", currentTaskText);

      if (newTaskText !== null && newTaskText.trim() !== "") {
        labelText.innerText = newTaskText.trim() + " (" + getCurrentDate() + ")";
      }
    }
  });
  
  //for searching
  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const tasks = ourTodoList.querySelectorAll(".todo-item");
  
    tasks.forEach(task => {
      const taskText = task.querySelector("label").innerText.toLowerCase();
      if (taskText.includes(searchTerm)) {
        task.style.display = "block";
      } else {
        task.style.display = "none";
      }
    });
  });

  //for delete all
  deleteAllButton.addEventListener("click", () => {
    if (confirm("Do you want to delete all tasks?")) {
      ourTodoList.innerHTML = ""; // Remove all tasks from the list
    }
  });
  
  //delete multiple selected
  deleteSelectedButton.addEventListener("click", () => {
    const selectedTasks = ourTodoList.querySelectorAll(".todo-item input[type='checkbox']:checked");

    if (selectedTasks.length > 0) {
      if (confirm("Do you want to delete selected tasks?")) {
        selectedTasks.forEach(task => {
          ourTodoList.removeChild(task.parentElement);
        });
      }
    } else {
      alert("No tasks selected.");
    }
  });


});

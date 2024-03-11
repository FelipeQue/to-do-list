
let addTaskButton = document.getElementById("add-task");
let taskList = document.getElementById("actual-list");
let insertTask = document.getElementById("insert-task");
let taskAmount;

// O clique do botão para adicionar nova tarefa:
addTaskButton.addEventListener('click', function () {
  if (insertTask.value) {
    createTask(insertTask.value);
    updateTaskAmount();
    insertTask.value = "";
    renderList();
  };
});

// Aqui quero que a tecla "enter" também provoque o clique do botão adicionar:
insertTask.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addTaskButton.click();
  }
});

// Função para carregar a lista de tarefas do LocalStorage:
function getTaskList() {
  let taskListStorage = localStorage.getItem("tasks");
  if (!!taskListStorage) {
    return JSON.parse(taskListStorage);
  }
  return [];
};

// Função para criar objeto tarefa e adicionar ao LocalStorage:
function createTask(taskName) {
  let task = {
    name: taskName,
    done: false
  };
  let taskListStorage = getTaskList();
  taskListStorage.push(task);
  localStorage.setItem("tasks", JSON.stringify(taskListStorage));
  renderList();
};

// Função para "renderizar" as tarefas na página:
function renderList() {
  let taskListStorage = getTaskList();
  taskList.innerHTML = "";

  taskListStorage.map((task, index) => {
    let idCheck = 'task-' + index;
    let idButton = 'remove-task-' + index;

    let checkbox = document.createElement("input");
    checkbox.classList.add("check-task");
    checkbox.type = "checkbox";
    checkbox.id = idCheck;

    let li = document.createElement("li");
    li.classList.add("todo-item");
    li.appendChild(checkbox);
    li.innerHTML += `<span class="todo-item-text">${task.name}</span>`;
    li.innerHTML += `<button id='${idButton}' title="Apagar tarefa" class="delete-button"><i class='bx bxs-x-square'></i></button> `
    taskList.appendChild(li)

    let idCheckbox = document.getElementById(idCheck);
    idCheckbox.checked = task.done;
    idCheckbox.addEventListener("change", function () {
      setTaskDone(task.name);
    });

    // Apagar a tarefa, usando a janela de confirmação da library SweetAlert:
    // (Para documentação desta biblioteca: https://sweetalert2.github.io/ )

    let deleteButton = document.getElementById(idButton);
    deleteButton.addEventListener("click", function() {
      Swal.fire({
        title: "Tem certeza que deseja remover esta tarefa?",
        text: `A tarefa "${task.name}" será apagada de modo irreversível.`,
        showCancelButton: true,
        confirmButtonColor: "green",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, apagar.",
        cancelButtonText: "Cancelar."
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Tarefa apagada.",
            text: `A tarefa "${task.name}" foi removida da lista.`,
            confirmButtonColor: "green"
          });
          removeTask(task.name);
          updateTaskAmount();
        }
      });
    });

  }); // Aqui termina o método map
}; // Aqui termina a função renderList()

// Função para marcar uma tarefa como concluída:
function setTaskDone(taskName) {
  let taskListStorage = getTaskList();
  taskListStorage.map(task => {
    if (task.name == taskName) {
      task.done = !task.done;
    };
  });
  localStorage.setItem("tasks", JSON.stringify(taskListStorage));
};

// Função para remover uma tarefa do LocalStorage:
function removeTask(taskName) {
  let taskListStorage = getTaskList();
  taskListStorage = taskListStorage.filter(task => {
    if (task.name != taskName) {
      return true
    };
  });
  localStorage.setItem("tasks", JSON.stringify(taskListStorage));
  renderList();
};

// Função que mostra a quantidade de tarefas:
function updateTaskAmount() {
  taskAmount = getTaskList().length;
  if (taskAmount == 0) {
    let emptyMessage = document.createElement("p");
    emptyMessage.innerText = "Você não tem nenhuma tarefa."
    emptyMessage.id = "empty-message"
    document.getElementById("task-list").appendChild(emptyMessage);
  } else {
    let emptyMessage = document.getElementById("empty-message");
    if (emptyMessage) {
      emptyMessage.remove();
    };
  }
  let taskAmountCounter = document.getElementById("task-amount");
  taskAmountCounter.innerText = taskAmount;
}

// Chamamos a função que "renderiza" as tarefas para que a página já carregue com as tarefas que estão no Local Storage:
renderList()

// Chamamos a função que mostra a quantidade de tarefas para que a página já carregue com um valor inicial caso haja tarefas no Local Storage:
updateTaskAmount()
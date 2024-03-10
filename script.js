
let addTaskButton = document.getElementById("add-task");
let taskList = document.getElementById("actual-list");
let insertTask = document.getElementById("insert-task");
let taskAmount;

// O clique do botão adicionar:
addTaskButton.addEventListener('click', function() {
    // Verificar se existe algo escrito (aproveitando que Javascript é truthy):
    if (insertTask.value) {
        createTask(insertTask.value);
        updateTaskAmount();
        insertTask.value = "";   
        renderList();     
    };
});

// Eu quero que o enter também provoque o clique do botão adicionar:
insertTask.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addTaskButton.click();
  }
});

// Função para carregar a lista de tarefas do LocalStorage:
function getTaskList(){
  let taskListStorage = localStorage.getItem("tasks");
  if(!!taskListStorage){
    return JSON.parse(taskListStorage);
  }
  return [];
};

// Função para criar objeto tarefa e adicionar ao LocalStorage:
function createTask(taskName){
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
function renderList(){
  let taskListStorage = getTaskList()
  taskList.innerHTML = "";

  taskListStorage.map((task, index) => {
    let id = 'tarefa-' + index;
    let idButton = 'remover-tarefa-' + index;

    let checkbox = document.createElement("input");
    checkbox.classList.add("check-task");
    checkbox.type = "checkbox";
    checkbox.id = id;

    let li = document.createElement("li");
    li.classList.add("todo-item");
    li.appendChild(checkbox);
    li.innerHTML += `<span class="todo-item-text">`+ task.name + `</span>`;
    li.innerHTML += `<button id='${idButton}' title="Apagar tarefa" class="delete-button"><i class='bx bxs-x-square'></i></button> `

    taskList.appendChild(li)

    let idCheckbox = document.getElementById(id);
    idCheckbox.checked = task.done;
  })
};

// Função para remover uma tarefa do LocalStorage:
// EXERCICIO 03

// Função para marcar uma tarefa como concluída:
// EXERCICIO 02

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

// Chamamos a função que mostra a quantidade de tarefas para que a página já carregue com um valor inicial referente aos items que estão no HTML:
updateTaskAmount()
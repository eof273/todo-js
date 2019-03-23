window.onload = () => {
  loadFromStorage();
  fillList(todoList);

  document
    .getElementById('add-task-btn')
    .addEventListener('click', onClickAddButton);
};

function onClickAddButton() {
  const taskTitleInput = document.getElementById('task-title-input');
  const title = taskTitleInput.value;

  if (!title) {
    alert('Must have title!');
    return false;
  }

  taskTitleInput.value = '';

  const newTask = createTask({title});

  todoList = sortTasks(addTask(todoList, newTask));

  insertTaskToTaskList(newTask);
}

function fillList(tasks) {
  const mainList = document.getElementById('main-list');

  tasks.forEach(task => {
    mainList.appendChild(createListItem(task));
  });
}

function createListItem(task) {
  const nbspFn = () => document.createTextNode('\u00A0');

  const li = document.createElement('li');
  li.setAttribute('id', 'task-list-item-' + task.id);

  const checkbox = document.createElement('input');
  checkbox.setAttribute('id', 'task-checkbox-' + task.id);
  checkbox.setAttribute('type', 'checkbox');
  checkbox.addEventListener('click', checkboxEventListener);

  const span = document.createElement('span');
  span.setAttribute('id', 'task-title-span-' + task.id);
  span.innerText = task.title;
  span.addEventListener('click', spanClickEventListener);

  const input = document.createElement('input');
  input.setAttribute('id', 'task-title-input-' + task.id);
  input.classList.add('hiding-element');
  input.value = task.title;
  input.addEventListener('blur', inputBlurEventListener);

  const btn = document.createElement('button');
  btn.setAttribute('id', 'delete-task-btn-' + task.id);
  btn.innerText = 'X';
  btn.addEventListener('click', btnEventListener);

  if (task.completed) {
    checkbox.checked = true;

    setCompleted();
  }

  li.appendChild(checkbox);
  li.appendChild(nbspFn());
  li.appendChild(span);
  li.appendChild(input);
  li.appendChild(nbspFn());
  li.appendChild(btn);

  // You can't "uncomplete" completed task. Sorry ¯\_(ツ)_/¯
  function checkboxEventListener() {
    setCompleted();

    saveToStorage();
  }

  function spanClickEventListener() {
    span.classList.add('hiding-element');

    input.classList.remove('hiding-element');
    input.focus();
  }

  function inputBlurEventListener() {
    const editedTask = editTask(task, {title: input.value});
    todoList = sortTasks(todoList);

    span.innerText = editedTask.title;

    input.classList.add('hiding-element');
    span.classList.remove('hiding-element');

    insertTaskToTaskList(editedTask, li);
  }

  function btnEventListener() {
    if (!confirm('Are you sure?')) {
      return false;
    }

    removeTask(todoList, task.id);
    li.remove();

    saveToStorage();
  }

  function setCompleted() {
    markAsCompleted(task);
    span.classList.add('completed-task');
    checkbox.setAttribute('disabled', 'true');

    checkbox.removeEventListener('click', checkboxEventListener);
    span.removeEventListener('click', spanClickEventListener);
  }

  return li;
}

function insertTaskToTaskList(task, listItem) {
  const mainList = document.getElementById('main-list');
  listItem = listItem || createListItem(task);

  const taskPosition = getTaskIndex(todoList, task.id);

  if (taskPosition === todoList.length - 1) {
    // If last element - just use appendChild
    mainList.appendChild(listItem);
  } else {
    const nextTaskId = getTaskId(todoList, taskPosition + 1);
    const nextTaskElement = document.getElementById('task-list-item-' + nextTaskId);

    mainList.insertBefore(listItem, nextTaskElement);
  }

  saveToStorage();
}

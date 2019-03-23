/** @type TaskList */
let todoList = [];
let maxId = 0;

/**
 * Create new task;
 * @property {Object} Data
 * @return {Task}
 */
function createTask({title, completed = false}) {
  return {
    id: ++maxId,
    title,
    completed
  };
}

/**
 * Add task to task list;
 * @param {TaskList} tasks
 * @param {Task} task
 * @return {TaskList}
 */
function addTask(tasks, task) {
  tasks.push(task);

  return tasks;
}

/**
 * Sort tasks in "reverse order by the task title";
 * @param {TaskList} tasks
 * @return TaskList
 */
function sortTasks(tasks) {
  return tasks.sort((a, b) => b.title.localeCompare(a.title));
}

/**
 * Edit existing task;
 * @param {Task} task
 * @param {Object} data
 * @return {Task}
 */
function editTask(task, {title, completed}) {
  if (title) {
    task.title = title;
  }

  if (completed) {
    task.completed = completed;
  }

  return task;
}

/**
 * Mark existing task as completed;
 * @param {Task} task
 * @return {Task}
 */
function markAsCompleted(task) {
  task.completed = true;

  return task;
}

/**
 * Remove task from task list by id;
 * @param {TaskList} tasks
 * @param {Number} taskId
 * @return {TaskList}
 */
function removeTask(tasks, taskId) {
  const taskIndex = tasks.findIndex(({id}) => id === taskId);
  tasks.splice(taskIndex, 1);

  return tasks;
}

/**
 * Get task index in task list by id;
 * @param {TaskList} tasks
 * @param {Number} taskId
 * @return {Number}
 */
function getTaskIndex(tasks, taskId) {
  return tasks.findIndex(({id}) => id === taskId);
}

/**
 * Get task id by task list's index;
 * @param {TaskList} tasks
 * @param {Number} taskIndex
 * @return {Number}
 */
function getTaskId(tasks, taskIndex) {
  return (tasks[taskIndex] || {}).id;
}

/** Save data to local storage; */
function saveToStorage() {
  localStorage.setItem('todoList', JSON.stringify(todoList));
  localStorage.setItem('maxId', JSON.stringify(maxId));
}

/** Load data from local storage; */
function loadFromStorage() {
  todoList = JSON.parse(localStorage.getItem('todoList')) || todoList;
  maxId = JSON.parse(localStorage.getItem('maxId')) || maxId;
}

/**
 * @typedef {Object} Task
 * @property {Number} id
 * @property {String} title
 * @property {Boolean} completed
 */

/**
 * @typedef {[Task]} TaskList
 */

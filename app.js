const taskInput = document.querySelector('.add-task__entry');
const addButton = document.querySelector('.add-task__button');
const todoList = document.querySelector('.todo-tasks__list');
const completedList = document.querySelector('.completed-tasks__list');

function createElementWithClasses(tag, classes) {
  const element = document.createElement(tag);
  element.classList.add(...classes);

  return element;
}

function createNewTask(task) {
  const listItem = createElementWithClasses('li', ['list__item', 'item']);
  const checkboxInput = createElementWithClasses('input', ['item__checkbox']);
  checkboxInput.type = 'checkbox';

  const label = createElementWithClasses('label', ['item__label']);
  label.innerText = task;

  const textInput = createElementWithClasses('input', ['item__entry', 'entry']);
  textInput.type = 'text';

  const editButton = createElementWithClasses('button', ['item__button', 'button', 'button_edit']);
  editButton.innerText = 'Edit';

  const deleteButton = createElementWithClasses('button', ['item__button', 'button', 'button_remove']);
  const deleteButtonImg = createElementWithClasses('img', ['button__img']);
  deleteButtonImg.src = './remove.svg';
  deleteButtonImg.alt = 'button remove';

  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkboxInput);
  listItem.appendChild(label);
  listItem.appendChild(textInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
}

function editTask() {
  const listItem = this.parentNode;
  const textInput = listItem.querySelector('.item__entry');
  const label = listItem.querySelector('.item__label');
  const editButton = listItem.querySelector('.button_edit');

  if (listItem.classList.contains('item_edit')) {
    label.innerText = textInput.value;
    editButton.innerText = 'Edit';
  } else {
    textInput.value = label.innerText;
    editButton.innerText = 'Save';
  }

  listItem.classList.toggle('item_edit');
}

function deleteTask() {
  const listItem = this.parentNode;
  const ul = listItem.parentNode;

  ul.removeChild(listItem);
}

function bindTaskEvents(taskItem, checkboxEventHandler) {
  const checkboxInput = taskItem.querySelector('.item__checkbox');
  const editButton = taskItem.querySelector('.button_edit');
  const deleteButton = taskItem.querySelector('.button_remove');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkboxInput.onchange = checkboxEventHandler;
}

function moveTask(listItem, targetList, eventHandler) {
  targetList.appendChild(listItem);

  bindTaskEvents(listItem, eventHandler);
}

function incompleteTask() {
  const listItem = this.parentNode;

  moveTask(listItem, todoList, completedTask);
}

function completedTask() {
  const listItem = this.parentNode;

  moveTask(listItem, completedList, incompleteTask);
}

function addTask() {
  if (!taskInput.value) return;

  const listItem = createNewTask(taskInput.value);

  moveTask(listItem, todoList, completedTask);

  taskInput.value = '';
}

addButton.addEventListener('click', addTask);

Array.from(todoList.children).forEach((child) => {
  bindTaskEvents(child, completedTask);
});

Array.from(completedList.children).forEach((child) => {
  bindTaskEvents(child, incompleteTask);
});

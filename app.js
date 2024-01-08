const taskInput = document.querySelector('.add-task__entry');
const addButton = document.querySelector('.add-task__button');
const todoList = document.querySelector('.todo-tasks__list');
const completedList = document.querySelector('.completed-tasks__list');

function createNewTaskElement(taskString) {
  const listItem = document.createElement('li');
  listItem.classList.add('list__item');
  listItem.classList.add('item');

  const checkboxInput = document.createElement('input');
  checkboxInput.type = 'checkbox';
  checkboxInput.className = 'item__checkbox';

  const label = document.createElement('label');
  label.innerText = taskString;
  label.className = 'item__label';

  const textInput = document.createElement('input');
  textInput.type = 'text';
  textInput.className = 'item__entry entry';

  const editButton = document.createElement('button');
  editButton.innerText = 'Edit';
  editButton.className = 'item__button button button_edit';

  const deleteButton = document.createElement('button');
  deleteButton.className = 'item__button button button_remove';

  const deleteButtonImg = document.createElement('img');
  deleteButtonImg.src = './remove.svg';
  deleteButtonImg.alt = 'button remove';
  deleteButtonImg.className = 'button__image';

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

function bindTaskEvents(taskListItem, checkBoxEventHandler) {
  const checkBox = taskListItem.querySelector('input[type=checkbox]');
  const editButton = taskListItem.querySelector('.button_edit');
  const deleteButton = taskListItem.querySelector('.button_remove');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
}

function taskIncomplete() {
  const listItem = this.parentNode;
  todoList.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

function taskCompleted() {
  const listItem = this.parentNode;
  completedList.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

function addTask() {
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);

  todoList.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = '';
}

addButton.addEventListener('click', addTask);

for (let i = 0; i < todoList.children.length; i += 1) {
  bindTaskEvents(todoList.children[i], taskCompleted);
}

for (let i = 0; i < completedList.children.length; i += 1) {
  bindTaskEvents(completedList.children[i], taskIncomplete);
}

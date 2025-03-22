document.addEventListener('DOMContentLoaded', () => {
  let todoList = JSON.parse(localStorage.getItem('todoList')) || [];

  function addTodo() {
    let inputElement = document.querySelector('.js-name-input');
    let nameVal = inputElement.value;

    let dateInputElement = document.querySelector('.js-due-date-input');
    if (!dateInputElement.value) {
      dateInputElement.value = new Date().toISOString().split('T')[0];
    }
    let dueDateVal = new Date(dateInputElement.value + 'T00:00').toLocaleDateString('en-US');

    if (nameVal.trim() === '') {
      alert('Please enter a todo name.');
      return;
    }

    todoList.push({
      name: nameVal,
      dueDate: dueDateVal
    });
    localStorage.setItem('todoList', JSON.stringify(todoList));

    inputElement.value = '';
    renderTodoList();
  }

  function renderTodoList() {
    let todoListHTML = '';

    for (let i = 0; i < todoList.length; i++) {
      const { name, dueDate } = todoList[i];

      let html = `
      <div class="todo-item">
        <div class="item-name">${i + 1}. ${name}</div>
        <div class="item-due-date">Due: ${dueDate}</div>
        <button class="delete-todo-button js-delete-todo-button">Delete</button>
      </div>
      `;
      todoListHTML += html;
    }
    document.querySelector('.js-todo-list').innerHTML = todoListHTML;

    document.querySelectorAll('.js-delete-todo-button').forEach((deleteButton, index) => {
      deleteButton.addEventListener('click', () => {
        todoList.splice(index, 1);
        localStorage.setItem('todoList', JSON.stringify(todoList));
        renderTodoList();
      });
    });
  }

  document.querySelector('.js-add-todo-button')
    .addEventListener('click', () => {
      addTodo();
    });

  document.body.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && document.activeElement !== document.querySelector('.js-due-date-input')) {
      addTodo();
    }
  });

  renderTodoList();
});


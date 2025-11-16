// Основной контейнер todo
const todoApp = document.querySelector('[data-js-todo]');

// Формы
const newTaskForm = document.querySelector('[data-js-todo-new-task-form]');
const searchTaskForm = document.querySelector('[data-js-todo-search-task-form]');

// Инпуты
const newTaskInput = document.querySelector('[data-js-todo-new-task-input]');
const searchTaskInput = document.querySelector('[data-js-todo-search-task-input]');

// Элементы информации
const totalTasks = document.querySelector('[data-js-todo-total-tasks]');
const deleteAllButton = document.querySelector('[data-js-todo-delete-all-button]');

// Список задач
const todoList = document.querySelector('[data-js-todo-list]');

//Кнопка удаления задачи
const taskDeleteButton = document.querySelector('[data-js-todo-item-delete-button]');

let tasks = JSON.parse(localStorage.getItem('todo-items')) || [];

render()

//Добавление задачи в массив
newTaskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = newTaskInput.value.trim();

  //Создание элемента массива
  const task = {
    id: Date.now().toString(),
    title,
    isChecked: false
  };

  tasks.push(task)
  // console.log(newTaskInput.value)
  // console.log(tasks)
  save()
  render()

  // Очищаем инпут и ставим фокус
  newTaskInput.value = ''
  newTaskInput.focus()
})

// Сохранение массива tasks в localStorage
function save() {
  localStorage.setItem('todo-items', JSON.stringify(tasks));
}

//Отрисовка элементов массива tasks
function render(list = tasks) {
  totalTasks.textContent = list.length;

  //Показ кнопки Удалить все
  if(tasks.length === 0){
    deleteAllButton.classList.remove('is-visible');
  } else {
    deleteAllButton.classList.add('is-visible');
  }

  todoList.innerHTML = list
    .map(
      (task) => `
      <li class="todo__item todo-item" data-id="${task.id}">
        <input
          class="todo-item__checkbox"
          id="${task.id}"
          type="checkbox"
          ${task.isChecked ? "checked" : ""}
          data-js-todo-item-checkbox
        />

        <label
          for="${task.id}"
          class="todo-item__label"
        >
          ${task.title}
        </label>

        <button
          class="todo__item-delete-button"
          type="button"
          aria-label="Delete"
          title="Delete"
          data-js-todo-item-delete-button
        >
          <svg width="20" height="20" viewBox="0 0 20 20">
            <path
              d="M15 5L5 15M5 5L15 15"
              stroke="#757575"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </li>
    `
    )
    .join('');
}

//Удаление всех задач
deleteAllButton.addEventListener('click', () => {
  const confirmed = confirm('Вы точно хотите удалить ВСЕ?');

  if (!confirmed) return

  tasks = []
  save()
  render()
});

//Удаление отдельной задачи
todoList.addEventListener('click', (e) => {
  if(e.target.matches('[data-js-todo-item-delete-button]')) {

    const li = e.target.closest('li')
    const id = li.dataset.id
    console.log(id)

    tasks = tasks.filter(task => task.id !== id)

    save()
    render()
  }
})

//Поиск по таскам
searchTaskInput.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase()

  const filtered = tasks.filter(task =>
    task.title.toLowerCase().includes(query)
  )

  render(filtered)
});

// Изменение чекбокса
todoList.addEventListener('change', (e) => {
  if(e.target.matches('[data-js-todo-item-checkbox]')) {
    const li = e.target.closest('li')
    const id = li.dataset.id

    const task = tasks.find(task => task.id === id)
    task.isChecked = e.target.checked

    save()
    render()
  }
})
















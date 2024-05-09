document.addEventListener('DOMContentLoaded', function(){
    const form = document.getElementById('todo-form');
    const todoInput = document.getElementById('new-todo');
    const todoList = document.getElementById('todo-list');

    form.addEventListener('submit', function(event){
        event.preventDefault();
        const todoText = todoInput.value;
        addTodoItem(todoText);
        saveTodos();
        todoInput.value = ''; // clear input field
        
    });

    function addTodoItem(text, completed = false){ //adds the todo items
        const li = document.createElement('li'); //creates list item
        li.innerText = text;

        if (completed) {
            li.style.textDecoration = 'line-through';
        }

        // Add complete button
        const completeButton = document.createElement('button');
        completeButton.innerText = 'Complete';
        completeButton.addEventListener('click', function() {
            li.style.textDecoration = 'line-through'; // mark as completed
            completeButton.disabled = true; // Disable the complete button
            saveTodos();
        });
        li.appendChild(completeButton); //add to list item

        // Add remove button
        const removeButton = document.createElement('button');
        removeButton.innerText = 'Remove';
        removeButton.addEventListener('click', function() {
            todoList.removeChild(li);
            saveTodos(); // updating list after removal
        });
        li.appendChild(removeButton);//add the button to list item

        todoList.appendChild(li); //appened the list item
    }

    function saveTodos() { //save the text and completed flags to local storage
        const todos = [];
        const items = todoList.getElementsByTagName('li');
        for (let item of items) {
            const text = item.childNodes[0].textContent; // get the text content of the li without button text
            let completed = false; // this flag should be false by default
            if (item.style.textDecoration === 'line-through') {
                completed = true; 
            }
            todos.push({ text, completed }); //save the text and flag
        }
        localStorage.setItem('todos', JSON.stringify(todos)); // Save to local storage
    }

    function loadTodos() {
        const todos = JSON.parse(localStorage.getItem('todos')) || []; 
        for (let todo of todos) {
            addTodoItem(todo.text, todo.completed); //when loading, takes the flag
        }
    }

    loadTodos();
});



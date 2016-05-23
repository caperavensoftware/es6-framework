 class TodoPresenter
{
    constructor()
    {
        this.domMap = new WeakMap(); //map todoItem to the element that represents it
        this.todoList = document.getElementById('todoList');
    }

    add(todoItem)
    {
        let element = document.createElement('li');
        element.className = todoItem.isDone ? 'done' : '';
        
        element.innerHTML =
        `
            <input type="checkbox" id="chbSelection"></input>
            <span id="spanTodo">${todoItem.todo}</span>
            <span id="spanDate">${todoItem.completeBy}</span>
        `;
               
        this.todoList.appendChild(element);
        this.domMap.set(element, todoItem);
    }

    remove(element) 
    {
        if (this.domMap.has(element)) {
            let todoItem = this.domMap.get(element);

            this.domMap.delete(element);            
            this.todoList.removeChild(element);
            
            return todoItem;    
        }
    }

    loadTodoItems(todoItems) 
    {
        window.requestAnimationFrame(() => {
            while(this.todoList.firstChild) 
            {
                this.todoList.removeChild(this.todoList.firstChild);
            }
            
            for(let todoItem of todoItems) 
            {
                this.add(todoItem);
            }               
        });
    }    
}
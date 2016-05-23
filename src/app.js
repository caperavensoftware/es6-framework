import TodoRepo from './Todo/todoRepo';
import TodoItem from './Todo/todoItem';
import TodoPresenter from './Todo/todoPresenter';

const applicationMessages = {
    fillInMessage: 'please fill in this field',
    required: '* required'
};

class Application 
{   
    constructor() 
    {
        this.store = new TodoRepo();
        this.presenter = new TodoPresenter();
        this.setupEvents();
    }

    setupEvents() 
    {
        document.getElementById('btnAdd').addEventListener('click', this.btnAddClicked.bind(this));
       
       
    }

    btnAddClicked() 
    {
        let todoText = this.todoText;
        let dateText = this.dateText;

//        if (todoText.length === 0) 
//        {
//            this.setRequiredMessage('spanTodoMessage', applicationMessages.fillInMessage);
//            return;
//        }
//
//        if (dateText.length === 0) 
//        {
//            this.setRequiredMessage('spanDateMessage', applicationMessages.fillInMessage);
//            return;
//        }
        
        let todoItem = new TodoItem(todoText, dateText);
        this.store.add(todoItem);
        this.presenter.add(todoItem);

        todoText.focus();
        todoText.value = "";
        dateText.value = "";
    }    

    get todoText() {
        return document.getElementById('edtTodo').value;
    }

    get dateText() {
        return document.getElementById('edtDate').value;
    }
    
    run() 
    {
        //insert initialization logic here
    }
   
}

let application = new Application();
application.run();
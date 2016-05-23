
class TodoItem 
{
    constructor(text, completeBy) 
    {
        this.text = text;
        this.completeBy = completeBy;
        this.isDone = false;
    }

    get storeKey() 
    {
        return todoStorePrefix + this.text;
    }

}
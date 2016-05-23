
class TodoRepo {

    add(todoItem)
    {
        this.localStorage.setItem(todoItem.storeKey, JSON.stringify(todoItem));
    }

    remove(todoItem) 
    {
        this.localStorage.removeItem(todoItem.storeKey);
    }

    update(todoItem) 
    {
        this.localStorage.setItem(todoItem.storeKey, todoItem);
    }

    findByKey(key) 
    {
        return JSON.parse(this.localStorage.getItem(key));
    }

    getAll() {
        let items = [];
        for(let i=0; i < localStorage.length; i++) 
        {
            let key = localStorage.key(i);
            if (key.startsWith(todoStorePrefix)) {
                let todoItem = findByKey(key);
                items.add(todoItem);
            }
        }
        return items;
    }

    clearAll() 
    {
        this.localStorage.clear();
    }
}
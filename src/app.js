import {Calculator} from './calculator';

class Application {
    addElement(value) {
        let element = window.document.createElement('div');
        element.innerText = value;
        window.document.body.appendChild(element);
    }
        
    run() {
        let calculator = new Calculator();
        let addresult = calculator.add(1,2);
        this.addElement(addresult);      
        
        let result = calculator.multiply(2, 3);  
        this.addElement(result);      
    }
}

let app = new Application();
app.run();



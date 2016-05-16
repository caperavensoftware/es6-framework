export class Calculator {
    add(value1, value2) {
        return value1 + value2;
    }
    
    subtract(value1, value2) {
        return value1 - value2;       
    }
    
    multiply(value1, value2) {
        if (this.validate(value1, value2)) {
            const result = value1 * value2;
            return result;            
        }
        
        return -1;
    }
    
    validate(value1, value2) {
        return value1 > 0 && value2 > 0;
    }
}

export default class Something {
    report() {
        console.log("report");
    }
}
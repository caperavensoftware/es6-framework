import esprima from 'esprima';

export default class ParsedCodeContainer {
    constructor() {
        this.codeSummary = [];
    }
    
    add(code, path) {
        this.codeSummary.push(CodeSummary.createFromCode(code, path));   
    }
    
    clear() {
        this.codeSummary = [];
    }
}

export class CodeSummary {
    constructor() {
        this.imports = [];
        this.classes = [];
        this.functions = [];
        this.globals = [];
        this.path = '';        
        this.hasBeenImportedInTest = false;
    }
    
    static createFromCode(code, path) {
        let syntax = esprima.parse(code, {sourceType: 'module'});
        let result = new CodeSummary();
        result.path = path;
        
        for(let value of syntax.body) {            
           if (value.type === "ImportDeclaration"){
               result.imports.push(ImportSummary.createFromSyntax(value));            
           }
           else if (value.type === "ClassDeclaration") {
               result.classes.push(ClassSummary.createFromSyntax(value));
           }
           else if (value.type === "ExportNamedDeclaration" || value.type === "ExportDefaultDeclaration") {
               result.classes.push(ClassSummary.createFromSyntax(value.declaration));
           }
        }
                 
        return result;       
    }
    
    checkIfImportedInTests(testsCodeSummary) {
        for (let classSummary of this.classes) {            
            const className = classSummary.name;
            let foundClassInImports = false;
            
            for (let testCodeSummaryItem of testsCodeSummary) {
                for (let importSummaryItem of testCodeSummaryItem.imports) {
                    for (let includedClass of importSummaryItem.importedClasses) {
                        if (includedClass === className) {
                            foundClassInImports = true;
                            this.hasBeenImportedInTest = true;
                        }
                    }
                }                                
            }
                        
            classSummary.hasBeenImportedInTest = foundClassInImports;                                    
        }    
    }    
}

export class ImportSummary {
    constructor() {
        this.importedClasses = [];
        this.importSource = '';
    }
    
    static createFromSyntax(syntax) {
        const result = new ImportSummary();        
        
        for(let specifier of syntax.specifiers) {
            result.importedClasses.push(specifier.local.name);                
        }

        result.importSource = syntax.source.value;        
        return result;
    }
}

export class ClassSummary {
    constructor() {
        this.name = '';
        this.functions = [];
        this.hasBeenImportedInTest = false;
    }
    
    static createFromSyntax(syntax) {
        const result = new ClassSummary();        
        result.name = syntax.id.name;
        
        for(let member of syntax.body.body) {
           if (member.kind === 'method') {
               result.functions.push(member.key.name);
           }
        }
                
        return result;
    }
}

export class PrintSummaryContainer {
    constructor(codeSummaries) {
        this.summaryItems = [];
        this.parse(codeSummaries);        
    }
    
    parse(codeSummaries) {
        for (let summary of codeSummaries) {
            let printSummary = new PrintCodeSummery(summary);
            this.summaryItems.push(printSummary);
        }
    }
    
    get jsonText() {
        return JSON.stringify(this, null, 4);
    }
}

export class PrintCodeSummery {
    constructor(codeSummary) {
        this.path = codeSummary.path;
        this.hasBeenImportedInTest = codeSummary.hasBeenImportedInTest;
        this.classes = [];
        
        for (let classSummary of codeSummary.classes) {
            let printClassSummary = new PrintClassSummary(classSummary);
            this.classes.push(printClassSummary);
        }
    }
}

export class PrintClassSummary {
    constructor(classSummary) {
        this.name = classSummary.name;
        this.hasBeenImportedInTest = classSummary.hasBeenImportedInTest;
    }
}
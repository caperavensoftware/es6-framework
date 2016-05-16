/*jshint strict: false */
import chai from 'chai';
import sinon from 'sinon';
import {Calculator} from './../../src/calculator';
const expect = chai.expect;

describe('Calculator Tests', function() {
    let calculator = null;
    
    before(function() {
        calculator = new Calculator();
    });
    
    it('add', function() {
        const result = calculator.add(1, 1);            
        expect(result).to.equal(2);
    });
    
    it('subtract', function() {
        const result = calculator.subtract(2, 1);
        expect(result).to.equal(1);
    });
    
    it('multiply', function() {        
        sinon.spy(calculator, 'validate');
        
        const result = calculator.multiply(2,2);
        expect(result).to.equal(4);
        expect(calculator.validate.calledOnce).to.be.true;
    });
});

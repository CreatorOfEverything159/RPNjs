const expect = require('chai').expect,
    rpn = require('../rpn');

describe('test calculate reverse polish notation', function () {
    it('test rpnCalculate', function () {
        expect(rpn.calc(rpn.infixToRPN('1+2'))).equal(3);
        expect(rpn.calc(rpn.infixToRPN('1+2+3'))).equal(6);
        expect(rpn.calc(rpn.infixToRPN('1+2*3'))).equal(7);
        expect(rpn.calc(rpn.infixToRPN('(1+2)*3'))).equal(9);
        expect(rpn.calc(rpn.infixToRPN('(1+2)*(3+4)'))).equal(21);
        expect(rpn.calc(rpn.infixToRPN('5-1'))).equal(4);
        expect(rpn.calc(rpn.infixToRPN('5+ -2'))).equal(3);
    });
});

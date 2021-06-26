const expect = require('chai').expect,
    rpn = require('../rpn');

describe('test infix to RPN', function () {
    it('test infixToRPN', function () {
        expect(rpn.infixToRPN('1+2')).equal("1 2 +");
        expect(rpn.infixToRPN('1+2+3')).equal("1 2 + 3 +");
        expect(rpn.infixToRPN('1+2*3')).equal("1 2 3 * +");
        expect(rpn.infixToRPN('(1+2)*3')).equal("1 2 + 3 *");
    });
});

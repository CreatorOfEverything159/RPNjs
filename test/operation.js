const expect = require('chai').expect,
    rpn = require('../rpn');

describe('test _operation', function () {
    it('test "+" operator', function () {
        expect(rpn.operation['+'](0)).deep.equal(NaN);
        expect(rpn.operation['+'](1, 0 )).equal(1);
        expect(rpn.operation['+'](-1, 0 )).equal(-1);
        expect(rpn.operation['+'](2, 1 )).equal(3);
        expect(rpn.operation['+'](2, -1 )).equal(1);
        expect(rpn.operation['+']('2', '3' )).equal(5);
    });

    it('test "-" operator', function () {
        expect(rpn.operation['-'](0)).deep.equal(NaN);
        expect(rpn.operation['-'](0, 1 )).equal(-1);
        expect(rpn.operation['-'](0, -1 )).equal(1);
        expect(rpn.operation['-'](1, 2 )).equal(-1);
        expect(rpn.operation['-'](2, 1 )).equal(1);
        expect(rpn.operation['-']('3', '2' )).equal(1);
    });

    it('test "*" operator', function () {
        expect(rpn.operation['*'](0)).deep.equal(NaN);
        expect(rpn.operation['*'](1, 0 )).equal(0);
        expect(rpn.operation['*'](-1, 0 )).equal(0);
        expect(rpn.operation['*'](2, 1 )).equal(2);
        expect(rpn.operation['*'](2, -1 )).equal(-2);
        expect(rpn.operation['*']('2', '3' )).equal(6);
    });

    it('test "/" operator', function () {
        expect(rpn.operation['/'](0)).deep.equal(NaN);
        expect(rpn.operation['/'](1, 0 )).deep.equal(Infinity);
        expect(rpn.operation['/'](0, 1 )).equal(0);
        expect(rpn.operation['/'](1, 2 )).equal(0.5);
        expect(rpn.operation['/'](-1, 2 )).equal(-0.5);
        expect(rpn.operation['/']('3', '2' )).equal(1.5);
    });
});

(function () {
    var rpn = {
        precedence: {'/': 2, '*': 2, '-': 1, '+': 1, '#': 0},

        operation: {
            '+': (a, b) => (+a) + (+b),
            '-': (a, b) => (+a) - (+b),
            '*': (a, b) => (+a) * (+b),
            '/': (a, b) => (+a) / (+b),
        },

        splitExp(exp) {
            exp = exp.replace(/[a-zA-Z]/g, '')
                .replace(/([\d])\-(\d)/g, '$1 - $2')
                .replace(/([+\-\*\/^])\-(\d)/g, '$1 - $2');
            return (/[\d\)][+\-*\/]{2,}|[+\-*\/]$/.test(exp)) ?
                null : exp.match(/(-?(?:\d+\.?\d*|-?\.\d*))|[()+\-*\/]/gi);
        },

        isOperator(char) {
            return /^[\/\*\-\+#]$/.test(char);
        },

        isBrackets(char) {
            return /^[\(\)]$/.test(char);
        },

        isNumber(str) {
            return /^-?\d+\.\d+$|^-?\d+$/.test(str);
        },

        infixToRPN(exp) {
            var arrExp = rpn.splitExp(exp),
                expStack = [], opStack = [], opItem, stackItem;
            if (!arrExp) {
                return null;
            }
            arrExp = arrExp.concat('#');
            for (var looper = 0; looper < arrExp.length; looper++) {
                opItem = arrExp[looper];

                if (rpn.isNumber(opItem)) {
                    expStack.push(opItem);
                } else if (rpn.isOperator(opItem)) {
                    while (opStack.length) {
                        stackItem = opStack.pop();
                        if ((rpn.precedence[stackItem] > rpn.precedence[opItem]) ||
                            (rpn.precedence[stackItem] >= rpn.precedence[opItem])) {
                            expStack.push(stackItem);
                        } else {
                            opStack.push(stackItem);
                            break;
                        }
                    }
                    opStack.push(opItem);
                } else if (rpn.isBrackets(opItem)) {
                    if (opItem === '(') {
                        opStack.push(opItem);
                    } else {
                        while (opStack.length) {
                            stackItem = opStack.pop();
                            if (stackItem !== '(') {
                                expStack.push(stackItem);
                            } else {
                                break;
                            }
                        }
                    }
                }
            }
            return expStack.length ? expStack.join(' ') : null;
        },

        calc(exp) {
            var arrExp = exp.split(' '), calcStack = [], opItem, param1, param2;

            for (var looper = 0; looper < arrExp.length; looper++) {
                opItem = arrExp[looper];
                if (rpn.isNumber(opItem)) {
                    calcStack.push(opItem);
                } else if (rpn.isOperator(opItem)) {
                    param2 = calcStack.pop();
                    param1 = calcStack.pop();
                    calcStack.push(rpn.operation[opItem](param1, param2));
                }
            }
            return +calcStack.pop().toFixed(3);
        },

    };

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = rpn;
    }

    if (typeof window !== 'undefined') {
        window.rpn = rpn;
    }
}());

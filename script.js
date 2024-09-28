add = (a, b) => a + b;
sub = (a, b) => a - b;
mul = (a, b) => a * b;
div = (a, b) => a / b;

function operate(left, right, operation) {
    switch(operation) {
        case '+': return add(left, right);
        case '-': return sub(left, right);
        case '*': return mul(left, right);
        case '/': return div(left, right);
    }
}
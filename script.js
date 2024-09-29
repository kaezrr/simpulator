add = (a, b) => a + b;
sub = (a, b) => a - b;
mul = (a, b) => a * b;
div = (a, b) => a / b;

function operate(left, right, operation) {
    let result = 0;
    switch(operation) {
        case '+': result = add(left, right);
        break;
        case '-': result = sub(left, right);
        break;
        case '*': result = mul(left, right);
        break;
        case '/': result = div(left, right);
        break;
    }
    return Math.round(result * 10e10) / 10e10;
}

let displayContent = "";
const display = document.querySelector("#display");
let leftSide = undefined;
let rightSide = undefined;
let opr = undefined;

const numberButtons = document.querySelector("#buttons");
numberButtons.addEventListener("click", (e) => {
    const target = e.target;
    switch(target.className) {
        case 'num':
            if(displayContent.length >= 12 || (displayContent && target.textContent === '0' &&
               displayContent.split("").every(e => e === '0'))) return;
            displayContent += target.textContent;
            display.textContent = displayContent;
            break;
        case 'dot':
            if(displayContent.includes('.')) return;
            displayContent += '.';
            display.textContent = displayContent;
            break;
        case 'per': 
            if(displayContent.includes('.')) leftSide = parseFloat(displayContent);
            else leftSide = parseInt(displayContent);
            rightSide = 100;
            displayContent = `${operate(leftSide, rightSide, '/')}`;
            display.textContent = displayContent;
            leftSide = undefined;
            rightSide = undefined;
            break;
        case 'sgn':
            if(!displayContent || displayContent === '0') return;
            if(displayContent.at(0) === '-') displayContent = displayContent.slice(1);
            else displayContent = '-' + displayContent;
            display.textContent = displayContent;
            break;
        case 'opr': 
            if(opr) {
                if (displayContent.includes('.')) rightSide = parseFloat(displayContent);
                else rightSide = parseInt(displayContent);
                displayContent = `${operate(leftSide, rightSide, opr)}`;
                display.textContent = displayContent;
                opr = undefined;
            }
            if(displayContent.includes('.')) leftSide = parseFloat(displayContent);
            else leftSide = parseInt(displayContent);
            opr = target.textContent;
            displayContent = "";
            break;
        case 'eql':
            if(displayContent.includes('.')) rightSide = parseFloat(displayContent);
            else rightSide = parseInt(displayContent);
            displayContent = `${operate(leftSide, rightSide, opr)}`;
            display.textContent = displayContent;
            opr = undefined;
            break;
        case 'rst':
            leftSide = undefined;
            rightSide = undefined;
            opr = undefined;
            displayContent = "";
            display.textContent = displayContent;
            break;
        case 'bck':
            if(!displayContent) return;
            displayContent = displayContent.slice(0, -1);
            display.textContent = displayContent;
            break;
    }
});
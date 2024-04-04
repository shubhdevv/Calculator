let operator = '';
let prevValue = '';
let currValue = '';

document.addEventListener("DOMContentLoaded",function() {
    let clear = document.querySelector("#clear-btn");
    let equal = document.querySelector(".equal");
    let decimal = document.querySelector(".decimal");

    let currScreen = document.querySelector(".current");
    let prevScreen = document.querySelector(".previous");

    let numbers = document.querySelectorAll(".number");
    let operators = document.querySelectorAll(".operator");

    numbers.forEach((number) => number.addEventListener("click",function(e) {
        handlingNumber(e.target.textContent);
        currScreen.textContent = currValue;
    }))

    operators.forEach((op) => op.addEventListener("click",function(e) {
        handlingOpeartor(e.target.textContent)
        prevScreen.textContent = prevValue + " " + operator;
        currScreen.textContent = currValue;
    }))

    clear.addEventListener("click",function() {
        prevValue = '';
        currValue = '';
        operator = '';
        prevScreen.textContent = currValue;
        currScreen.textContent = currValue;
    })

    equal.addEventListener("click",function() {
        if(currValue != '' && prevValue != '') {
        calculate()
        prevScreen.textContent = '';
        currScreen.textContent = prevValue;
        if(prevValue.length <= 5) {
            currScreen.textContent = prevValue;
        }
        else {
            currScreen.textContent = prevValue.slice(0,5) + "..."
        }
     } 
    })

    decimal.addEventListener("click",function() {
        addDecimal();
    })
})

function handlingNumber(num) {
    if(currValue.length <= 5) {
        currValue += num;
    }
}

function handlingOpeartor(op) {
    operator = op;
    prevValue = currValue;
    currValue = '';
}

function calculate() {
    prevValue = Number(prevValue);
    currValue = Number(currValue);

    if(operator === '+') {
        prevValue += currValue;
    }
    else if(operator === '-') {
        prevValue -= currValue;
    }
    else if(operator === '/') {
        prevValue /= currValue; 
    }
    else {
        prevValue *= currValue;
    }
    prevValue = roundoff(prevValue);
    prevValue = prevValue.toString();
    currValue = currValue.toString();
}

function roundoff(num) {
    return Math.round(num * 1000) / 1000;
}

function addDecimal() {
    if(!currValue.includes(".")) {
        currValue += '.';
    }
}
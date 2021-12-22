const clearBtn = document.querySelector(".btn-clear");
const deleteBtn = document.querySelector(".btn-delete");
const decimalBtn = document.querySelector(".btn-decimal");
const negativeBtn = document.querySelector(".btn-negative");
const equalBtn = document.querySelector(".btn-equals");

const number_btns = document.querySelectorAll(".num-btn");
const operator_btns = document.querySelectorAll(".op-btn");

const memory_screen = document.querySelector(".calc-memory");
const input_screen = document.querySelector(".calc-input");

let firstNum = "";
let secondNum = "";
let lastOp = "";
let resetScreen = true;

number_btns.forEach(btn =>
    btn.addEventListener('click', () => updateNums(btn.textContent))
);

operator_btns.forEach(btn =>
    btn.addEventListener('click', () => updateOps(btn.textContent))
);

clearBtn.addEventListener('click', resetAllScreen);
deleteBtn.addEventListener('click', deleteNum);
equalBtn.addEventListener('click', compute);
decimalBtn.addEventListener('click', addDecimal);
negativeBtn.addEventListener('click', addNegative);

function deleteNum() {
    if (resetScreen) return;
    input_screen.textContent = input_screen.textContent.toString().slice(0, -1);
}

function updateNums(num) {
    if (resetScreen) resetNumScreen();
    input_screen.textContent += num;
}


function resetNumScreen() {
    input_screen.textContent = "";
    resetScreen = false;
}

function updateOps(operator) {
    if (lastOp !== "") {
        prepCalculation();
    } 
    firstNum = Number(input_screen.textContent);
    lastOp = operator;
    memory_screen.textContent = firstNum + " " + lastOp;
    resetScreen = true;
}

function prepCalculation() {
    secondNum = Number(input_screen.textContent);
    if (lastOp == "÷" && secondNum == 0) {
        alert("Error: Can't divide by 0");
        return;
    }
    if (resetScreen) return;
    let answer = roundNumber(calculate(firstNum, lastOp, secondNum), 6);
    input_screen.textContent = answer;
    resetScreen = true;
}

function resetAllScreen() {
    input_screen.textContent = 0;
    memory_screen.textContent = "";
    lastOp = "";
    resetScreen = true;
}

function compute() {
    if (resetScreen) return;
    if (lastOp == "") return;
    prepCalculation();
    memory_screen.textContent += " " + secondNum + " " + "=";
    lastOp = "";

}

function roundNumber(num, decimalPlaces) {
    return Number(Math.round(num + "e" + decimalPlaces) + "e-" + decimalPlaces);
}

function addDecimal() {
    if (resetScreen) resetNumScreen();
    if (input_screen.textContent == "") {
        input_screen.textContent += 0;
    }
    if (input_screen.textContent.includes(".")) return;
    input_screen.textContent += ".";
}

function addNegative() {
    let n = Math.abs(Number(input_screen.textContent));
    if (input_screen.textContent.includes("-")) {
        input_screen.textContent = n.toString();
    } else {
        input_screen.textContent = (n*-1).toString();
    }
}

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    if (num2 == 0) {
        return "Error";
    } else {
        return num1 / num2;
    }
}

function calculate(num1, operator, num2) {


    switch(operator) {
        case "+":
            return add(num1, num2);            
        case "-":
            return subtract(num1, num2);        
        case "×":
            return multiply(num1, num2);     
        case "÷":
            return divide(num1, num2);     
    }

}

input_screen.textContent = 0;




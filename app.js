let previousOperand = "";
let currentOperand = "";
let currentOperation = null;
let shouldResetScreen = false;

//Declaration of Variables
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

currentOperandTextElement.textContent = "0";

window.addEventListener('keydown', keyboardInput);
equalsButton.addEventListener('click', evaluate);
deleteButton.addEventListener('click', deleteNumber);
allClearButton.addEventListener('click', allClear);

//Adding EventListeners to number & operation buttons
numberButtons.forEach((button) => 
button.addEventListener('click',() => appendNumber(button.textContent))
);

operationButtons.forEach((button) => 
button.addEventListener('click',() => setOperation(button.textContent))
);

//Appends the number in the screen
function appendNumber(number) {
    if (currentOperandTextElement.textContent === "0" || shouldResetScreen)
        resetScreen();
    if (number == "." && currentOperandTextElement.textContent.includes("."))
        return;
    currentOperandTextElement.textContent += number;
};

//Resets the screen
function resetScreen() {
    currentOperandTextElement.textContent = "";
    shouldResetScreen = false;
}

//Functionality of AC button
function allClear() {
    previousOperandTextElement.textContent = "";
    currentOperandTextElement.textContent = "0";
    currentOperand = "";
    previousOperand = "";
    currentOperation = null;
}

//Functionality of DEL button
function deleteNumber() {
    currentOperandTextElement.textContent = currentOperandTextElement.textContent
                                                                     .toString()
                                                                     .slice(0,-1);
}

//Setting the operation
function setOperation(operator){
    if (currentOperation !== null) evaluate();
    previousOperand = currentOperandTextElement.textContent;
    currentOperation = operator;
    previousOperandTextElement.textContent = `${previousOperand} ${currentOperation}`;
    shouldResetScreen = true;
}

//Evaluating the operation
function evaluate() {
    if(currentOperation === null || shouldResetScreen) return
    if(currentOperandTextElement.textContent === "0" && currentOperation === "÷") {
        alert("You can't divide by 0!");
        return;
    }

    currentOperand = currentOperandTextElement.textContent
    currentOperandTextElement.textContent = roundResult(operate(previousOperand, currentOperand, currentOperation));
    previousOperandTextElement.textContent = `${previousOperand} ${currentOperation} ${currentOperand} =`
    currentOperation = null;
}

//Rounds the results if we have a lot of decimal numbers
function roundResult(number){
    return Math.round(number * 1000) / 1000;
}

//Adding the capability to do operations via Keyboard
function keyboardInput(e) {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
    if (e.key === ".") appendNumber(e.key)
    if (e.key === "=" || e.key === 'Enter') evaluate();
    if (e.key === 'Backspace') deleteNumber();
    if (e.key === 'Escape') allClear();
    if (e.key === "+" || e.key === '-' || e.key === '*' || e.key === "/") 
    setOperation(convertOperation(e.key))
}

function convertOperation(keyboardOperator) {
    if (keyboardOperator === "/") return "÷";
    if (keyboardOperator === '+') return '+';
    if (keyboardOperator === '-') return '-';
    if (keyboardOperator === '*') return 'x'
}

//Operation functions
function add(a, b) {
    return a + b;
}

function substract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b ;
}

function divide(a, b) {
    return a / b;
}

function operate(a, b, operator) {
    a = Number(a);
    b = Number(b);
     switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return substract(a, b);
        case "x":
            return multiply(a, b);
        case "÷":
            if (b === 0) return null
            else return divide(a, b);
        default:
            return null
    }
}
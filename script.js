const display = document.getElementById("result");
const buttons = document.querySelectorAll(".btn");

let currentValue = "";
let previousValue = "";
let operation = null;
display.value = "0"

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const value = button.getAttribute("data-value");

        if (!isNaN(value) || value === ".") {
            handleNumber(value);
        } else if (["+", "-", "*", "/"].includes(value)) {
            handleOperator(value);
        } else if (value === "=") {
            calculate();
        } else if (value === "clear") {
            clearDisplay();
        }
    });
});

function handleNumber(num) {
    if (num === "." && currentValue.includes(".")) return;
    
    if (display.value.includes("=")) {
        clearDisplay();
    }

    if (num === "." && (currentValue === "" || currentValue === "0")) {
        currentValue = "0.";
    } else if (currentValue === "" || currentValue === "0") {
        currentValue = num;
    } else {
        currentValue += num;
    }

    if (!previousValue) {
        updateDisplay(currentValue);
    } else {
        updateDisplay(previousValue + ` ${operation}` + ` ${currentValue}`);
    }   
}

function handleOperator(op) {
    if (currentValue === "") return;

    if (previousValue !== "") {
        calculate();
    }
    
    if (!["*", "/"].includes(op)) {
        updateDisplay(currentValue + ` ${op}`)
    } else if (op === "*") {
        op = "x";
        updateDisplay(currentValue + ` ${op}`);
    } else if (op === "/") {
        op = "÷";
        updateDisplay(currentValue + ` ${op}`);
    }

    operation = op;
    previousValue = currentValue;
    currentValue = "";
}

function calculate() {
    if (previousValue === "" || currentValue === "" || !operation) return;

    const num1 = parseFloat(previousValue);
    const num2 = parseFloat(currentValue);

    let result;

    switch (operation) {
        case "+":
            result = num1 + num2;
            break;
        case "-":
            result = num1 - num2;
            break;
        case "x":
            result = num1 * num2;
            break;
        case "÷":
            result = num2 !== 0 ? num1 / num2 : "Não pode dividir por zero";
            break;
        default:
            return;
    }

    display.value = `${previousValue} ${operation} ${currentValue} = ${result}`;
    currentValue = result.toString();
    previousValue = "";
    operation = null;
}

function clearDisplay() {
    currentValue = "";
    previousValue = "";
    operation = null;
    updateDisplay("0");
}

function updateDisplay(value) {
    display.value = value;
}
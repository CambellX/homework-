const operators = ["+", "-", "x", "/", "=", "C"]

let buttonsDiv = document.querySelector(".buttons")

let expressionDiv = document.querySelector(".expression")

let buttons =
[
    ["7", "8", "9", "+"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "x"],
    ["C", "0", "=", "/"]
]

let currentExpression = []

function isOperator(buttonText) {
    if (operators.includes(buttonText)) {
        return true;
    }
    return false;
}

function renderButtons(buttonElements, targetDiv) {
    for (let buttonEl of buttonElements) {
        targetDiv.appendChild(buttonEl);
    }
}

function makeButton(text, array) {
    let newButton = document.createElement("button")
    newButton.innerText = text;

    if (!isOperator(text)) {
        array.push(newButton);
        return;
    }

    if (text === "C") {
        newButton.className = "clear"
    }
    else {
        newButton.className = "operator"
    }
    array.push(newButton);
    }

function buildButtonsArray(buttons) {
    let resultArray = []
    for (let buttonArr of buttons) {
        for (let buttonText of buttonArr) {
            makeButton(buttonText, resultArray)
            }
        }
    return resultArray;
}

function addListeners(buttonElements) {
    for (let buttonElement of buttonElements) {
        //if its clear, then just clear the expression
        if (buttonElement.innerText === "C") {
            buttonElement.addEventListener("click", () => {
                currentExpression = []
                expressionDiv.innerText = ""
            })
            continue
        }
        //if its an equal sign, do the expression
        if (buttonElement.innerText === "=") {
            buttonElement.addEventListener("click", () => {
                expressionDiv.innerText = parseExpression(currentExpression)
                currentExpression = []
            })
            continue
        }

        //otherwise treat it as a normal expression
        buttonElement.addEventListener("click", () => {
            //if two numbers in a row, add them as a string
            const buttonVal = buttonElement.innerText
            const last = currentExpression[currentExpression.length - 1]
            const lastIsNumber = (last !== undefined && !isOperator(last))

            if (!isOperator(buttonVal) && lastIsNumber) {
                currentExpression[currentExpression.length - 1] += buttonVal
            } else {
                currentExpression.push(buttonVal)
            }
            expressionDiv.innerText = currentExpression.join("")
            })
    }
}

function doOperation(num1, num2, operation) {
    num1 = Number(num1), num2 = Number(num2)
    switch (operation) {
        case "+": return num1+num2
        case "-": return num1-num2;
        case "x": return num1*num2;
        case "/": return num1/num2;
    }
}

function parseExpression(expression) {
    //do the calculations
    let result = Number(expression[0])

    for (let i = 1; i < expression.length; i+=2) {
        //operation is always gonna be first
        let operation = expression[i]

        //nums is always gonna be after that
        let num2 = expression[i+1]
        result = doOperation(result, num2, operation)
    
    }
    if (isNaN(result) || result === undefined) return "Invalid Expression   "
    return result
}


let buttonsArray = buildButtonsArray(buttons)


renderButtons(buttonsArray, buttonsDiv)
addListeners(buttonsArray)


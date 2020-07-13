function add(x, y) {
  return x + y;
}

function subtract(x, y) {
  return x - y;
}

function multiply(x, y) {
  return x * y;
}

function divide(x, y) {
  return y !== 0 ? x / y : "ERROR";
}

function operate(x, operator, y) {
  switch (operator) {
    case "+":
      return add(x, y);
    case "-":
      return subtract(x, y);
    case "*":
      return multiply(x, y);
    case "/":
      return divide(x, y);
  }
}

function populateDisplay(button) {
  if (display.textContent.includes(".") && button.value === ".") return;
  if (result) {
    display.textContent = "";
    result = false;
  }

  display.textContent += button.value;
  displayValue = display.textContent;
}

function operateFunction(button) {
  // button.disabled = true;
  if (display.textContent !== "") {
    displayValue = display.textContent;
    values.push(displayValue);
  }
  display.textContent = "";
  if (isOperator(values.slice(-1)[0])) values.pop();
  if (values.length === 3) {
    display.textContent = operate(+values[0], values[1], +values[2]);
    displayValue = display.textContent;
    values = [];
    values.push(displayValue);
    result = true;
  }
  if (!isNaN(values[0])) values.push(button.value);
}

function equalsFunction(button) {
  values.push(displayValue);
  display.textContent = "";
  if (values.length === 3)
    display.textContent = operate(+values[0], values[1], +values[2]);
  values = [];
  result = true;
}

function bsFunction() {
  display.textContent = display.textContent.slice(0, -1);
  displayValue = display.textContent;
}

function isOperator(value) {
  return ["+", "-", "/", "*"].includes(value);
}

function removeTransition(e) {
  if (e.propertyName !== "transform") return;
  e.target.classList.remove("active");
}

const display = document.querySelector(".screen");
const numberBtns = document.querySelectorAll(".number");
const operatorBtns = document.querySelectorAll(".operator");
const allBtns = document.querySelectorAll("button");
const clearBtn = document.querySelector("#clear");
const equalsBtn = document.querySelector("#equals"); const bsBtn = document.querySelector("#backspace");
let displayValue;
let values = [];
let result = false;

window.addEventListener("keydown", (event) => {
  button = document.querySelector(`button[data-key='${event.keyCode}']`);
  switch (true) {
    case button.classList.contains("number"):
      button.classList.add("active");
      populateDisplay(button);
      break;
    case button.classList.contains("operator"):
      button.classList.add("active");
      operateFunction(button);
      break;
    case button.id === "equals":
      button.classList.add("active");
      equalsFunction(button);
      break;
    case button.id === "backspace":
      button.classList.add("active");
      bsFunction();
      break;
  }
});

allBtns.forEach((btn) =>
  btn.addEventListener("transitionend", removeTransition)
);

numberBtns.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.add("active");
    populateDisplay(button);
  });
});

operatorBtns.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.add("active");
    operateFunction(button);
  });
});

equalsBtn.addEventListener("click", () => {
  equalsBtn.classList.add("active");
  equalsFunction();
});

bsBtn.addEventListener("click", () => {
  bsBtn.classList.add("active");
  bsFunction();
});

clearBtn.addEventListener("click", () => {
  clearBtn.classList.add("active");
  display.textContent = "";
  values = [];
});

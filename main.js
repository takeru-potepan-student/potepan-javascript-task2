let currentValue = "";

function updateDisplay() {
    $(".calculator_display").val(currentValue);
}

$("button.calculator_key").on("click", function () {
    const lastChar = currentValue.slice(-1);
    const isOperator = lastChar === "+" || lastChar === "-" || lastChar === "*" || lastChar === "/";
    if ($(this).hasClass("calculator_key_clear")) {
        currentValue = "";
    }
    else if ($(this).hasClass("calculator_key_operator")) {
        const operator = $(this).text();
        if (currentValue !== "") {
            if (isOperator) {
                currentValue = currentValue.slice(0, -1) + operator;
            }
            else {
                currentValue += operator;
            }
        }
    }
    else if ($(this).hasClass("calculator_key_enter")) {
        if (isOperator) {
            currentValue = currentValue.slice(0, -1);
        }
        try {
            const result = eval(currentValue);
            const rounded = result.toPrecision(15);
            const finalResult = Number(rounded);
            currentValue = finalResult.toString();
        } catch (error) {
            currentValue = "";
        }
    }
    else {
        let value = $(this).text();
        const chunk = currentValue.split(/[\+\-\*\/]/).at(-1);
        if (value === "0" || value === "00") {
            if (chunk === "0") {
                return;
            }
            else if (chunk === "") {
                currentValue += "0";
            }
            else {
                currentValue += value;
            }
        }
        else if (value === ".") {
            if (chunk === "") {
                currentValue += "0.";
            }
            else if (!chunk.includes(".")) {
                currentValue += ".";
            }
        }
        else {
            if (chunk === "0") {
                currentValue = currentValue.replace(/0$/, "");
            }
            currentValue += value;
        }
    }
    updateDisplay();
});


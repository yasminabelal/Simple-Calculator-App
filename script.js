let shouldClearDisplay = false;

function appendToDisplay(value) {
    const display = document.getElementById('result');
    
   
    if (shouldClearDisplay) {
        if (!isOperator(value)) {
            display.value = '';
        }
        shouldClearDisplay = false;
    }
    
    
    const lastChar = display.value.slice(-1);
    if (isOperator(lastChar) && isOperator(value)) {
        display.value = display.value.slice(0, -1) + value;
        return;
    }
    
    display.value += value;
}

function isOperator(char) {
    return ['+', '-', '×', '/', '*'].includes(char);
}

function clearDisplay() {
    document.getElementById('result').value = '';
    shouldClearDisplay = false;
}

function backspace() {
    const display = document.getElementById('result');
    display.value = display.value.slice(0, -1);
    shouldClearDisplay = false;
}

function calculate() {
    try {
        let expression = document.getElementById('result').value;
        
      
        expression = expression.replace(/×/g, '*');
        
        
        if (expression.includes('/0') && !expression.includes('/0.')) {
            throw new Error("Division by zero!");
        }
        
        const result = eval(expression);
        document.getElementById('result').value = result;
        shouldClearDisplay = true;
    } catch (error) {
        document.getElementById('result').value = 'Error';
        setTimeout(clearDisplay, 1000);
    }
}


document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (/[0-9+\-*/.=]/.test(key)) {
        event.preventDefault();
        if (key === '=' || key === 'Enter') {
            calculate();
        } else if (key === '*') {
            appendToDisplay('×');
        } else {
            appendToDisplay(key);
        }
    } else if (key === 'Backspace') {
        backspace();
    } else if (key === 'Escape') {
        clearDisplay();
    }
});
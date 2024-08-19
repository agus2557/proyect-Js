let calculationHistory = [];
let conversionHistory = [];

function calculate(operation) {
    const num1 = parseFloat(document.getElementById("num1").value);
    const num2 = parseFloat(document.getElementById("num2").value);
    let result;
    
    if (isNaN(num1) || isNaN(num2)) {
        result = "Por favor, ingrese números válidos.";
    } else {
        if (operation === 'sum') {
            result = num1 + num2;
        } else if (operation === 'subtract') {
            result = num1 - num2;
        } else if (operation === 'multiply') {
            result = num1 * num2;
        } else if (operation === 'divide') {
            if (num2 !== 0) {
                result = num1 / num2;
            } else {
                result = "Error: División por cero no permitida.";
            }
        }
        calculationHistory.push(`Operación: ${operation}, Resultado: ${result}`);
    }
    
    document.getElementById("calc-result").textContent = `Resultado: ${result}`;
    updateCalculationHistory();
}

function convertToKilometers() {
    const distance = parseFloat(document.getElementById("distance").value);
    const unit = document.getElementById("unit").value;
    let result;
    
    if (isNaN(distance)) {
        result = "Por favor, ingrese un número válido.";
    } else {
        if (unit === 'miles') {
            result = distance * 1.60934; // 1 milla = 1.60934 km
        } else if (unit === 'meters') {
            result = distance / 1000; // 1000 metros = 1 km
        } else if (unit === 'feet') {
            result = distance * 0.0003048; // 1 pie = 0.0003048 km
        }
        
        result = `Resultado: ${result.toFixed(4)} km`;
        conversionHistory.push(`Conversión: ${distance} ${unit}, Resultado: ${result}`);
    }
    
    document.getElementById("conv-result").textContent = result;
    updateConversionHistory();
}

function saludar() {
    let nombre = prompt("¿Cuál es tu nombre?");
    if (nombre) {
        alert("Hola, " + nombre + "! Encantado de conocerte.");
    } else {
        alert("Hola! Encantado de conocerte.");
    }
}

function updateCalculationHistory() {
    const historyElement = document.getElementById("calc-history");
    historyElement.innerHTML = calculationHistory.map(item => `<li>${item}</li>`).join('');
}

function updateConversionHistory() {
    const historyElement = document.getElementById("conv-history");
    historyElement.innerHTML = conversionHistory.map(item => `<li>${item}</li>`).join('');
}

saludar();

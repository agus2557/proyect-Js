document.addEventListener('DOMContentLoaded', () => {
    // Recuperar el nombre del usuario desde LocalStorage usando OR para asignar valor por defecto
    const savedName = localStorage.getItem('userName') || '';

    // Operador ternario para decidir si saludar o pedir el nombre
    savedName ? greetUser(savedName) : saludar();

    // Recuperar el historial desde LocalStorage usando OR para evitar condicionales
    let calculationHistory = JSON.parse(localStorage.getItem('calculationHistory')) || [];
    let conversionHistory = JSON.parse(localStorage.getItem('conversionHistory')) || [];

    // Actualizar las listas de historial en el DOM
    updateCalculationHistory();
    updateConversionHistory();

    const buttons = [
        { id: "sumBtn", operation: 'sum' },
        { id: "subtractBtn", operation: 'subtract' },
        { id: "multiplyBtn", operation: 'multiply' },
        { id: "divideBtn", operation: 'divide' },
    ];

    buttons.forEach(({ id, operation }) => {
        document.getElementById(id).addEventListener("click", () => calculate(operation));
    });

    document.getElementById("convertBtn").addEventListener("click", convertToKilometers);
    document.getElementById("submitName").addEventListener("click", submitName);
    document.getElementById("closeGreet").addEventListener("click", closeGreetModal);

    function calculate(operation) {
        // Desestructuración para obtener los valores directamente
        const num1 = parseFloat(document.getElementById("num1").value);
        const num2 = parseFloat(document.getElementById("num2").value);

        // Uso de operador ternario para manejar errores y cálculos
        const result = isNaN(num1) || isNaN(num2)
            ? "Por favor, ingrese números válidos."
            : operation === 'sum' ? num1 + num2
            : operation === 'subtract' ? num1 - num2
            : operation === 'multiply' ? num1 * num2
            : num2 !== 0 ? num1 / num2 : "Error: División por cero no permitida.";

        // Uso de spread y desestructuración para actualizar historial
        calculationHistory = [...calculationHistory, `Operación: ${operation}, Resultado: ${result}`];
        localStorage.setItem('calculationHistory', JSON.stringify(calculationHistory));

        document.getElementById("calc-result").textContent = `Resultado: ${result}`;
        updateCalculationHistory();
    }

    function convertToKilometers() {
        const distance = parseFloat(document.getElementById("distance").value);
        const unit = document.getElementById("unit").value;

        // Uso de operador ternario para simplificar el switch
        const factor = unit === 'miles' ? 1.60934
            : unit === 'meters' ? 0.001
            : unit === 'feet' ? 0.0003048
            : 0;

        const result = isNaN(distance)
            ? "Por favor, ingrese un número válido."
            : `Resultado: ${(distance * factor).toFixed(4)} km`;

        conversionHistory = [...conversionHistory, `Conversión: ${distance} ${unit}, Resultado: ${result}`];
        localStorage.setItem('conversionHistory', JSON.stringify(conversionHistory));

        document.getElementById("conv-result").textContent = result;
        updateConversionHistory();
    }

    function updateCalculationHistory() {
        const historyElement = document.getElementById("calc-history");
        historyElement.innerHTML = '';
        const historyItems = calculationHistory.map(item => {
            const listItem = document.createElement('li');
            listItem.textContent = item;
            return listItem;
        });
        historyElement.append(...historyItems);
    }

    function updateConversionHistory() {
        const historyElement = document.getElementById("conv-history");
        historyElement.innerHTML = '';
        const historyItems = conversionHistory.map(item => {
            const listItem = document.createElement('li');
            listItem.textContent = item;
            return listItem;
        });
        historyElement.append(...historyItems);
    }

    // Funciones para modales
    function saludar() {
        document.getElementById("nameModal").style.display = "block";
    }

    function submitName() {
        const nombre = document.getElementById("nameInput").value.trim();
        if (nombre) {
            localStorage.setItem('userName', nombre);
            greetUser(nombre);
        }
        closeNameModal();
    }

    function greetUser(name) {
        document.getElementById("greetMessage").textContent = `Hola, ${name}! Encantado de conocerte.`;
        document.getElementById("greetModal").style.display = "block";
    }

    function closeNameModal() {
        document.getElementById("nameModal").style.display = "none";
    }

    function closeGreetModal() {
        document.getElementById("greetModal").style.display = "none";
    }
});

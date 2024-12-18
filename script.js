document.addEventListener("DOMContentLoaded", () => {
    const conversionType = document.getElementById("conversionType");
    const fromUnit = document.getElementById("fromUnit");
    const toUnit = document.getElementById("toUnit");
    const convertBtn = document.getElementById("convertBtn");
    const inputValue = document.getElementById("inputValue");
    const convertedValue = document.getElementById("convertedValue");

    // Units data for conversion
    const units = {
        length: ["meters", "kilometers", "feet", "miles"],
        weight: ["grams", "kilograms", "pounds", "ounces"],
        temperature: ["Celsius", "Fahrenheit", "Kelvin"]
    };

    const conversionFormulas = {
        length: {
            meters: { kilometers: 0.001, feet: 3.281, miles: 0.000621 },
            kilometers: { meters: 1000, feet: 3281, miles: 0.621 },
            feet: { meters: 0.3048, kilometers: 0.0003048, miles: 0.000189 },
            miles: { meters: 1609, kilometers: 1.609, feet: 5280 }
        },
        weight: {
            grams: { kilograms: 0.001, pounds: 0.002205, ounces: 0.0353 },
            kilograms: { grams: 1000, pounds: 2.205, ounces: 35.274 },
            pounds: { grams: 453.592, kilograms: 0.453592, ounces: 16 },
            ounces: { grams: 28.3495, kilograms: 0.0283495, pounds: 0.0625 }
        },
        temperature: {
            Celsius: { Fahrenheit: (v) => (v * 9) / 5 + 32, Kelvin: (v) => v + 273.15 },
            Fahrenheit: { Celsius: (v) => (v - 32) * 5 / 9, Kelvin: (v) => ((v - 32) * 5) / 9 + 273.15 },
            Kelvin: { Celsius: (v) => v - 273.15, Fahrenheit: (v) => ((v - 273.15) * 9) / 5 + 32 }
        }
    };

    // Populate dropdowns based on conversion type
    const updateUnits = () => {
        const type = conversionType.value;
        fromUnit.innerHTML = "";
        toUnit.innerHTML = "";
        units[type].forEach(unit => {
            fromUnit.innerHTML += `<option value="${unit}">${unit}</option>`;
            toUnit.innerHTML += `<option value="${unit}">${unit}</option>`;
        });
    };

    // Perform the conversion
    const convert = () => {
        const type = conversionType.value;
        const from = fromUnit.value;
        const to = toUnit.value;
        const value = parseFloat(inputValue.value);

        if (isNaN(value)) {
            convertedValue.textContent = "Enter a valid number!";
            return;
        }

        if (type === "temperature" && typeof conversionFormulas[type][from][to] === "function") {
            convertedValue.textContent = conversionFormulas[type][from][to](value).toFixed(2);
        } else {
            convertedValue.textContent = (value * conversionFormulas[type][from][to]).toFixed(2);
        }
    };

    // Event Listeners
    conversionType.addEventListener("change", updateUnits);
    convertBtn.addEventListener("click", convert);

    // Initialize the dropdowns
    updateUnits();

    const clearFields = () => {
        inputValue.value = "";
        convertedValue.textContent = "";
        fromUnit.selectedIndex = 0;
        toUnit.selectedIndex = 0;
    };

    // Event Listeners
    conversionType.addEventListener("change", updateUnits);
    convertBtn.addEventListener("click", convert);
    clearBtn.addEventListener("click", clearFields);

    // Initialize the dropdowns
    updateUnits();













});

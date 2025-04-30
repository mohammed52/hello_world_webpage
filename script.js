document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const numberInput = document.getElementById('numberInput');
    const addNumberBtn = document.getElementById('addNumberBtn');
    const numbersList = document.getElementById('numbersList');
    const totalEntries = document.getElementById('totalEntries');
    const sumEntries = document.getElementById('sumEntries');
    const avgEntries = document.getElementById('avgEntries');
    const clearDatabaseBtn = document.getElementById('clearDatabaseBtn');
    const changeColorBtn = document.getElementById('changeColorBtn');
    const body = document.body;
    
    // Array of background colors
    const colors = ['#f0f0f0', '#ffcccb', '#c1e1c1', '#c9c9ff', '#ffffcc'];
    let currentColorIndex = 0;
    
    // Database functions
    function getNumbersFromDatabase() {
        const numbers = localStorage.getItem('numbersDatabase');
        return numbers ? JSON.parse(numbers) : [];
    }
    
    function saveNumberToDatabase(number) {
        const numbers = getNumbersFromDatabase();
        numbers.push(parseFloat(number));
        localStorage.setItem('numbersDatabase', JSON.stringify(numbers));
        return numbers;
    }
    
    function clearDatabase() {
        localStorage.removeItem('numbersDatabase');
        updateDisplay();
    }
    
    function updateDisplay() {
        const numbers = getNumbersFromDatabase();
        
        // Clear the current list
        numbersList.innerHTML = '';
        
        // Add each number to the list
        numbers.forEach((number, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = `Entry ${index + 1}: ${number}`;
            numbersList.appendChild(listItem);
        });
        
        // Update statistics
        totalEntries.textContent = numbers.length;
        
        const sum = numbers.reduce((total, num) => total + num, 0);
        sumEntries.textContent = sum.toFixed(2);
        
        const avg = numbers.length > 0 ? sum / numbers.length : 0;
        avgEntries.textContent = avg.toFixed(2);
    }
    
    // Event listeners
    addNumberBtn.addEventListener('click', function() {
        const value = numberInput.value.trim();
        
        if (value && !isNaN(value)) {
            saveNumberToDatabase(value);
            numberInput.value = ''; // Clear input field
            updateDisplay();
        } else {
            alert('Please enter a valid number!');
        }
    });
    
    // Add number when pressing Enter
    numberInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addNumberBtn.click();
        }
    });
    
    clearDatabaseBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to clear all stored numbers?')) {
            clearDatabase();
        }
    });
    
    changeColorBtn.addEventListener('click', function() {
        // Move to the next color in the array
        currentColorIndex = (currentColorIndex + 1) % colors.length;
        body.style.backgroundColor = colors[currentColorIndex];
    });
    
    // Initial display update
    updateDisplay();
});
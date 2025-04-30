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
    const container = document.querySelector('.container');
    
    // Funny emojis and phrases
    const funnyEmojis = ['😂', '🤣', '😜', '🤪', '🥳', '🦄', '👽', '🤡', '👻', '🐶', '🦖', '🍕'];
    const funnyPhrases = [
        'Woohoo! Math is fun!',
        'Numbers go brrrr!',
        'That\'s a fancy number!',
        'Math magic happening!',
        'Number-licious!',
        'Adding to your number collection!',
        'Look at you, counting things!',
        'Math wizardry at its finest!'
    ];
    
    // Add title animation
    const title = document.querySelector('h1');
    title.innerHTML = title.textContent.split('').map(letter => 
        `<span style="display:inline-block;">${letter}</span>`
    ).join('');
    
    // Array of background colors
    const colors = [
        'linear-gradient(270deg, #ff7eb9, #ff65a3, #7afcff, #feff9c)',
        'linear-gradient(270deg, #a1c4fd, #c2e9fb, #d4fc79)',
        'linear-gradient(270deg, #fddb92, #d1fdff, #ff9a9e)',
        'linear-gradient(270deg, #96e6a1, #d4fc79, #ffecd2)',
        'linear-gradient(270deg, #fff1eb, #ace0f9, #e2ebf0)'
    ];
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
    
    // Function to add a floating emoji
    function addFloatingEmoji() {
        const emoji = document.createElement('div');
        emoji.textContent = funnyEmojis[Math.floor(Math.random() * funnyEmojis.length)];
        emoji.style.position = 'fixed';
        emoji.style.left = Math.random() * 100 + 'vw';
        emoji.style.top = Math.random() * 100 + 'vh';
        emoji.style.fontSize = Math.random() * 30 + 20 + 'px';
        emoji.style.transform = 'rotate(' + (Math.random() * 40 - 20) + 'deg)';
        emoji.style.opacity = '0';
        emoji.style.transition = 'all 2s ease';
        emoji.style.zIndex = '1000';
        
        document.body.appendChild(emoji);
        
        setTimeout(() => {
            emoji.style.opacity = '0.8';
            emoji.style.transform = 'translateY(-100px) rotate(' + (Math.random() * 40 - 20) + 'deg)';
        }, 10);
        
        setTimeout(() => {
            emoji.remove();
        }, 2000);
    }
    
    // Function to show a funny message
    function showFunnyMessage() {
        const message = document.createElement('div');
        message.textContent = funnyPhrases[Math.floor(Math.random() * funnyPhrases.length)];
        message.style.position = 'fixed';
        message.style.left = '50%';
        message.style.top = '20%';
        message.style.transform = 'translate(-50%, -50%)';
        message.style.background = 'rgba(255, 255, 255, 0.9)';
        message.style.color = '#FF6B6B';
        message.style.padding = '10px 20px';
        message.style.borderRadius = '30px';
        message.style.fontWeight = 'bold';
        message.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        message.style.opacity = '0';
        message.style.transition = 'all 0.3s ease';
        message.style.zIndex = '1000';
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.style.opacity = '1';
            message.style.top = '15%';
        }, 10);
        
        setTimeout(() => {
            message.style.opacity = '0';
            message.style.top = '10%';
        }, 1500);
        
        setTimeout(() => {
            message.remove();
        }, 2000);
    }
    
    // Event listeners
    addNumberBtn.addEventListener('click', function() {
        const value = numberInput.value.trim();
        
        if (value && !isNaN(value)) {
            saveNumberToDatabase(value);
            numberInput.value = ''; // Clear input field
            updateDisplay();
            
            // Add fun effects
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    addFloatingEmoji();
                }, i * 200);
            }
            showFunnyMessage();
            
            // Add a little shake to the container
            container.style.animation = 'wiggle 0.5s';
            setTimeout(() => {
                container.style.animation = '';
            }, 500);
        } else {
            alert('That doesn\'t look like a number! 🤔 Try again!');
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
        body.style.background = colors[currentColorIndex];
        body.style.backgroundSize = '1000% 1000%';
        
        // Add spinning effect
        container.style.transition = 'transform 0.5s ease';
        container.style.transform = 'rotate(' + (Math.random() * 6 - 3) + 'deg)';
        
        // Add bouncing emojis
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                addFloatingEmoji();
            }, i * 100);
        }
        
        // Easter egg: after 5 color changes, do something extra fun
        if (++colorChangeCount % 5 === 0) {
            const elements = document.querySelectorAll('h1, h2, p, button');
            elements.forEach(el => {
                el.style.transition = 'transform 1s ease';
                el.style.transform = 'translateY(0)';
                setTimeout(() => {
                    el.style.transform = 'translateY(-20px)';
                }, 100);
                setTimeout(() => {
                    el.style.transform = 'translateY(0)';
                }, 300);
            });
        }
    });
    
    // Track color change count for easter eggs
    let colorChangeCount = 0;
    
    // Add funny styling to list items
    function updateListItemStyle(listItem, index) {
        const hue = (index * 30) % 360;
        listItem.style.borderBottom = '2px dashed hsl(' + hue + ', 70%, 70%)';
        listItem.style.padding = '10px';
        listItem.style.borderRadius = '5px';
        listItem.style.margin = '5px 0';
        listItem.style.transition = 'all 0.3s ease';
        listItem.style.transform = 'rotate(' + (Math.random() * 2 - 1) + 'deg)';
        
        // Add hover effect
        listItem.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(0deg)';
            this.style.backgroundColor = 'rgba(255,255,255,0.9)';
            this.style.boxShadow = '0 3px 10px rgba(0,0,0,0.1)';
        });
        
        listItem.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(' + (Math.random() * 2 - 1) + 'deg)';
            this.style.backgroundColor = 'transparent';
            this.style.boxShadow = 'none';
        });
    }
    
    // Update the updateDisplay function to use the new styling
    const originalUpdateDisplay = updateDisplay;
    updateDisplay = function() {
        originalUpdateDisplay();
        
        // Add styles to list items
        const listItems = numbersList.querySelectorAll('li');
        listItems.forEach(updateListItemStyle);
    };
    
    // Add a fun wobble to the title on page load
    setTimeout(() => {
        const titleSpans = document.querySelectorAll('h1 span');
        titleSpans.forEach((span, index) => {
            setTimeout(() => {
                span.style.display = 'inline-block';
                span.style.transition = 'transform 0.2s ease';
                span.style.transform = 'translateY(-20px)';
                setTimeout(() => {
                    span.style.transform = 'translateY(0)';
                }, 200);
            }, index * 100);
        });
    }, 500);
    
    // Initial display update
    updateDisplay();
    
    // Add some initial floating emojis
    setTimeout(() => {
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                addFloatingEmoji();
            }, i * 300);
        }
    }, 1000);
});
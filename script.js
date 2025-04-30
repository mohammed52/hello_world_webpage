document.addEventListener('DOMContentLoaded', function() {
    const changeColorBtn = document.getElementById('changeColorBtn');
    const body = document.body;
    
    // Array of background colors
    const colors = ['#f0f0f0', '#ffcccb', '#c1e1c1', '#c9c9ff', '#ffffcc'];
    let currentColorIndex = 0;
    
    changeColorBtn.addEventListener('click', function() {
        // Move to the next color in the array
        currentColorIndex = (currentColorIndex + 1) % colors.length;
        body.style.backgroundColor = colors[currentColorIndex];
    });
});
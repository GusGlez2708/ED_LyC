document.addEventListener('DOMContentLoaded', () => {

    
    const form = document.getElementById('numbers-form');
    const quantityInput = document.getElementById('quantity-input');
    const maxValueInput = document.getElementById('max-value-input');
    const resultsContainer = document.getElementById('results-container');
    const originalListDisplay = document.getElementById('original-list-display');
    const evenListDisplay = document.getElementById('even-list-display');
    const oddListDisplay = document.getElementById('odd-list-display');





    
    resultsContainer.style.display = 'none';
    const showError = (message) => {
        resultsContainer.style.display = 'none';
        let errorElement = document.getElementById('error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.id = 'error-message';
            errorElement.style.color = '#e74c3c';
            errorElement.style.marginTop = '1rem';
            errorElement.style.textAlign = 'center';
            form.after(errorElement);
        }
        errorElement.textContent = message;
    };





    const clearError = () => {
        const errorElement = document.getElementById('error-message');
        if (errorElement) {
            errorElement.remove();
        }
    };
    



    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const quantity = parseInt(quantityInput.value, 10);
        const maxValue = parseInt(maxValueInput.value, 10);

        if (isNaN(quantity) || isNaN(maxValue)) {
            showError('Ambos campos deben ser números válidos.');
            return;
        }
        if (quantity <= 0 || maxValue <= 0) {
            showError('Los valores deben ser números positivos mayores que cero.');
            return;
        }
        if (quantity > 1000) {
            showError('Para evitar problemas de rendimiento, la cantidad máxima es de 1000 números.');
            return;
        }
        clearError();
        



        const originalList = [];
        for (let i = 0; i < quantity; i++) {
            const randomNumber = Math.floor(Math.random() * maxValue) + 1;
            originalList.push(randomNumber);
        }

        const evenList = [];
        const oddList = [];
        for (const number of originalList) {
            if (number % 2 === 0) {
                
                evenList.push(number);
            } else {
               
                oddList.push(number);
            }
        }





        originalListDisplay.textContent = originalList.join(', ');
        evenListDisplay.textContent = evenList.length > 0 ? evenList.join(', ') : 'No se encontraron números pares.';
        oddListDisplay.textContent = oddList.length > 0 ? oddList.join(', ') : 'No se encontraron números impares.';
        resultsContainer.style.display = 'block'; 
        resultsContainer.style.textAlign = 'center'; 
    });


    const handleInput = () => {
        clearError();
        resultsContainer.style.display = 'none';
    };

    
    quantityInput.addEventListener('input', handleInput);
    maxValueInput.addEventListener('input', handleInput);
});
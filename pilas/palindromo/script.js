document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('palindrome-form');
    const wordInput = document.getElementById('word-input');
    const resultContainer = document.getElementById('result-container');
    const resultDisplay = document.getElementById('result-display');


    const showError = (message) => {
        resultContainer.style.display = 'none';
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
        
        const rawInput = wordInput.value;

        const cleanedWord = rawInput.toLowerCase().replace(/[^a-zA-ZñÑáéíóúÁÉÍÓÚ]/g, '');

        if (rawInput.trim() === '') {
            showError('El campo no puede estar vacío.');
            return;
        }

       
        if (cleanedWord === '') {
            showError('La entrada debe contener al menos una letra.');
            return;
        }
        clearError();
        const stack = [];
        for (let i = 0; i < cleanedWord.length; i++) {
            stack.push(cleanedWord[i]);
        }

        let reversedWord = '';
        while (stack.length > 0) {
            reversedWord += stack.pop();
        }
        
        
        let resultMessage = '';
        if (cleanedWord === reversedWord) {
            resultMessage = `El texto "${rawInput}" SÍ es un palíndromo.`;
            resultDisplay.style.color = 'var(--accent2)';
            resultDisplay.style.boxShadow = '0 2px 7px rgba(87,236,181, 0.15)';
        } else {
            resultMessage = `El texto "${rawInput}" NO es un palíndromo.`;
            resultDisplay.style.color = '#e74c3c';
            resultDisplay.style.boxShadow = '0 2px 7px rgba(231,76,60, 0.15)';
        }

        resultDisplay.textContent = resultMessage;
        resultContainer.style.display = 'block';
    });
    wordInput.addEventListener('input', () => {
        clearError();
        resultContainer.style.display = 'none'; 
    });
});
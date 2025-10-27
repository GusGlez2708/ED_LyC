document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('inverter-form');
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
        
        const originalWord = wordInput.value.trim(); 
        if (originalWord === '') {
            showError('El campo no puede estar vacío.');
            return;
        }
        const wordPattern = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/;
        if (!wordPattern.test(originalWord)) {
            showError('Por favor, introduce solo letras, sin números ni caracteres especiales.');
            return;
        }
        clearError();
        const stack = [];

       
        for (let i = 0; i < originalWord.length; i++) {
            stack.push(originalWord[i]);
        }
        let reversedWord = '';
        while (stack.length > 0) {
            reversedWord += stack.pop();
        }
        resultDisplay.textContent = reversedWord;
        resultContainer.style.display = 'block';
    });
    wordInput.addEventListener('input', clearError);
});
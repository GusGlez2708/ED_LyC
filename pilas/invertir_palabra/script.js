document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('inverter-form');
    const wordInput = document.getElementById('word-input');
    const resultContainer = document.getElementById('result-container');
    const resultDisplay = document.getElementById('result-display');

   
    form.addEventListener('submit', (event) => {
        event.preventDefault(); 
        
        const originalWord = wordInput.value;
        if (!originalWord) return; 

    
        const stack = [];
        for (let i = 0; i < originalWord.length; i++) {
            stack.push(originalWord[i]);
        }

        let reversedWord = '';

        
        while (stack.length > 0) {
            reversedWord += stack.pop();
        }
        resultDisplay.textContent = reversedWord;
        resultContainer.style.display = 'block'; // Muestra el contenedor de resultados
    });

});
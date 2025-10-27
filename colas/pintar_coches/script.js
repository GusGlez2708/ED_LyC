document.addEventListener('DOMContentLoaded', () => {
// --- CONFIGURACIÓN DEL JUEGO ---
const CONFIG = {
    queueLimit: 5,
    initialCarInterval: 20000, 
    scoreToSpeedUp: 3,        
    speedUpFactor: 0.8,        
    minInterval: 2000,        
    colors: {
        'Rojo': '#e74c3c', 'Naranja': '#e67e22', 'Amarillo': '#f1c40f',
        'Verde': '#2ecc71', 'Azul': '#3498db', 'Morado': '#9b59b6', 'negro': '#000000ff', 'blanco': '#ffffff',
        'gris': '#7f8c8d', 'cian': '#00bcd4',
    }
};


    const elements = {
        startScreen: document.getElementById('start-screen'),
        gameBoard: document.getElementById('game-board'),
        startBtn: document.getElementById('start-btn'),
        restartBtn: document.getElementById('restart-btn'),
        scoreDisplay: document.getElementById('score-display'),
        timeDisplay: document.getElementById('time-display'),
        carQueueContainer: document.getElementById('car-queue-container'),
        colorPalette: document.getElementById('color-palette'),
        gameOverModal: document.getElementById('game-over-modal'),
        modalTitle: document.getElementById('modal-title'),
        finalScore: document.getElementById('final-score'),
    };




    let gameState = {
        carQueue: [], 
        score: 0,
        gameActive: false,
        startTime: 0,
        currentInterval: CONFIG.initialCarInterval,
        timers: { car: null, elapsed: null }
    };

   

    
    const enqueueCar = () => {
        if (!gameState.gameActive) return;

        if (gameState.carQueue.length >= CONFIG.queueLimit) {
            gameOver();
            return;
        }
        const colorNames = Object.keys(CONFIG.colors);
        const randomColor = colorNames[Math.floor(Math.random() * colorNames.length)];
        const newCar = { id: Date.now(), color: randomColor };
        gameState.carQueue.push(newCar); 
        renderCarQueue();
    };

   

    const dequeueCar = () => {
        if (gameState.carQueue.length === 0) return;
        gameState.carQueue.shift(); 
    };

   

    const startGame = () => {
        gameState = {
            ...gameState, 
            carQueue: [],
            score: 0,
            gameActive: true,
            startTime: Date.now(),
            currentInterval: CONFIG.initialCarInterval,
        };
        clearInterval(gameState.timers.car);
        clearInterval(gameState.timers.elapsed);
        elements.startScreen.style.display = 'none';
        elements.gameOverModal.style.display = 'none';
        elements.gameBoard.style.display = 'block';
        updateStatsUI();
        gameState.timers.car = setInterval(enqueueCar, gameState.currentInterval);
        gameState.timers.elapsed = setInterval(updateTimerUI, 1000);
        enqueueCar();
    };




    const gameOver = () => {
        gameState.gameActive = false;
        clearInterval(gameState.timers.car);
        clearInterval(gameState.timers.elapsed);

        const totalTime = Math.floor((Date.now() - gameState.startTime) / 1000);
        elements.modalTitle.textContent = "¡Juego Terminado!";
        elements.finalScore.innerHTML = `Pintaste <strong>${gameState.score}</strong> coches en <strong>${totalTime}</strong> segundos.`;
        elements.gameOverModal.style.display = 'flex';
    };


    
    const handleColorSelection = (selectedColor) => {
    if (!gameState.gameActive || gameState.carQueue.length === 0) return;
    const firstCar = gameState.carQueue[0];


    if (selectedColor === firstCar.color) {
        gameState.score++;
        dequeueCar(); 
        renderCarQueue();
        updateStatsUI();
        if (gameState.score > 0 && gameState.score % CONFIG.scoreToSpeedUp === 0) {
            speedUpGame();
        }
    } else {
        const firstCarElement = elements.carQueueContainer.firstChild;
        if (firstCarElement) {
            firstCarElement.style.animation = 'shake 0.5s';
            setTimeout(() => firstCarElement.style.animation = '', 500);
        }
    }
};



  const speedUpGame = () => {
    const newInterval = gameState.currentInterval * CONFIG.speedUpFactor;
    gameState.currentInterval = Math.max(newInterval, CONFIG.minInterval);
    clearInterval(gameState.timers.car);
    gameState.timers.car = setInterval(enqueueCar, gameState.currentInterval);
    console.log(`¡Dificultad aumentada! Nuevo intervalo: ${gameState.currentInterval / 1000}s`);
};
 


    const renderCarQueue = () => {
        elements.carQueueContainer.innerHTML = '';
        gameState.carQueue.forEach(car => {
            const carColorHex = CONFIG.colors[car.color];
            const carElement = document.createElement('div');
            carElement.className = 'car';
            carElement.innerHTML = `
                <svg class="car-svg" viewBox="0 0 512 512" fill="${carColorHex}">
                    <path d="M116.5 239.3l-25.8 25.8c-4.7 4.7-12.3 4.7-17 0l-28.3-28.3c-4.7-4.7-4.7-12.3 0-17l25.8-25.8c4.7-4.7 12.3-4.7 17 0l28.3 28.3c4.7 4.7 4.7 12.3 0 17zM420.5 239.3l-25.8 25.8c-4.7 4.7-12.3 4.7-17 0l-28.3-28.3c-4.7-4.7-4.7-12.3 0-17l25.8-25.8c4.7-4.7 12.3-4.7 17 0l28.3 28.3c4.7 4.7 4.7 12.3 0 17zM512 208c0-29.3-17.3-55.1-42.6-67.1l-62.8-29.8c-11.4-5.4-24-8.1-36.6-8.1H144c-12.9 0-25.5 2.8-37 8.3l-63.4 30C17.3 152.9 0 178.7 0 208v96c0 17.7 14.3 32 32 32h16.2c6.1 41.2 40.5 73 81.8 73s75.7-31.8 81.8-73h64.4c6.1 41.2 40.5 73 81.8 73s75.7-31.8 81.8-73H480c17.7 0 32-14.3 32-32v-96zM130 337c-17.1 0-31-13.9-31-31s13.9-31 31-31 31 13.9 31 31-13.9 31-31 31zm252 0c-17.1 0-31-13.9-31-31s13.9-31 31-31 31 13.9 31 31-13.9 31-31 31z"/>
                </svg>
                <div class="car-label" style="color: ${carColorHex}; border: 1px solid ${carColorHex};">${car.color}</div>
            `;
            elements.carQueueContainer.appendChild(carElement);
        });
    };

    const updateStatsUI = () => {
        elements.scoreDisplay.textContent = gameState.score;
    };
    
    const updateTimerUI = () => {
        const elapsedSeconds = Math.floor((Date.now() - gameState.startTime) / 1000);
        elements.timeDisplay.textContent = `${elapsedSeconds}s`;
    };

    const createColorPalette = () => {
        elements.colorPalette.innerHTML = '';
        for (const colorName in CONFIG.colors) {
            const colorHex = CONFIG.colors[colorName];
            const btn = document.createElement('button');
            btn.className = 'color-btn';
            btn.style.setProperty('--specific-color', colorHex); 
            btn.addEventListener('click', () => handleColorSelection(colorName));
            elements.colorPalette.appendChild(btn);
        }
    };
    
    elements.startBtn.addEventListener('click', startGame);
    elements.restartBtn.addEventListener('click', startGame);
    createColorPalette(); 
});
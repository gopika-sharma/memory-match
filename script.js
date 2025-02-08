document.addEventListener('DOMContentLoaded', () => {
const symbols = ['🦋','💓','🎀','💌', '💟','🎆', '🦩', '🌻', '🌊', '🍄', '🦢'];
    let flippedCards = [];
    let moves = 0;
    let canFlip = true;

    function initializeGame() {
        const gameContainer = document.getElementById('game');
        if (!gameContainer) {
            console.error('Game container not found!');
            return;
        }
        gameContainer.innerHTML = '';

        const gameCards = symbols.concat(symbols).sort(() => Math.random() - 0.5);
        
        gameCards.forEach((symbol) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = '<span>?</span>';
            card.dataset.symbol = symbol;
            card.addEventListener('click', () => flipCard(card));
            gameContainer.appendChild(card);
        });
        moves = 0;
        updateMovesDisplay();
    }

    function flipCard(card) {
        if (!canFlip) return;
        if (flippedCards.length >= 2) return;
        if (card.classList.contains('flipped')) return;

        card.innerHTML = `<span>${card.dataset.symbol}</span>`;
        card.classList.add('flipped');
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            canFlip = false;
            moves++;
            updateMovesDisplay();
            setTimeout(checkMatch, 1000);
        }
    }

    function checkMatch() {
        const [card1, card2] = flippedCards;
        const match = card1.dataset.symbol === card2.dataset.symbol;

        if (match) {
            card1.style.pointerEvents = 'none';
            card2.style.pointerEvents = 'none';
        } else {
            card1.innerHTML = '<span>?</span>';
            card2.innerHTML = '<span>?</span>';
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }

        flippedCards = [];
        canFlip = true;
    
        checkGameComplete();
    }

    function checkGameComplete() {
        const allCards = document.querySelectorAll('.card');
        const allMatched = Array.from(allCards).every(card => 
            card.classList.contains('flipped'));
        
        if (allMatched) {
            setTimeout(() => {
                alert(`Congratulations! You completed the game in ${moves} moves!`);
            }, 500);
        }
    }

    function updateMovesDisplay() {
        const movesDisplay = document.getElementById('moves');
        if (movesDisplay) {
            movesDisplay.textContent = moves;
        }
    }

    function resetGame() {
        initializeGame();
    }

    const resetButton = document.querySelector('button');
    if (resetButton) {
        resetButton.addEventListener('click', resetGame);
    }

    initializeGame();
});
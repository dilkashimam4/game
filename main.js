window.onload = function() {
    const scoreDisplay = document.querySelector('.score');
    const startScreen = document.querySelector('.start-screen');
    const gameArea = document.querySelector('.gameArea');

    let keys = {
        ArrowUp: false,
        ArrowDown: false,
        ArrowLeft: false,
        ArrowRight: false
    };
    let player = { speed: 5, score: 0, x: 0, y: 0, start: false };

    startScreen.addEventListener('click', start);
    document.addEventListener('keydown', keyDown);
    document.addEventListener('keyup', keyUp);

    function keyDown(e) {
        e.preventDefault();
        keys[e.key] = true;
    }

    function keyUp(e) {
        e.preventDefault();
        keys[e.key] = false;
    }

    function isCollide(car, item) {
        if (!car || !item) return false;
        let aRect = car.getBoundingClientRect();
        let bRect = item.getBoundingClientRect();

        return !((aRect.bottom < bRect.top) ||
            (aRect.top > bRect.bottom) ||
            (aRect.right < bRect.left) ||
            (aRect.left > bRect.right));
    }

    function moveLines() {
        let lines = document.querySelectorAll('.line');
        lines.forEach(function (item) {
            if (item.y >= 700) {
                item.y -= 750;
            }
            item.y += player.speed;
            item.style.top = item.y + 'px';
        });
    }

    function moveEnemies(car) {
        let enemyCars = document.querySelectorAll('.enemycar');
        enemyCars.forEach(function (item) {
            item.y += player.speed;

            if (isCollide(car, item)) {
                gameOver();
                item.style.background = "red";  // Collision feedback
                return;  // Stop loop on collision
            }

            if (item.y >= 750) {
                item.y = -200;
                item.style.left = Math.floor(Math.random() * 350) + 'px';
            }

            item.style.top = item.y + 'px';
        });
    }
    function gameOver() {
        // Stop the game
        player.start = false;
    
        // Game Over Message
        let gameOverMessage = document.createElement('div');
        gameOverMessage.textContent = "Game Over!";
        gameOverMessage.classList.add('game-over-message');
        gameOverMessage.style.position = "absolute";
        gameOverMessage.style.top = "50%";
        gameOverMessage.style.left = "50%";
        gameOverMessage.style.transform = "translate(-50%, -50%)";
        gameOverMessage.style.fontSize = "36px";
        gameOverMessage.style.color = "red";
        document.body.appendChild(gameOverMessage);
    
        // Score Message
        let scoreMessage = document.createElement('div');
        scoreMessage.textContent = "Score: " + player.score;
        scoreMessage.classList.add('score-message');
        scoreMessage.style.position = "absolute";
        scoreMessage.style.top = "45%";
        scoreMessage.style.left = "50%";
        scoreMessage.style.transform = "translate(-50%, -50%)";
        scoreMessage.style.fontSize = "24px";
        scoreMessage.style.color = "white";
        document.body.appendChild(scoreMessage);
    
        // Restart Button
        let restartButton = document.createElement('button');
        restartButton.textContent = "Restart Game";
        restartButton.classList.add('restart-button');
        restartButton.style.position = "absolute";
        restartButton.style.top = "60%";
        restartButton.style.left = "50%";
        restartButton.style.transform = "translate(-50%, -50%)";
        restartButton.style.padding = "10px";
        restartButton.style.fontSize = "18px";
        restartButton.addEventListener('click', restartGame);
        document.body.appendChild(restartButton);
    }
    

    function restartGame() {
        // Remove all game over elements
        document.querySelector('.game-over-message')?.remove();
        document.querySelector('.score-message')?.remove();
        document.querySelector('.restart-button')?.remove();
    
        // Reset the game state and start over
        player.start = true;
        gameArea.innerHTML = '';  // Clear the game area
        start();  // Restart the game
    }
    

    function gamePlay() {
        let car = document.querySelector('.car');
        let road = gameArea.getBoundingClientRect();

        if (player.start) {
            moveLines();
            moveEnemies(car);
            if (keys.ArrowUp && player.y > (road.top + 80)) { player.y -= player.speed; }
            if (keys.ArrowDown && player.y < (road.bottom - 70)) { player.y += player.speed; }
            if (keys.ArrowLeft && player.x > 0) { player.x -= player.speed; }
            if (keys.ArrowRight && player.x < (road.width - 50)) { player.x += player.speed; }

            car.style.top = player.y + "px";
            car.style.left = player.x + "px";

            player.score++;  // Increment score over time
            scoreDisplay.textContent = player.score;  // Update score display
            window.requestAnimationFrame(gamePlay);
        }
    }

    function start() {
        gameArea.classList.remove('hide');
        startScreen.classList.add('hide');

        player.start = true;
        window.requestAnimationFrame(gamePlay);

        let car = document.createElement('div');
        car.setAttribute('class', 'car');
        gameArea.appendChild(car);

        player.x = car.offsetLeft;
        player.y = car.offsetTop;

        for (let i = 0; i < 5; i++) {
            let line = document.createElement('div');
            line.setAttribute('class', 'line');
            line.y = (i * 150);
            line.style.top = line.y + 'px';
            gameArea.appendChild(line);
        }

        for (let i = 0; i < 5; i++) {
            let enemyCar = document.createElement('div');
            enemyCar.setAttribute('class', 'enemycar');
            enemyCar.y = (i + 1) * -350;
            enemyCar.style.top = enemyCar.y + "px";
            enemyCar.style.background = "blue";
            enemyCar.style.left = Math.floor(Math.random() * 350) + "px";
            gameArea.appendChild(enemyCar);
        }
    }
};

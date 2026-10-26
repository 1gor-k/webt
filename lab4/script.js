document.addEventListener("DOMContentLoaded", function () {
    const startScreen = document.getElementById("start-screen");
    const gameArea = document.getElementById("game-area");
    const difficultySelect = document.getElementById("difficulty");
    const colorSelect = document.getElementById("color");
    const startBtn = document.getElementById("start-btn");
    const scoreVal = document.getElementById("score-val");
    const timeVal = document.getElementById("time-val");
    const target = document.getElementById("target");

    const difficultySettings = {
        lazy:   { time: 2, size: 60, maxDistance: 220 },
        normal: { time: 1, size: 50, maxDistance: 450 },
        hard:   { time: 0.5, size: 40, maxDistance: Infinity }
    };

    let score = 0;
    let timeLeft = 0;
    let maxTime = 0;
    let boxSize = 50;
    let maxSpread = 0;
    let timerId = null;
    let isGameOver = false;

    let currentX = 0;
    let currentY = 0;

    startBtn.addEventListener("click", function () {
        const diff = difficultySelect.value;
        const color = colorSelect.value;

        if (!diff || !color) {
            return;
        }

        const config = difficultySettings[diff];
        maxTime = config.time;
        boxSize = config.size;
        maxSpread = config.maxDistance;

        score = 0;
        isGameOver = false;
        scoreVal.textContent = score;

        startScreen.style.display = "none";
        gameArea.style.display = "block";

        target.style.width = boxSize + "px";
        target.style.height = boxSize + "px";
        target.style.backgroundColor = color;

        currentX = Math.floor((window.innerWidth - boxSize) / 2);
        currentY = Math.floor((window.innerHeight - boxSize) / 2);
        target.style.left = currentX + "px";
        target.style.top = currentY + "px";

        resetTimer();
    });

    target.addEventListener("click", function () {
        if (isGameOver) {
            return;
        }

        score++;
        scoreVal.textContent = score;

        moveTarget();
        resetTimer();
    });

    function moveTarget() {
        const padding = 20;
        const hudSafeTop = 100;
        const maxX = Math.max(padding, window.innerWidth - boxSize - padding);
        const maxY = Math.max(hudSafeTop, window.innerHeight - boxSize - padding);

        let newX, newY;

        if (maxSpread === Infinity) {
            newX = Math.floor(Math.random() * (maxX - padding + 1)) + padding;
            newY = Math.floor(Math.random() * (maxY - hudSafeTop + 1)) + hudSafeTop;
        } else {
            const minX = Math.max(padding, currentX - maxSpread);
            const limX = Math.min(maxX, currentX + maxSpread);
            const minY = Math.max(hudSafeTop, currentY - maxSpread);
            const limY = Math.min(maxY, currentY + maxSpread);

            newX = Math.floor(Math.random() * (limX - minX + 1)) + minX;
            newY = Math.floor(Math.random() * (limY - minY + 1)) + minY;
        }

        currentX = newX;
        currentY = newY;
        target.style.left = currentX + "px";
        target.style.top = currentY + "px";
    }

    function resetTimer() {
        if (timerId !== null) {
            clearInterval(timerId);
        }

        timeLeft = maxTime;
        timeVal.textContent = timeLeft;

        timerId = setInterval(function () {
            timeLeft--;
            timeVal.textContent = timeLeft;

            if (timeLeft <= 0) {
                clearInterval(timerId);
                timerId = null;
                isGameOver = true;

                setTimeout(function () {
                    alert(
                        `Game over! Your score is ${score}, congratulations!\nPlease, reload the page to start a new game.`
                    );
                }, 10);
            }
        }, 1000);
    }
});

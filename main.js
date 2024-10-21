const score = document.querySelector('.score');
const startScreen = document.querySelector('.start-screen');
const gameArea = document.querySelector('.gameArea');


let keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false

}
let player = { speed: 5 };
startScreen.addEventListener('click', start);

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);


function keyDown(e) {
    e.preventDefault();
    keys[e.key] = true;
    console.log(e.key);
    console.log(keys);
}

function keyUp(e) {
    e.preventDefault();
    keys[e.key] = false;
    // console.log(e.key);  
    console.log(keys);
}
function isCallide(car, item) {
    // aReact = car.getBoundingClientRect();
    aReact = car.getBoundingClientRect();
    bReact = item.getBoundingClientRect();

    return !((aReact.bottom < bReact.top) ||
        (aReact.top > bReact.bottom) ||
        (aReact.right < bReact.left) || (aReact.left > bReact.right))
}

function moveLines() {
    let line = document.querySelectorAll('.line');

    line.forEach(function (item) {
        if (item.y >= 700) {
            item.y -= 750;
        }
        item.y += player.speed;
        item.style.top = item.y + 'px';

    })
}
function enemysCar(car) {
    let enemyCar = document.querySelectorAll('.enemycar');
    enemyCar.forEach(function (item) {
        item.y += player.speed;
        if (isCallide(car, item)) {
            console.log("hit hit");
        }
        if (item.y >= 750) {
            item.y = -200;
            item.style.left = Math.floor(Math.random() * 350) + 'px';
        }
        item.style.top = item.y + 'px';
    })
}

function gamePlay() {
    // console.log("hey i am clicked");
    let car = document.querySelector('.car');
    let road = gameArea.getBoundingClientRect();
    console.log(road);
    if (player.start) {
        moveLines();
        enemysCar();
        if (keys.ArrowUp && player.y > (road.top + 80)) { player.y -= player.speed }
        if (keys.ArrowDown && player.y < (road.bottom - 70)) { player.y += player.speed }
        if (keys.ArrowLeft && player.x > 0) { player.x -= player.speed }
        if (keys.ArrowRight && player.x < (road.width - 50)) { player.x += player.speed }

        car.style.top = player.y + "px";
        car.style.left = player.x + "px";




        window.requestAnimationFrame(gamePlay);
    }
}


function start() {
    gameArea.classList.remove('hide');
    startScreen.classList.add('hide');



    player.start = true;
    window.requestAnimationFrame(gamePlay);


    let car = document.createElement('div');
    for (let i = 0; i < 5; i++) {
        let line = document.createElement('div');
        line.setAttribute('class', 'line');
        line.y = (i * 150)
        line.style.top = line.y + 'px';
        gameArea.appendChild(line);
    }

    car.setAttribute('class', 'car');

    // car.innerText = "hey i am a car";
    gameArea.appendChild(car);

    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    for (let i = 0; i < 5; i++) {
        let enemyCar = document.createElement('div');
        enemyCar.setAttribute('class', 'enemycar');
        enemyCar.y = ((i + 1) * 350) * - 1;
        enemyCar.style.top = enemyCar.y + "px";
        enemyCar.style.background = "blue";
        enemyCar.style.marginTop = 10 + "px";
        enemyCar.style.left = Math.floor(Math.random() * 347) + "px";
        // enemyCar.style.marginLeft = Math.random(Math.floor)
        gameArea.appendChild(enemyCar);
    }

}
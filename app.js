var canvas = document.getElementById('canvas');
var elScore = document.getElementById('score');

var ctx = canvas.getContext('2d');

ctx.fillStyle = 'red';


var x = 0;
var y = 0;

var width = 10;
var heigth = 10;

var dis = 5;

var score = 0;


var intWidth = 5;
var intHeight = 5;

elScore.innerHTML = score;

var obstacles = [];

function play() {
    clearCanvas(ctx);
    updateScore();
    ctx.fillRect(x, y, width, heigth);
    generateObstacles();
}

function generateObstacles() {
    setInterval(function () {
        let x = Math.ceil(Math.random() * canvas.width);
        let y = Math.ceil(Math.random() * canvas.height);
        obstacles.push({ x, y });
        drawObstacles();
    }, 4000);
}

function drawObstacles() {
    ctx.fillStyle = 'blue';
    obstacles.forEach(obstacle => {
        ctx.clearRect(obstacle.x, obstacle.y, intWidth, intHeight);
        ctx.fillRect(obstacle.x, obstacle.y, intWidth, intHeight);
    });
}

function removeObstacle(obstacle) {
    console.log("Removiendo");
    obstacles = obstacles.filter(o => o.x != obstacle.x && o.y == obstacle.y);
}

window.addEventListener('keydown', function (e) {
    clearCanvas(x, y, width, heigth);
    updateCoords(e);
    if (x < canvas.clientLeft || x + width > canvas.width
        || y < canvas.clientTop || y + width > canvas.height) {
        alert("Perdiste");
    } else {
        move();
        updateScore();
    }
});

function clearCanvas(x, y, width, heigth) {
    ctx.clearRect(x, y, width, heigth);
}

function updateScore() {
    obstacles.forEach(obstacle => {
        if (obstacle.x >= x && obstacle.x + intWidth <= x + width) {
            if (obstacle.y >= y && obstacle.y + intHeight <= y + heigth) {
                score++;
                elScore.innerHTML = score;
                removeObstacle(obstacle);
            }
        } else {
            
        }
    });
}

function updateCoords(e) {
    switch (e.keyCode) {
        case 37:
            x -= dis;
            break;
        case 38:
            y -= dis;
            break;
        case 39:
            x += dis;
            break;
        case 40:
            y += dis;
            break;
        default:
            break;
    }
}

function move() {
    ctx.fillStyle = 'red';
    ctx.fillRect(x, y, width, heigth);
}


play();
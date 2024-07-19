const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const dinosaur = new Image();
dinosaur.src = 'dino.png'; // Cambia la ruta a tu sprite del dinosaurio

const cactus = new Image();
cactus.src = 'cactus.png'; // Cambia la ruta a tu sprite del cactus

const jumpSound = new Audio('sounds/jump.mp3'); // Agrega un archivo de sonido para el salto si lo deseas

let dinoX = 50;
let dinoY = 300;
let dinoWidth = 50;
let dinoHeight = 50;
let dinoVelocityY = 0;
let gravity = 0.8;
let jumpPower = -15;
let isJumping = false;

let cactusX = canvas.width;
let cactusY = 300;
let cactusWidth = 30;
let cactusHeight = 50;
let cactusSpeed = 5;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(dinosaur, dinoX, dinoY, dinoWidth, dinoHeight);
    ctx.drawImage(cactus, cactusX, cactusY, cactusWidth, cactusHeight);
    
    dinoVelocityY += gravity;
    dinoY += dinoVelocityY;

    if (dinoY > 300) {
        dinoY = 300;
        dinoVelocityY = 0;
        isJumping = false;
    }

    cactusX -= cactusSpeed;
    if (cactusX < -cactusWidth) {
        cactusX = canvas.width;
        cactusY = 300;
    }

    if (dinoX + dinoWidth > cactusX && dinoX < cactusX + cactusWidth &&
        dinoY + dinoHeight > cactusY) {
        alert('¡Has perdido!');
        resetGame();
    }

    requestAnimationFrame(draw);
}

function jump() {
    if (!isJumping) {
        dinoVelocityY = jumpPower;
        isJumping = true;
        jumpSound.play();
    }
}

function resetGame() {
    dinoY = 300;
    dinoVelocityY = 0;
    cactusX = canvas.width;
}

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        jump();
    }
});

dinosaur.onload = () => {
    cactus.onload = () => {
        draw();
    }
};

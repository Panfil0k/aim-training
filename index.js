const startBtn = document.querySelector('#start');
const restartBtn = document.querySelector('#restart');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeLimit = document.querySelector('#time');
const board = document.querySelector('#board');
const colors = [];

let time = 0;
let score = 0;

while (colors.length < 100) {
  colors.push(`rgb(${rand(0, 255)}, ${rand(0, 255)}, ${rand(0, 255)})`);
}
  
function rand(frm, to) {
  return ~~(Math.random() * (to - frm)) + frm;
}

function getRandomColor() {
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
}

startBtn.addEventListener('click', (e) => {
  e.preventDefault();
  screens[0].classList.add('up');
});

restartBtn.addEventListener('click', (e) => {
  e.preventDefault();
  location.reload();
});

timeList.addEventListener('click', (e) => {
  if (e.target.classList.contains('time-btn')) {
    time = parseInt(e.target.getAttribute('data-time'));
    startGame();
  }
});

board.addEventListener('click', (e) => {
  if (e.target.classList.contains('circle')) {
    score++;
    e.target.remove();
    createRandomCircle();
  }
});

function startGame() {
  screens[1].classList.add('up');
  setTime(time);
  setInterval(decreaseTime, 1000);
  createRandomCircle();
}

function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let currentTime = --time;
    setTime(currentTime);
  }
  
}

function setTime(value) {
  if (value < 10) {
    timeLimit.innerHTML = `00:0${value}`;
  } else {
    timeLimit.innerHTML = `00:${value}`;
  }  
}

function finishGame() {
  timeLimit.parentNode.classList.add('hide');
  board.innerHTML = `<h1>Счёт: <span class='primary'>${score}</span></h1>`;
}

function createRandomCircle() {
  const circle = document.createElement('div');
  const size = getRandomSize(10, 60);
  const {width, height} = board.getBoundingClientRect();
  const x = getRandomSize(0, width - size);
  const y = getRandomSize(0, height - size);

  circle.classList.add('circle');
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;

  board.append(circle);
}

function getRandomSize(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}


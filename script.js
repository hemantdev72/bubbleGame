const pbtm = document.getElementById('pbtm');

let clutter = "";
let hitNum = 0;
let score = 0;

function bubble() {
  clutter = "";
  for (i = 1; i <= 105; i++) {
    rn = Math.floor(Math.random() * 10);
    clutter += `<div class="bubble">${rn}</div>`;
  }
  pbtm.innerHTML = clutter;
}

let time = 60;

// Initialize highScore with a default value of 0 if there's nothing in local storage
let highScore = getData() || 0;
document.getElementById('high-score').textContent=highScore;

function runTimer() {
  let timer = setInterval(function () {
    if (time > 0) {
      time--;
      document.getElementById('time').textContent = time;
    } else {
      document.getElementById('pbtm').innerHTML = '<h1>Game Over</h1>';
      clearInterval(timer);
      if (score > highScore) {
        highScore = score;
        document.getElementById('high-score').textContent = highScore;
        saveData();
      }
    }
  }, 1000);
}

function saveData() {
  localStorage.setItem('highScore', highScore);
}

function getData() {
  return parseInt(localStorage.getItem('highScore'));
}

function hit() {
  hitNum = Math.floor(Math.random() * 10);
  document.getElementById('hit-num').textContent = hitNum;
}

function increaseScore() {
  score += 10;
  document.getElementById('score').textContent = score;
}

document.getElementById('pbtm').addEventListener('click', function (e) {
  let num = Number(e.target.textContent);
  console.log(num);
  if (num === hitNum) {
    increaseScore();
    hit();
    bubble(); // Call the bubble function after a correct click
  }
});

bubble();
runTimer();
hit();

const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body =document.querySelector(`body`)

let intervalId = 0;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onChangeColor() { 
  intervalId = setInterval(() => { body.style.backgroundColor = getRandomHexColor(); }, 1000);
  startBtn.disabled = true;
  
}

function onBtnStopPush() {
  clearInterval(intervalId);
  startBtn.disabled = false;
}
  

startBtn.addEventListener('click', onChangeColor);
stopBtn.addEventListener('click', onBtnStopPush)

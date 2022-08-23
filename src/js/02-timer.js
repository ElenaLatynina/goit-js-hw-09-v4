// Описан в документации
import flatpickr from "flatpickr";
import Notiflix from 'notiflix';

// Дополнительный импорт стилей
import "flatpickr/dist/flatpickr.min.css";


const startBtn = document.querySelector('button[data-start]');
const dateTime = document.querySelector('#datetime-picker');
const daysField = document.querySelector('.value[data-days]');
const hoursField = document.querySelector('.value[data-hours]');
const minutesField = document.querySelector('.value[data-minutes]');
const secondsField = document.querySelector('.value[data-seconds]');


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()){
      Notiflix.Notify.failure("Please choose a date in the future", { position: 'center-top' });
      
    }
    startBtn.disabled = false;
  },
};
 flatpickr(dateTime, options);

class Timer {
  constructor({ onTick }) {
    this.intervalId = null;
    this.isActive = false;
    this.onTick = onTick;

    //  this.init();
  }

  //   init() {
  //   const time = this.convertMs(0);
  //   this.onTick(time);
  // }
  start() {
    if (this.isActive) {
      return;
    }

    this.isActive = true;

    this.intervalId = setInterval(() => {
      const deadlineTime = Date.parse(dateTime.value);
      const currentTime = (new Date()).getTime();
      const deltaTime = deadlineTime - currentTime;
      const time = this.convertMs(deltaTime);
      this.onTick(time);
      if (deltaTime <= 1000){
      clearInterval(this.intervalId);
    };
    }, 1000);

  }

 
  convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = this.pad(Math.floor(ms / day));
  const hours = this.pad(Math.floor((ms % day) / hour));
  const minutes = this.pad(Math.floor(((ms % day) % hour) / minute));
  const seconds = this.pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

  pad(value) {
    return String(value).padStart(2, '0');
  }
}

const timer = new Timer({
  onTick: updateTime,
});

startBtn.addEventListener('click', timer.start.bind(timer));

function updateTime({ days, hours, minutes, seconds  }) {
    daysField.textContent = `${days}`;
    hoursField.textContent = `${hours}`;
    minutesField.textContent = `${minutes}`;
    secondsField.textContent = `${seconds}`;
};
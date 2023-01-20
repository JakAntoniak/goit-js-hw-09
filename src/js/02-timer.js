import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const input = document.querySelector('#datetime-picker');
const daysLeft = document.querySelector('[data-days]');
const hoursLeft = document.querySelector('[data-hours]');
const minutesLeft = document.querySelector('[data-minutes]');
const secondsLeft = document.querySelector('[data-seconds]');
const startButton = document.querySelector('button');
let timer = null;

startButton.setAttribute('disabled', '');
startButton.addEventListener('click', handleStart);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
// Add 0 to one-digit numbers and convert to string
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// When start button is pressed
function handleStart(e) {
  let timeEnd = new Date(input.value).getTime();

  //clear previous timer if any is running
  clearInterval(timer);

  timer = setInterval(() => {
    let timestart = Date.now();
    let timeLeft = convertMs(timeEnd - timestart);

    if (timeEnd - timestart <= 0) {
      //if countdown goes below 0 stop the timer
      clearInterval(timer);
      Notiflix.Notify.success('Timer Reached 0!');
    } else {
      //keep updating the timer
      daysLeft.textContent = addLeadingZero(timeLeft.days);
      hoursLeft.textContent = addLeadingZero(timeLeft.hours);
      minutesLeft.textContent = addLeadingZero(timeLeft.minutes);
      secondsLeft.textContent = addLeadingZero(timeLeft.seconds);
    }
  }, 1000);
}

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      if (selectedDates[0] > Date.now()) {
        console.log(selectedDates[0]);
        startButton.removeAttribute('disabled');
      } else {
        startButton.setAttribute('disabled', '');
        // Notiflix.Notify.failure('Please choose a date in the future');
      }
    },
  };
  
  flatpickr('#datetime-picker', options);
  
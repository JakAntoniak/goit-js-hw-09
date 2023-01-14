import _, { now } from 'lodash';

const form = document.querySelector('.feedback-form');
const email = document.querySelector('input');
const message = document.querySelector('textarea');

//1. Step - setting localstorage data with throttle delay

const STORAGE_KEY = 'feedback-form-state';

form.addEventListener(
  'input',
  _.throttle(() => {
    const formInputs = {
      email: form.elements.email.value,
      message: form.elements.message.value,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formInputs));
  }, 500)
);

// 2. Step - getting input values after site refreshing

const savedFormState = JSON.parse(localStorage.getItem(STORAGE_KEY));
if (savedFormState) {
  email.value = savedFormState.email;
  message.value = savedFormState.message;
}

// 3. Step - clearing inputs and localhost after clicking submit button

form.addEventListener('submit', e => {
  e.preventDefault();
  console.log(savedFormState);
  localStorage.clear();
  email.value = '';
  message.value = '';
});

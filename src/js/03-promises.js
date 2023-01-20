import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const submitBtn = document.querySelector('button');

submitBtn.addEventListener('click', e => {
  e.preventDefault();
  newPromises();
});

function newPromises() {
  const delayInput = form.elements.delay;
  const delayStep = form.elements.step;
  const amountInput = form.elements.amount;

  const delay = Number(delayInput.value);
  const step = Number(delayStep.value);
  const amount = Number(amountInput.value);

  if (delay < 0 || step < 0 || amount < 0) {
    Notiflix.Notify.failure(`Please select values greater than 0`);
  }

  function createPromise(position, delay) {
    const shouldResolve = Math.random() > 0.3;
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldResolve) {
          resolve({ position: position, delay: delay });
        } else {
          reject({ position: position, delay: delay });
        }
      }, delay);
    });
    return promise;
  }

  for (let i = 0; i < amount; i++) {
    createPromise(i + 1, delay + i * step)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
}

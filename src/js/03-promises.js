import Notiflix from 'notiflix';

const form = document.querySelector('form');
let delay = document.querySelector('input[name = "delay"]');
let step = document.querySelector('input[name = "step"]');
let amount = document.querySelector('input[name = "amount"]');

function createPromise(position, delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            
            const shouldResolve = Math.random() > 0.3;
            if (shouldResolve) {
                resolve({ position, delay });
            } else {
                reject({ position, delay });
            }
        }, delay);
    })
        .then(({ position, delay }) => { Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`); })
        .catch(({ position, delay }) => { Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`); });
    
}

function onFormSubmit(event) {
    event.preventDefault(); 
    delay = Number(event.currentTarget.delay.value);
    step = Number(event.currentTarget.step.value);
     amount = Number(event.currentTarget.amount.value);

    if (delay >= 0 && step >= 0 && amount > 0) {
        for (position = 1; position <= amount; position += 1) {
        delay += step;
        createPromise(position, delay);
       
    }}
  
}

form.addEventListener('submit', onFormSubmit);




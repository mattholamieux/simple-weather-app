console.log('client side js file is loaded');

const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const messageOne = document.querySelector('#message-one');
const messageTwo = document.querySelector('#message-two');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = searchElement.value;

    messageOne.textContent = 'loading';
    messageTwo.textContent = '';

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error){
                return messageOne.textContent = data.error;
            }
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
        })
    })
})
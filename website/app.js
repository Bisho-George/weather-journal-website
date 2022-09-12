/* Global Variables */
const API_KEY = 'f953b433bf8dd4629aa8b532a2a18594';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const zip = document.getElementById('zip');
const feelings = document.getElementById('feelings');
const generate = document.getElementById('generate');
generate.addEventListener('click', () => {
    
    if (zip.value.trim() === '' || feelings.value.trim() === '') {
        console.log('button is clicked');
        alert('please enter zip code and your feelings');
        return;
    }
    getWeatherTem(BASE_URL, zip, API_KEY)
        .then(data => sendData({
            date: now,
            temp: data.main.temp,
            feelings: feelings.value
        }))
        .then(() => updateUI())
});
// Create a new date instance dynamically with JS
const date = new Date();
const now = `${date.getMonth() + 1}.${date.getDate()}.${date.getFullYear()}`;

// Get Temperature

async function getWeatherTem(baseUrl, zipCode, apiKey) {
    const getData = await fetch(`${baseUrl}${zipCode}&appid=${apiKey}&unit=metric`);
    try {
        const data = await getData.json();
        return data;
    } catch (error) {
        console.log(Error, error);
    }
}
async function sendData(data = {}) {
    const postData = await fetch('/postData', {
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application.json'
        },
        body: JSON.stringify(data),
    });
    try {
        const data = await postData.json();
        return data;
    } catch (error) {
        console.log(Error, error);
    }
}

// Updating UI

async function updateUI() {
    const getData = await fetch('/postData');
    try {
        const data = await getData.json();
        document.getElementById('date').innerHTML = data.date;
        document.getElementById('temp').innerHTML = data.temp;
        document.getElementById('content').innerHTML = data.feelings;
    } catch (error) {
        console.log(Error, error);
    }
}
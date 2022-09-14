/* Global Variables */
const API_KEY = ',&appid=f953b433bf8dd4629aa8b532a2a18594&units=metric';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const generate = document.getElementById('generate');
const entry = document.querySelector('.entryHolder');
const server = 'http://localhost:5000/';
// Create a new date instance dynamically with JS
const date = new Date();
const now = date.toDateString();

const generateData = () => {
    const zip = document.getElementById('zip');
    const feelings = document.getElementById('feelings');
    getWeatherTem(BASE_URL, zip.value, API_KEY).then(data => {
        if (data) {
            const {
                main: { temp },
                name: city,
                weather: [{ description }],
            } = data;
            const info = {
                now,
                city,
                temp: Math.round(temp),
                description,
                feelings,
            };
            sendData(server + '/postData', info);
            updateUI();
            entry.classList.add('show');
        }
    })
}


generate.addEventListener('click', generateData);

// Get Temperature

async function getWeatherTem(baseUrl, zipCode, apiKey) {
    const getData = await fetch(`${baseUrl}${zipCode}${apiKey}`);
    try {
        const data = await getData.json();
        return data;
    } catch (error) {
        console.log(Error, error.message);
    }
}
// Send Data
async function sendData(url = '', data = {}) {
    const postData = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    try {
        const data = await postData.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(Error, error.message);
    }
}

// Updating UI

async function updateUI() {
    const getData = await fetch(server + '/getData');
    try {
        const data = await getData.json();
        document.getElementById('date').innerHTML = data.now;
        document.getElementById('temp').innerHTML = data.temp + '&degC';
        document.getElementById('content').innerHTML = data.feelings;

    } catch (error) {
        console.log(Error, error.message);
    }
}
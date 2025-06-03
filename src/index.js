const SERVER_URL = 'http://localhost:5000';

const changeCityName = () => {
    const newCityName = document.getElementById('cityNameInput').value;
    const headerCityName = document.getElementById('headerCityName');

    headerCityName.textContent = newCityName;
};

const getLatitudeLongitude = () => {
    axios.get(`${SERVER_URL}/location`, {
        params: {q: 'Seattle'}
    })
    .then((response) => {
        console.log('success in finding location', response.data);
        const lat = response.data[0].lat;
        const lon = response.data[0].lon;
        getWeather(lat, lon);
    })
    .catch((error) => {
        console.log('error in finding location', error);
    });
};

const getWeather = (lat, lon) => {
    axios.get(`${SERVER_URL}/weather`, {
        params: {
            lat: lat,
            lon: lon
        }
    })
    .then((response) => {
        console.log('weather found', response.data);
        const temperature = response.data.main.temp;
        console.log(temperature)
        document.getElementById('tempValue').textContent = temperature;
    })
    .catch((error) => {
        console.log('weather not found', error);
    })
};

const registerEventHandlers = () => {
    const cityNameInput = document.getElementById('cityNameInput');
    cityNameInput.addEventListener('input', changeCityName);
    const currentTempButton = document.getElementById('currentTempButton');
    currentTempButton.addEventListener('click', getLatitudeLongitude);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);

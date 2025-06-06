// const SERVER_URL = 'http://localhost:5000';
const SERVER_URL = 'https://weather-report-proxy-server-nnbk.onrender.com';

const state = {
  city: 'Seattle',
  lat: 47.6038321,
  lon: -122.330062,
  tempF: 75,
  tempC: 24,
  unit: 'Fahrenheit',
};


const increaseTemp = () => {
  if (state.unit === 'Fahrenheit') {
    state.tempF++;
    state.tempC = convertFToC(state.tempF);
  } else {
    state.tempC++;
    state.tempF = convertCToF(state.tempC);
  }
  updateDisplay();
};


const decreaseTemp = () => {
  if (state.unit === 'Fahrenheit') {
    state.tempF--;
    state.tempC = convertFToC(state.tempF);
  } else {
    state.tempC--;
    state.tempF = Math.round(state.tempC * 9/5 + 32);
  }
  updateDisplay();
};


const updateDisplay = () => {
  const tempValue = document.getElementById('tempValue');
  const landscape = document.getElementById("landscape");
  const season = document.getElementById('gardenContent');

  let temp;
  let unit;

  if (state.unit === 'Fahrenheit') {
    temp = state.tempF;
    unit = '°F';
  } else {
    temp = state.tempC;
    unit = '°C';
  }

  tempValue.textContent = `${temp}${unit}`;

  if (state.tempF >= 80) {
    tempValue.className = 'red';
    landscape.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
    season.className = 'summer';
  } else if (state.tempF >= 70) {
    tempValue.className = 'orange';
    landscape.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
    season.className = 'spring';
  } else if (state.tempF >= 60) {
    tempValue.className = 'yellow';
    landscape.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
    season.className = 'fall';
  } else if (state.tempF >= 50) {
    tempValue.className = 'green';
    landscape.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
    season.className = 'winter';
  } else {
    tempValue.className = 'teal';
    landscape.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
    season.className = 'winter';
  }

};


const changeCityName = () => {
  const newCityName = document.getElementById('cityNameInput');
  const headerCityName = document.getElementById('headerCityName');

  state.city = newCityName.value;
  headerCityName.textContent = newCityName.value;
};


const getLatitudeLongitude = () => {
  axios.get(`${SERVER_URL}/location`, {
    params: {q: `${state.city}`}
  })
  .then((response) => {
    console.log('success in finding location', response.data);
    state.lat = response.data[0].lat;
    state.lon = response.data[0].lon;
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.style.display = 'none';
    getWeather();
  })
  .catch((error) => {
    console.log('error in finding location', error);
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.style.display = 'block';
  });
};


const getWeather = () => {
  axios.get(`${SERVER_URL}/weather`, {
    params: {
      lat: state.lat,
      lon: state.lon,
    }
  })
  .then((response) => {
    console.log('weather found', response.data);
    state.tempF = convertKToF(response.data.main.temp);
    state.tempC = convertKToC(response.data.main.temp);
    updateDisplay();
  })
  .catch((error) => {
    console.log('weather not found', error);
  });
};


const convertKToF = (tempInK) => {
  const tempinF = Math.round((tempInK - 273.15) * 9/5 + 32);
  return tempinF;
};


const convertKToC = (tempInK) => {
  const tempinC = Math.round(tempInK - 273.15);
  return tempinC;
};


const convertFToC = (tempInF) => {
  const tempinC = Math.round((tempInF - 32) * 5/9);
  return tempinC;
};


const convertCToF = (tempInC) => {
  const tempinF = Math.round(state.tempC * 9/5 + 32);
  return tempinF;
};


const updateSky = () => {
  const skySelect = document.getElementById('skySelect').value;
  const sky = document.getElementById('sky');

  if (skySelect ===  'Sunny') {
    sky.textContent = '☁️ ☁️ ☁️ ☀️ ☁️ ☁️';
  } else if (skySelect === 'Cloudy') {
    sky.textContent = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
  } else if (skySelect === 'Rainy') {
    sky.textContent = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
  } else if (skySelect === 'Snowy') {
    sky.textContent = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
  }

};


const resetCity = () => {
  const newCityName = document.getElementById('cityNameInput');
  newCityName.value = 'Seattle';
  changeCityName();
  getLatitudeLongitude();
};


const switchUnits = () => {
  const selectedInput = document.querySelector('input[name="unit"]:checked');
  if (selectedInput) {
    state.unit = selectedInput.value;
    updateDisplay();
  }
}


const registerEventHandlers = () => {
  updateDisplay();
  updateSky();

  const incrButton = document.getElementById('increaseTempControl');
  incrButton.addEventListener('click', increaseTemp);

  const decrButton = document.getElementById('decreaseTempControl');
  decrButton.addEventListener('click', decreaseTemp);

  const cityNameInput = document.getElementById('cityNameInput');
  cityNameInput.addEventListener('input', changeCityName);

  const currentTempButton = document.getElementById('currentTempButton');
  currentTempButton.addEventListener('click', getLatitudeLongitude);

  const skySelect = document.getElementById('skySelect');
  skySelect.addEventListener('change', updateSky);

  const resetButton = document.getElementById('cityNameReset');
  resetButton.addEventListener('click', resetCity);

  const unitInputs = document.querySelectorAll('input[name="unit"]');
  unitInputs.forEach((input) => {input.addEventListener('change', switchUnits);
  });
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);

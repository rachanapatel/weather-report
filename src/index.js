const SERVER_URL = 'http://localhost:5000';

const state = {
  city: 'Seattle',
  temp: 59,
};

const resetCity = () => {
  let newCityName = document.getElementById('cityNameInput');
  const headerCityName = document.getElementById('headerCityName');

  newCityName.value = 'Seattle';
  state.city = newCityName.value;
  headerCityName.textContent = state.city;
};

const updateSky = () => {
  const skySelect = document.getElementById('skySelect').value;
  let sky;

  if (skySelect ===  'Sunny') {
    sky = '☁️ ☁️ ☁️ ☀️ ☁️ ☁️';
  } else if (skySelect === 'Cloudy') {
    sky = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
  } else if (skySelect === 'Rainy') {
    sky = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
  } else if (skySelect === 'Snowy') {
    sky = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
  }

  const skyDisplay = document.getElementById('sky');
  skyDisplay.textContent = sky;

};

const changeCityName = () => {
  const newCityName = document.getElementById('cityNameInput').value;
  const headerCityName = document.getElementById('headerCityName');

  state.city = newCityName;
  headerCityName.textContent = newCityName;
};


const getLatitudeLongitude = () => {
  axios.get(`${SERVER_URL}/location`, {
    params: {q: `${state.city}`}
  })
  .then((response) => {
    console.log('success in finding location', response.data);
    const lat = response.data[0].lat;
    const lon = response.data[0].lon;
    getWeather(lat, lon);
  })
  .catch((error) => {
    console.log('error in finding location', error);
  })
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
    state.temp = convertKToF(response.data.main.temp);
    updateDisplay();
  })
  .catch((error) => {
    console.log('weather not found', error);
  })
};

const convertKToF = (tempInK) => {
  const tempinF = Math.round((tempInK - 273.15) * 9/5 + 32);
  return tempinF;
};

const increaseTemp = () => {
  // updateTempValueDisplay();
  // updateLandscape();
  state.temp++;
  updateDisplay();
};


const decreaseTemp = () => {
  // updateTempValueDisplay();
  // updateLandscape();
  state.temp--;
  updateDisplay();
};


const updateDisplay = () => {
  let textColor;
  let landscapeDisplay;

  if (state.temp >= 80) {
    textColor = 'red';
    landscapeDisplay = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (state.temp >= 70) {
    textColor = 'orange';
    landscapeDisplay = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (state.temp >= 60) {
    textColor = 'yellow';
    landscapeDisplay = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (state.temp >= 50) {
    textColor = 'green';
    landscapeDisplay = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else {
    textColor = 'teal';
    landscapeDisplay = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  }

  const tempElement = document.getElementById('tempValue');
  const currentLandscapeElement = document.getElementById("landscape");

  tempElement.className = textColor;
  tempElement.textContent = `${state.temp}°F`;
  currentLandscapeElement.textContent = landscapeDisplay;
};


const registerEventHandlers = () => {
  // updateTextColor();
  // updateLandscape();
  updateDisplay();
  updateSky();

  const incrButton = document.querySelector('#increaseTempControl');
  incrButton.addEventListener('click', increaseTemp);

  const decrButton = document.querySelector('#decreaseTempControl');
  decrButton.addEventListener('click', decreaseTemp);

  const cityNameInput = document.getElementById('cityNameInput');
  cityNameInput.addEventListener('input', changeCityName);

  const currentTempButton = document.getElementById('currentTempButton');
  currentTempButton.addEventListener('click', getLatitudeLongitude);

  const skySelect = document.getElementById('skySelect');
  skySelect.addEventListener('change', updateSky);

  const resetButton = document.getElementById('cityNameReset');
  resetButton.addEventListener('click', resetCity)
};
  
document.addEventListener('DOMContentLoaded', registerEventHandlers);

// const updateTempValueDisplay = () => {
//     let tempElement = document.getElementById('tempValue');
//     let textColor;

//     if (state.temp >= 80) {
//       textColor = "red";
//     } else if (state.temp >= 70) {
//       textColor = "orange";
//     } else if (state.temp >= 60) {
//       textColor = "yellow";
//     } else if (state.temp >= 50) {
//       textColor = "green";
//     } else {
//       textColor = "teal";
//     }
//     tempElement.className = textColor;
//     tempElement.textContent = `${state.temp}°F`;
//   };

// const updateLandscape = () => {
//     let currentLandscapeElement = document.getElementById("landscape");
//     let landscapeDisplay;

//     if (state.temp >= 80) {
//         landscapeDisplay = "Very hot 🌵"
//     } else if (state.temp >= 70) {
//         landscapeDisplay = "Warm 🌸"
//     } else if (state.temp >= 60) {
//         landscapeDisplay = "Medium 🌾"
//     } else {
//         landscapeDisplay = "Cool ⛄️"
//     } 
//     currentLandscapeElement.textContent = landscapeDisplay;
// };
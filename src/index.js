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
const state = {
    temp: 59,
}

const increaseTemp = () => {
    state.temp++;
    // updateTempValueDisplay();
    // updateLandscape();
    updateDisplay();
  };

const decreaseTemp = () => {
    state.temp--;
    // updateTempValueDisplay();
    // updateLandscape();
    updateDisplay();
  };

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


  const updateDisplay = () => {
    const tempElement = document.getElementById('tempValue');
    let textColor;
    const currentLandscapeElement = document.getElementById("landscape");
    let landscapeDisplay;

    if (state.temp >= 80) {
      textColor = "red";
      landscapeDisplay = "Very hot 🌵"
    } else if (state.temp >= 70) {
      textColor = "orange";
      landscapeDisplay = "Warm"
    } else if (state.temp >= 60) {
      textColor = "yellow";
      landscapeDisplay = "Medium"
    } else if (state.temp >= 50) {
      textColor = "green";
      landscapeDisplay = "Cool"
    } else {
      textColor = "teal";
      landscapeDisplay = "Very Cool"
    }
    tempElement.className = textColor;
    tempElement.textContent = `${state.temp}°F`;
    currentLandscapeElement.textContent = landscapeDisplay;
  };

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


  const registerEventHandlers = () => {
    const incrButton = document.querySelector('#increaseTempControl');
    incrButton.addEventListener('click', increaseTemp);
    const decrButton = document.querySelector('#decreaseTempControl');
    decrButton.addEventListener('click', decreaseTemp);

    // updateTextColor();
    // updateLandscape();
    updateDisplay();
  };
  
  document.addEventListener('DOMContentLoaded', registerEventHandlers);

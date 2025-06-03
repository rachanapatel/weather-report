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
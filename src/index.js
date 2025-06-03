const changeCityName = () => {
    const newCityName = document.getElementById('cityNameInput').value;
    const headerCityName = document.getElementById('headerCityName');

    headerCityName.textContent = newCityName;
};

const registerEventHandlers = () => {
    const cityNameInput = document.getElementById('cityNameInput');
    cityNameInput.addEventListener('input', changeCityName);
}

document.addEventListener('DOMContentLoaded', registerEventHandlers);

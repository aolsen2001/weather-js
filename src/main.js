import "./styles.css";
import { getWeatherData, filterWeatherData } from './modules/data-functions.js';
import { DOMController } from "./modules/domcontroller.js";

const form = document.getElementById('info-form');
const locationInput = document.getElementById('location');

const locationsOnLoad = ['Milwaukee', 'Chicago', 'Dallas', 'Las Vegas', 'San Francisco', 'New York'];

let unitGroup = 'us';
let location = locationsOnLoad[Math.floor(Math.random() * 6)];

let weatherData = await getWeatherData(unitGroup, location);
let filteredWeatherData = filterWeatherData(weatherData);
console.log(location);

DOMController.updateForecast(filteredWeatherData, location);

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    location = locationInput.value;
    weatherData = await getWeatherData(unitGroup, location);
    if (weatherData === undefined) {
        DOMController.showLocationError();
    } else {
        filteredWeatherData = filterWeatherData(weatherData);
        DOMController.updateForecast(filteredWeatherData, location);
    }
});

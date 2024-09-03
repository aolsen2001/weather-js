import "./styles.css";
import { getWeatherData, processWeatherData } from "./modules/data-functions.js";

const form = document.getElementById('info-form');
const locationInput = document.getElementById('location');
const content = document.querySelector('.main-content-container');

const locationsOnLoad = ['Milwaukee', 'Chicago', 'Dallas', 'Las Vegas', 'San Francisco', 'New York'];

let unitGroup = 'us';
let location = locationsOnLoad[Math.floor(Math.random() * 6)];
console.log(location);

let weatherData = await getWeatherData(unitGroup, location);
let processedWeatherData = processWeatherData(weatherData);

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    location = locationInput.value;
    weatherData = await getWeatherData(unitGroup, location);
    if (weatherData === undefined) {
        const div = document.createElement('div');
        div.innerHTML = 'Location not found';
        content.append(div);
    } else {
        processedWeatherData = processWeatherData(weatherData);
        console.log(processedWeatherData);
    }
});
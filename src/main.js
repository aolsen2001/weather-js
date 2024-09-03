import "./styles.css";
import { getWeatherData, processWeatherData } from "./modules/data-functions.js";

// async function getWeatherData(location) {
//     try {
//         const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=DJ3HUDW7YL3L237YRPFEAKJSK`);
//         const weatherData = await response.json();
//         weatherData.days.forEach((d) => {
//             console.log(`${d.datetime}, ${d.temp}`);
//         });
//         return weatherData;
//     } catch (e) {

//     }
// }
const form = document.getElementById('info-form');
const locationInput = document.getElementById('location');
const content = document.querySelector('.main-content-container');
console.log(content);

let unitGroup = 'us';
let location = 'Milwaukee';
let weatherData;

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    location = locationInput.value;
    weatherData = await getWeatherData(unitGroup, location);
    if (weatherData === undefined) {
        const div = document.createElement('div');
        div.innerHTML = 'Location not found';
        content.append(div);
    } else {
        processWeatherData(weatherData);
    }
});
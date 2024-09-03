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
const locationInput = document.getElementById('location');

let unitGroup = 'us';
let location = 'Milwaukee';
let weatherData;

const submit = document.getElementById('submit');
submit.addEventListener('click', async () => {
    location = locationInput.value;
    weatherData = await getWeatherData(unitGroup, location);
    processWeatherData(weatherData);
});
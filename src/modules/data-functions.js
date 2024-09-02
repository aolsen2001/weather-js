export async function getWeatherData(location) {
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=DJ3HUDW7YL3L237YRPFEAKJSK`);
        const weatherData = await response.json();
        weatherData.days.forEach((d) => {
            console.log(`${d.datetime}, ${d.temp}`);
        });
        return weatherData;
    } catch (e) {

    }
}
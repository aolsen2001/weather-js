export async function getWeatherData(units, location) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${units}&key=DJ3HUDW7YL3L237YRPFEAKJSK&contentType=json`,
    );
    const weatherData = await response.json();
    return weatherData;
  } catch (e) {
    console.error(e);
  }
}

export function filterWeatherData(weatherData) {
    if (weatherData === undefined) {
        console.error('Weather data is undefined');
        return;
    }
    const filteredWeatherData = [];
    filteredWeatherData.push(weatherData.days);
    return filteredWeatherData;
}


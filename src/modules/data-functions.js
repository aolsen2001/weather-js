export async function getWeatherData(units, location) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${units}&key=DJ3HUDW7YL3L237YRPFEAKJSK&contentType=json`,
    );
    const weatherData = await response.json();
    console.log(typeof weatherData);
    return weatherData;
  } catch (e) {
    console.error(e);
  }
}

export function processWeatherData(weatherData) {
    const filteredWeatherData = weatherData.days;
    filteredWeatherData.forEach((d) => {
        console.log(`${d.datetime}, ${d.temp}, ${d.conditions}`);
    });
}
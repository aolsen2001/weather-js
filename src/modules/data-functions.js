export async function getWeatherData(units, location) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${units}&key=DJ3HUDW7YL3L237YRPFEAKJSK&contentType=json`,
    );
    const weatherData = await response.json();
    console.log(weatherData);
    return weatherData;
  } catch (e) {
    console.error(e);
  }
}

export function processWeatherData(weatherData) {
    if (weatherData === undefined) {
        console.error('Weather data is undefined');
        return;
    }
    const filteredWeatherData = [];
    filteredWeatherData.push(weatherData.days);
    filteredWeatherData[0].forEach((d) => {
      if (d === filteredWeatherData[0][0]) console.log('today');
      console.log(`${d.datetime}, ${d.temp}, ${d.conditions}`);
    });
    // const filteredWeatherData = weatherData.days;
    // filteredWeatherData.forEach((d) => {
    //     console.log(`${d.datetime}, ${d.temp}, ${d.conditions}`);
    // });
}


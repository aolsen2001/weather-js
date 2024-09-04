import { format } from 'date-fns';

export const DOMController  = (function () {
    const contentContainer = document.querySelector('.main-content-container');

    const weatherToday = document.querySelector('.weather-today');

    const forecast = document.querySelector('.forecast-table');
    const forecastCaption = forecast.children[0];
    const forecastBody = forecast.children[2];
    
    function updateForecast(filteredWeatherData) {
        const today = format(new Date(), 'EEEE M/d');
        console.log(today);

        let dateVals = dateStringToNums(filteredWeatherData[0][1].datetime);
        const dateStart = format(new Date(dateVals[0], dateVals[1], dateVals[2]), 'EEEE M/d');

        dateVals = dateStringToNums(filteredWeatherData[0][14].datetime);
        const dateEnd = format(new Date(dateVals[0], dateVals[1], dateVals[2]), 'EEEE M/d');

        forecastCaption.innerHTML = `Forecast for ${dateStart} to ${dateEnd}`;

        for (let i = 2; i < 14; ++i) {
            dateVals = dateStringToNums(filteredWeatherData[0][i].datetime);
            let date = format(new Date(dateVals[0], dateVals[1], dateVals[2]), 'EEEE M/d');

            console.log(date);
        }
    }

    function dateStringToNums(date) {
        const dateVals = [];

        const year = parseInt(date.substring(0, 4));
        dateVals.push(year);

        // get month and subtract 1 since months in 'date-fns' functions are 0-indexed
        const month = parseInt(date.substring(5, 7)) - 1;
        dateVals.push(month);

        const day = parseInt(date.substring(8, 10));
        dateVals.push(day);

        return dateVals;
    }

    return { updateForecast };
})();
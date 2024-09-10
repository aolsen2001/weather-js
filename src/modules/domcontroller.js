import { format } from 'date-fns';
import sun from '../imgs/sun.svg';
import rain from '../imgs/rain.svg';
import cloud from '../imgs/cloud.svg';

export const DOMController  = (function () {
    const weatherToday = document.querySelector('.weather-today');
    const forecast = document.querySelector('.forecast-table');
    const forecastCaption = forecast.children[0];
    const forecastBody = forecast.children[2];
    const errorMessage = document.getElementById('location-error');
    
    function updateForecast(filteredWeatherData, location) {
        // hide the error message if visible
        errorMessage.classList.add('hidden');

        const todayData = filteredWeatherData[0][0];
        // update the forecast for the current day
        updateWeatherToday(todayData, location);
        
        forecastBody.innerHTML = '';

        // make the forecast visible if it was hidden
        forecast.classList.remove('hidden');

        for (let i = 1; i < 15; ++i) {
            const currentItem = filteredWeatherData[0][i];

            const date = formatDate(currentItem.datetime);
            const low = Math.round(currentItem.tempmin);
            const high = Math.round(currentItem.tempmax);
            const conditions = currentItem.conditions;
            updateForcastRow(date, low, high, conditions);
        }

        const dateStart = formatDate(filteredWeatherData[0][1].datetime);
        const dateEnd = formatDate(filteredWeatherData[0][14].datetime);

        forecastCaption.innerHTML = `Forecast for ${dateStart} to ${dateEnd}`;
    }

    /**
     * Formats the date passed as a string
     * @param {string} date the date to convert
     * @returns the date formatted as 'day of the week, month/day of the month'
     */
    function formatDate(date) {
        const year = parseInt(date.substring(0, 4));
        // get month and subtract 1 since months in 'date-fns' functions are 0-indexed
        const month = parseInt(date.substring(5, 7)) - 1;

        const day = parseInt(date.substring(8, 10));

        const formattedDate = format(new Date(year, month, day), 'EEEE M/d')

        return formattedDate;
    }

    function updateWeatherToday(todayData, location) {
        // make the current forecast visible if it was hidden
        weatherToday.classList.remove('hidden');

        weatherToday.innerHTML = '';

        const locationHeader = document.createElement('h1');
        locationHeader.innerHTML = location;
        weatherToday.appendChild(locationHeader);
        
        const todayHeader = document.createElement('h1');
        const today = format(new Date(), 'EEEE M/d');
        todayHeader.innerHTML = today;
        weatherToday.appendChild(todayHeader);

        const weatherImg = document.createElement('img');
        weatherImg.src = getImageSource(todayData.conditions.toUpperCase());
        weatherToday.appendChild(weatherImg);

        const weatherTodayContainer = document.createElement('div');
        weatherTodayContainer.classList.add('today-content-container');
        weatherToday.appendChild(weatherTodayContainer);

        const currentTempToday = document.createElement('div');
        currentTempToday.innerHTML = `Current temperature: ${todayData.temp}`;
        weatherTodayContainer.appendChild(currentTempToday);

        const lowTempToday = document.createElement('div');
        lowTempToday.innerHTML = `Low temperature: ${Math.round(todayData.tempmin)}`;
        weatherTodayContainer.appendChild(lowTempToday);

        const highTempToday = document.createElement('div');
        highTempToday.innerHTML = `High temperature: ${Math.round(todayData.tempmax)}`;
        weatherTodayContainer.appendChild(highTempToday);

        const conditionsToday = document.createElement('div');
        conditionsToday.innerHTML = `Outlook: ${todayData.description}`;
        weatherTodayContainer.appendChild(conditionsToday);
    }

    function getImageSource (conditions) {
        if (conditions === 'CLEAR') {
            return sun;
        }
        if (conditions.includes('RAIN')) {
            return rain;
        }
        if (conditions.includes('CLOUDY')) {
            return cloud;
        }
    }

    function updateForcastRow (date, low, high, conditions) {
        const forecastRow = document.createElement('tr');

        const rowDate = document.createElement('th');
        rowDate.setAttribute('scope', 'row');
        rowDate.innerHTML = date;
        forecastRow.appendChild(rowDate);

        const rowLow = document.createElement('td');
        rowLow.innerHTML = low;
        forecastRow.appendChild(rowLow);

        const rowHigh = document.createElement('td');
        rowHigh.innerHTML = high;
        forecastRow.appendChild(rowHigh);

        const rowConditions = document.createElement('td');
        rowConditions.innerHTML = conditions;
        forecastRow.appendChild(rowConditions);

        forecastBody.appendChild(forecastRow);
    }

    function showLocationError() {
        errorMessage.classList.remove('hidden');
        weatherToday.classList.add('hidden');
        forecast.classList.add('hidden');
    }

    return { updateForecast, showLocationError };
})();
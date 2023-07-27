import View from "./view";

class forecastWind extends View {
    _parentElement = document.querySelector('.more-container__wind');

    _generateWeather(){
        return `
            <h3 class="more-container__wind__h3">Wind speed</h3>
            <div class="more-container__wind__data">
                ${this._date.forecast.forecastday[0].hour.map(hour => {
                    return `
                    <div class="more-container__wind__data__hourly">
                        <p class="more-container__wind__data__hourly__img" style="transform:rotate(${hour.wind_degree}deg)">&uarr;</p>
                        <p class="more-container__wind__data__hourly__pwind">${hour.wind_kph}km/h</p>
                        <span class="more-container__wind__data__hourly__hour">${this._getTime(hour.time)}</span>
                    </div>
                    `
                }).join("")}
            </div>
        `;
    }
}

export default new forecastWind();
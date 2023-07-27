import View from "./view";

class forecastPrecipitation extends View {
    _parentElement = document.querySelector('.more-container__precipitation');

    _generateWeather(){
        return `
            <h2 class="more-container__precipitation__h3">Precipitation</h2>
            <div class="more-container__precipitation__data">
                ${this._date.forecast.forecastday[0].hour.map(hour => {
                return `
                    <div class="more-container__precipitation__data__hourly">
                        <p class="more-container__precipitation__data__hourly__p">${hour.chance_of_rain}%</p>
                        <p class="more-container__precipitation__data__hourly__p">${hour.precip_mm}mm</pc>
                        <p class="more-container__precipitation__data__hourly__p">${this._getTime(hour.time)}</p>
                    </div>
                    `;
                }).join("")}
            </div>
        `;
    }
}

export default new forecastPrecipitation();
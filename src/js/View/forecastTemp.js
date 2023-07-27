import View from "./view";

class forecastTemp extends View {
    _parentElement = document.querySelector('.more-container__temp');

    _generateWeather(){
        return `
            <h3 class="more-container__temp__h3">Temperature</h3>
            <div class="more-container__temp__data">
                ${this._date.forecast.forecastday[0].hour.map(hour => {
                    return `
                        <div class="more-container__temp__data__hourly">
                            <img src="${hour.condition.icon}" alt="" class="more-container__temp__data__hourly__img">
                            <p class="more-container__temp__data__hourly__ptemp">${hour.temp_c}℃</p>
                            <span class="more-container__temp__data__hourly__hour">${this._getTime(hour.time)}</span>
                        </div>  
                    `
                }).join("")}
            </div>
        `;
    }
}

export default new forecastTemp();
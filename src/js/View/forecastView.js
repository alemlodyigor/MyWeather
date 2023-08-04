import View from "./view.js";

class forecastView extends View {
    _parentElement = document.querySelector('.forecast-container');

    _addFutureHandler(handler){
        this._parentElement.addEventListener('click', (e)=>{
            const dataTime = e.target.parentElement.dataset.time;
            if(!dataTime) return;
            document.querySelector('.header').scrollIntoView({behavior:'smooth'});
            handler(+dataTime);
        })
    }

    _generateWeather() {
        const forecastDate = this._date.forecast.forecastday;
        return `
            ${forecastDate.map(el => {
            return `
                <div class="forecast-container__day" data-time=${el.date_epoch}>
                    <h2 class="forecast-container__day__name">${this._displayDate(el.date_epoch, this._date.language.displayDate)}</h2>
                    <h3 class="forecast-container__day__temp">${el.day.maxtemp_c}℃</h3>
                    <img src="${el.day.condition.icon}" alt="" class="forecast-container__day__img">
                    <h3 class="forecast-container__day__precipitation">${el.day.daily_chance_of_rain}%</h3>
                </div>
            `;
        }).join("")}
        `;
    }
}

export default new forecastView();
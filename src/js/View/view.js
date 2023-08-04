export default class View {
    _date;
    _data = new Date();

    render(location, current, forecast, language) {
        if (!location || !current || !forecast || !language) return this._errorMessage;

        this._date = {location: location, current: current, forecast: forecast, language: language};
        const html = this._generateWeather();
        this._clearSpinner();
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', html);
    }

    renderSpinner(){
        const markup = `<div class="custom-loader"></div>`;
        document.querySelector('.renderSpinner').classList.remove('hidden2');
        document.querySelector('.renderSpinner').insertAdjacentHTML('afterbegin', markup);
    }

    _clearSpinner(){
        document.querySelector('.renderSpinner').innerHTML = '';
        document.querySelector('.renderSpinner').classList.add('hidden2');
    }

    renderRecent(recent, language) {
        if (!recent || !language) return;

        this._date = {recent: recent, language: language};
        const html = this._generateRecent();
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', html);
    }

    renderSearchs(data) {
        if (!data) return this._errorMessage;

        this._date = data;
        this._toggleResultWindow();
        const html = this._generateResults();

        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', html);
    }

    _clear() {
        this._parentElement.innerHTML = '';
    }

    _errorMessage(message) {

    }

    _getTime(time){
        const date = time;
        const day = date.slice(-5);
        return day;
    }

    _displayDate(epoch, lang) {
        const actualDay = new Date(this._data).getDate();
        const utcSeconds = epoch;
        const datetime = new Date(0);
        datetime.setUTCSeconds(utcSeconds);
        const futureDay = datetime.getDate();
        const day = Math.abs(futureDay - actualDay);
        
        if (day === 0) return lang.today;
        if (day === 1) return lang.tomorrow;
        if (day === 2) return lang.afterTomorrow;
    }

    _displayHour(epoch) {
        const date = new Date(epoch * 1000);
        const options = {
            hour: "numeric",
            minute: "numeric",
            timeZone: "Europe/Warsaw",
        }
        return new Intl.DateTimeFormat("en-US", options).format(date);
    }
}
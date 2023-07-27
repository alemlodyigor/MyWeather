export default class View {
    _date;
    _data = new Date();

    render(location, current, forecast) {
        if (!location || !current || !forecast) return this._errorMessage;

        this._date = {location: location, current: current, forecast: forecast};
        const html = this._generateWeather();

        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', html);
    }

    renderRecent(data) {
        if (!data) return;

        this._date = data;
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

    _displayDate(epoch) {
        const actualDay = new Date(this._data).getDate();
        const utcSeconds = epoch;
        const datetime = new Date(0);
        datetime.setUTCSeconds(utcSeconds);
        const futureDay = datetime.getDate();
        const day = Math.abs(futureDay - actualDay);

        if (day === 0) return 'Today';
        if (day === 1) return 'Tomorrow';
        if (day === 2) return 'After tomorrow';
    }

    _displayHour(epoch) {
        const epochNumber = epoch;
        const options = {
            hour: "numeric",
            minute: "numeric",
        }
        return new Intl.DateTimeFormat("en-US", options).format(epochNumber);
    }
}
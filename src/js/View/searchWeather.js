import View from "./view.js";

class searchWeather extends View {
    _parentElement = document.querySelector('.nav-menu__form');

    getQuery() {
        const query = this._parentElement.firstElementChild.value;
        this._clearInput;
        return query;
    }

    _clearInput() {
        this._parentElement.querySelector('.nav-menu__form__search-field').value = '';
    }

    _addSearchHandler(handler) {
        let timeoutId;
        const timeoutLength = 1000;

        this._parentElement.addEventListener('input', (event) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(handler, timeoutLength);
        })

        this._parentElement.addEventListener('keydown', e => {
            clearTimeout(timeoutId);
        })

        this._parentElement.addEventListener('submit', (e)=> {
            e.preventDefault();
            handler();
            clearTimeout(timeoutId);
        })
    }
}

export default new searchWeather();
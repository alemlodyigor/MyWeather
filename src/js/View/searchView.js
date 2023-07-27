import View from "./view";

class searchView extends View {
    _parentElement = document.querySelector('.nav-menu__search__results');

    _addResultHandler(handler) {
        this._parentElement.addEventListener('click', function (e) {
            const elementId = +e.target.closest('div').dataset.id;

            handler(elementId);
        })
    }

    _toggleResultWindow() {
        this._parentElement.classList.toggle('hidden');
    }

    _generateResults() {
        return `
            ${this._date.map((el, i) => {
            return `
                <div class="nav-menu__search__results__element" data-id="${el.id}">
                    <p>${el.name}, ${el.country}</p>
                </div>
            `
        }).join("")}
        `;
    }
}

export default new searchView();
import View from "./view";

class recentView extends View {
    _parentElement = document.querySelector('.recent');

    _generateRecent(){
        return `
            <h3 class="recent__h3">${this._date.language.recentSearches}</h3>
            <hr>
            <div class="recent__searches">
                ${this._date.recent.map(el => {
                    return `
                    <div class="recent__searches__element" data-lat="${el.lat}" data-lon="${el.lon}">
                        <img src="${el.img}" alt="" class="recent__searches__element__img">
                        <h2 class="recent__searches__element__city">${el.name}</h2>
                        <h5 class="recent__searches__element__country">${el.country}</h5>
                    </div>
                    `;
                }).join("")}
            </div>
        `;
    }

    _addResultHandler(handler){
        this._parentElement.addEventListener('click', function(e){
            const elementLat = e.target.closest('div').dataset.lat;
            const elementLon = e.target.closest('div').dataset.lon;
            const coordinates = [elementLat, elementLon];
            handler(coordinates, false);
        })
    }
}

export default new recentView();
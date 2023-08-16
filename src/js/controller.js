import * as model from "./model.js";
import weatherView from "./View/weatherView.js";
import forecastView from "./View/forecastView.js";
import searchWeather from "./View/searchWeather.js";
import searchView from "./View/searchView.js";
import futureView from "./View/futureView.js";
import forecastData from "./View/forecastData.js";
import forecastTemp from "./View/forecastTemp.js";
import forecastWind from "./View/forecastWind.js";
import recentView from "./View/recentView.js";
import forecastPrecipitation from "./View/forecastPrecipitation.js";
import darkView from "./View/darkView.js";
import langView from "./View/langView.js";

const controlSearchResults = async function () {
    try {
        const query = searchWeather.getQuery();
        if (!query) return;

        await model.searchActualData(query);
        
        searchView.renderSearchs(model.state.search);
        
    } catch (err) {
        console.error(err);
    }
}

const renderSearchedResult = async function (id, status=true, first=false, change=false) {
    try {
        weatherView.renderSpinner();
        let coordinates;
        status === true ? searchView._toggleResultWindow() : '';
        change === true ? '' : coordinates = await model.getIP();
        first === true ? await model.getActualData(coordinates) : await model.getActualData(id);
        searchWeather._clearInput();

        weatherView.render(model.state.location, model.state.current, model.state.forecast, model.state.language);

        forecastData.render(model.state.location, model.state.current, model.state.forecast, model.state.language);

        forecastTemp.render(model.state.location, model.state.current, model.state.forecast, model.state.language);
        forecastWind.render(model.state.location, model.state.current, model.state.forecast, model.state.language);
        forecastPrecipitation.render(model.state.location, model.state.current, model.state.forecast, model.state.language);

        forecastView.render(model.state.location, model.state.current, model.state.forecast, model.state.language);

        recentView.renderRecent(model.state.recent, model.state.language);

        getColor();

        changeBackground(model.state.currentColor);

    } catch (err) {
        console.error(err);
    }
}

const renderFutureWeather = async function(dateTime){
    try {
        model.updateData(dateTime);

        futureView.render(model.state.location, model.state.current, model.state.forecast, model.state.language);

        forecastData.render(model.state.location, model.state.current, model.state.forecast, model.state.language);

        forecastTemp.render(model.state.location, model.state.current, model.state.forecast, model.state.language);
        forecastWind.render(model.state.location, model.state.current, model.state.forecast, model.state.language);
        forecastPrecipitation.render(model.state.location, model.state.current, model.state.forecast, model.state.language);

        getColor();

        changeBackground(model.state.currentColor);

    } catch (err) {
        console.error(err);
    }
}

const getColor = function(){
    model.findColor();
}

const changeBackground = function(color) {
    const root = document.querySelector(':root');
    const [color1,color2] = color;

    root.style.setProperty("--background-gradient-color1", color1);
    root.style.setProperty("--background-gradient-color2", color2);
}

const themeSwitch = function(contain){
    const root = document.querySelector(':root');
    if(contain){
        root.style.setProperty("--color-white-secondary", '#303030');
        root.style.setProperty("--color-grey-primary", '#e9ecef');
        root.style.setProperty("--box-shadow-color-grey", "rgb(220, 221, 231, 1)");
        root.style.setProperty("--color-white-primary", '#5e6b77');
    }

    if(!contain){
        root.style.setProperty("--color-white-secondary", '#fff');
        root.style.setProperty("--color-grey-primary", '#303030');
        root.style.setProperty("--color-white-primary", '#e9ecef');
        root.style.setProperty("--box-shadow-color-grey", "rgba(66, 68, 90, 1)")
    }
}

const changeLanguage = function(code){
    model.changeLang(code);
    renderSearchedResult([model.state.location.lat, model.state.location.lon], false, false, true);
}

const init = function () {

    renderSearchedResult('', false, true);

    langView._addChangeLangHandler(changeLanguage);

    searchWeather._addSearchHandler(controlSearchResults);

    searchView._addResultHandler(renderSearchedResult);

    forecastView._addFutureHandler(renderFutureWeather);

    model.loadSearchData();
    recentView.renderRecent(model.state.recent);

    recentView._addResultHandler(renderSearchedResult);

    darkView._addSwitchThemeHandler(themeSwitch);
}

init();
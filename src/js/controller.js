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

const renderSearchedResult = async function (id, status=true, first=false) {
    try {
        status===true ? searchView._toggleResultWindow() : '';
        const coordinates = await model.getIP();
        first===true ? await model.getActualData(coordinates) : await model.getActualData(id);

        weatherView.render(model.state.location, model.state.current, model.state.forecast);

        forecastData.render(model.state.location, model.state.current, model.state.forecast);

        forecastTemp.render(model.state.location, model.state.current, model.state.forecast);
        forecastWind.render(model.state.location, model.state.current, model.state.forecast);
        forecastPrecipitation.render(model.state.location, model.state.current, model.state.forecast);

        forecastView.render(model.state.location, model.state.current, model.state.forecast);

        recentView.renderRecent(model.state.recent);

        getColor();

        changeBackground(model.state.currentColor);

    } catch (err) {
        console.error(err);
    }
}

const renderFutureWeather = async function(dateTime){
    try {
        model.updateData(dateTime);

        futureView.render(model.state.location, model.state.current, model.state.forecast);

        forecastData.render(model.state.location, model.state.current, model.state.forecast);

        forecastTemp.render(model.state.location, model.state.current, model.state.forecast);
        forecastWind.render(model.state.location, model.state.current, model.state.forecast);
        forecastPrecipitation.render(model.state.location, model.state.current, model.state.forecast);

        getColor();

        changeBackground(model.state.currentColor);

    } catch (err) {
        console.error(err);
    }
}

const init = function () {
    renderSearchedResult('', false, true);

    searchWeather._addSearchHandler(controlSearchResults);

    searchView._addResultHandler(renderSearchedResult);

    forecastView._addFutureHandler(renderFutureWeather);

    model.loadSearchData();
    recentView.renderRecent(model.state.recent);

    recentView._addResultHandler(renderSearchedResult);

    darkView._addSwitchThemeHandler(themeSwitch);
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
        root.style.setProperty("--box-shadow-color-grey", "rgb(220, 221, 231, 1)")
    }

    if(!contain){
        root.style.setProperty("--color-white-secondary", '#fff');
        root.style.setProperty("--color-grey-primary", '#303030');
        root.style.setProperty("--box-shadow-color-grey", "rgba(66, 68, 90, 1)")
    }
}

init();
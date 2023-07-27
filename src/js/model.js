import { API_URL, LANGUAGE, DAYS, KEY } from './config.js'
import { getJSON } from './helpers.js';

export const state = {
    currentColor: [],
    colors: [
        {
            name: 'sunny',
            code: [1000],
            color: ['#80e6ff', '#c3c382'],
        },
        {
            name: 'clear night',
            code: [1000],
            color: ['#0c1014', '#272b4b'],
        },
        {
            name: 'cloud',
            code: [1003, 1006, 1009, 1030, 1135, 1147],
            color: ['#88a2a8', '#22252d'],
        },
        {
            name: 'snow',
            code: [1066, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258, 1072, 1168, 1171, 1237, 1261, 1264, 1198, 1201],
            color: ['#bababa', '#838383'],
        },
        {
            name: 'thunder',
            code: [1087, 1279, 1282, 1273, 1276],
            color: ['#24272d', '#4e5c66'],
        },
        {
            name: 'snow with rain',
            code: [1069, 1249, 1252, 1204, 1207],
            color: ['#bfc5cb', '#27334b'],
        },
        {
            name: 'rain',
            code: [1180, 1183, 1186, 1189, 1192, 1195, 1240, 1243, 1150, 1153, 1246, 1063],
            color: ['#5555ed', '#00d4ff'],
        },
    ],
    location: {
    },
    current: {
    },
    forecast: {
    },
    search: [],
    recent: [],
}

export const findColor = function(){
    const currentCode = state.weather.current.condition.code;
    const color = state.colors.find(e => e.code.find(e => e === currentCode)).color;

    state.currentColor = color;
}

const getID = function (id) {
    const city = state.search.find(el => el.id === id);
    const {lat, lon} = city;
    return [lat, lon];
}

export const updateData = function (dateTime){
    const forecastArray = state.weather.forecast.forecastday;
    const forecastDay  = [forecastArray.find(e => e.date_epoch === dateTime)];
    state.forecast = {forecastday: forecastDay};
}

export const getActualData = async function(info) {
    try{
        const coordinates = Number.isInteger(info) ? getID(info) : info;
        const [lat, lon] = coordinates; 
        const data = await getJSON(`${API_URL}${KEY}&q=${lat},${lon}${LANGUAGE}${DAYS}`);
        state.location = data.location;
        state.current = data.current;
        state.forecast = data.forecast;
        state.weather = data;
 
        saveSearchData();

    } catch (err) {
        throw err;
    }
}

const saveSearchData = function () {
    const searches = JSON.parse(localStorage.getItem('recentSearch'));
    const searchesArr = Array.isArray(searches) ? searches : Array(searches);

    const currentLocation = {
        country: state.location.country,
        name: state.location.name,
        lat: state.location.lat,
        lon: state.location.lon,
        img: state.current.condition.icon,
    }

    searchesArr.push(currentLocation);
    
    const searchesArrCorrected = !searchesArr[0] ? searchesArr.slice(1) : searchesArr;
    
    const uniquehelper = [];
    const uniqueSearches = searchesArrCorrected.filter(el => {
        const duplicatename = uniquehelper.includes(el.name);

        if(!duplicatename){
            uniquehelper.push(el.name);    
            return true;
        }

        return false;
    });

    localStorage.removeItem('recentSearch');
    localStorage.setItem('recentSearch',  JSON.stringify(uniqueSearches));
    
    state.recent = uniqueSearches;
}

export const loadSearchData = function () {
    const data = JSON.parse(localStorage.getItem('recentSearch'));
    if(!data) return;

    state.recent = data; 
}

export const searchActualData = async function (query) {
    const searchData = await getJSON(`https://api.weatherapi.com/v1/search.json?${KEY}&q=${query}${LANGUAGE}`);

    state.search = searchData;
    
    return searchData;
}
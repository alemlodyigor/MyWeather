import View from "./view";

class forecastData extends View{
    _parentElement = document.querySelector('.more-container');


    _generateWeather(){
        return `
        <section class="more-container__important">
        <h3 class="more-container__important__h3">${this._displayDate(this._date.forecast.forecastday[0].date_epoch, this._date.language.displayDate)}'s forecast</h3>
        <div class="more-container__important__data">
            <h2 class="heading-2 heading__important__data">${this._date.forecast.forecastday[0].day.avgtemp_c}℃</h2>
            <span class="span span__important__data">${this._date.language.forecastData.feelsLike}</span>
            <div class="more-container__important__data__details">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" height="48" viewBox="0 96 960 960" width="48"><path d="M480.134 952q-72.6 0-123.367-50.672Q306 850.656 306 778q0-45.077 22.756-85.856 22.755-40.778 63.09-62.067V288.154q0-37.757 25.437-62.955Q442.719 200 479.937 200q37.217 0 62.717 25.199 25.5 25.198 25.5 62.955v341.923q41.335 21.289 63.591 61.9Q654 732.588 654 778q0 72.656-50.632 123.328Q552.735 952 480.134 952Zm-44.519-403.692h88.77V479H480v-34.539h44.385v-80.384H480v-33.039h44.385v-42.884q0-18.864-12.796-31.624-12.796-12.761-31.712-12.761-18.915 0-31.589 12.761-12.673 12.76-12.673 31.624v260.154Z"/></svg>
                <p class="more-container__important__data__details__p1">Min/Max</p>
                <p class="more-container__important__data__details__p2">${this._date.forecast.forecastday[0].day.mintemp_c}℃ / ${this._date.forecast.forecastday[0].day.maxtemp_c}℃</p>
                <hr class="more-container__important__data__details__hr">
            </div>
            <div class="more-container__important__data__details">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" height="48" viewBox="0 96 960 960" width="48"><path d="M253 918q-95.409 0-163.704-67.402Q21 783.197 21 685.505q0-81.435 51-147.47T204 459q22-100 100.222-162.5Q382.445 234 482.604 234 597 234 678.5 316.5 760 399 767 515v24q75 8 123.5 60.91T939 729q0 78.667-55.167 133.833Q828.667 918 750 918H253Zm.419-91H748q40.84 0 70.42-29.92T848 727q0-41.668-29.556-70.939-29.556-29.272-70.361-29.272h-71.35v-93.877q0-86.931-57.633-146.921Q561.468 326 478.283 326q-85.409 0-142.676 63.569-57.267 63.569-57.267 153.666h-27.92q-57.274 0-97.847 40.447Q112 624.128 112 684.308 112 743 153.573 785q41.573 42 99.846 42ZM480 576Z"/></svg>
                <p class="more-container__important__data__details__p1">${this._date.language.forecastData.cloudy}</p>
                <p class="more-container__important__data__details__p2">${this._date.current.cloud}%</p>
                <hr class="more-container__important__data__details__hr">
            </div>
            <div class="more-container__important__data__details">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" height="48" viewBox="0 96 960 960" width="48"><path d="M435 295V114h91v181h-91Zm275 115-65-65 129-128 65 64-129 129Zm51 211v-91h181v91H761Zm-326 416V856h91v181h-91ZM249 411 123 283l64-65 128 129-66 64Zm526 524L645 806l64-64 130 124-64 69ZM19 621v-91h181v91H19Zm169 313-66-65 128-128 33 32.073L317 804 188 934Zm291.647-124Q382 810 314 741.647q-68-68.353-68-166T314.353 410q68.353-68 166-68T646 410.353q68 68.353 68 166T645.647 742q-68.353 68-166 68Zm.353-92q57 0 100-42.5t43-99.5q0-57-43-100t-100-43q-57 0-99.5 43T338 576q0 57 42.5 99.5T480 718Zm0-142Z"/></svg>
                <p class="more-container__important__data__details__p1">UV</p>
                <p class="more-container__important__data__details__p2">${this._date.current.uv}</p>
                <hr class="more-container__important__data__details__hr">
            </div>
            <div class="more-container__important__data__details">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" height="48" viewBox="0 96 960 960" width="48"><path d="M448.882 967Q385 967 345.5 931.667 306 896.333 306 828h100q0 25 9 36t33.105 11q25.106 0 35-9.865Q493 855.271 493 828.816q0-27.605-10.075-40.211Q472.85 776 449 776H71v-92h378q63.833 0 99.417 35.875Q584 755.75 584 827.5q0 67.5-35.618 103.5-35.617 36-99.5 36ZM71 471v-92h541q33.867 0 49.433-16.384Q677 346.233 677 308.116 677 270 661.407 253t-50.093-17q-35.5 0-50.907 19.567Q545 275.133 545 303h-92q0-72 44-115t114-43q69 0 113 42t44 121q0 79-44.107 121T612 471H71Zm665 384v-91q32 0 47-18.593t15-53Q798 657 780.433 641.5 762.867 626 731.758 626H71v-91h660q68.786 0 113.393 41.5T889 692.5q0 78.5-42.607 120.5T736 855Z"/></svg>
                <p class="more-container__important__data__details__p1">${this._date.language.forecastData.feelsLike}</p>
                <p class="more-container__important__data__details__p2">${this._date.forecast.forecastday[0].day.avgvis_km} km</p>
                <hr class="more-container__important__data__details__hr">
            </div>
            <div class="more-container__important__data__details">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" height="48" viewBox="0 96 960 960" width="48"><path d="M580.412 805Q601 805 615.5 790.588q14.5-14.411 14.5-35Q630 735 615.382 720.5q-14.617-14.5-35.5-14.5Q559 706 545 720.618q-14 14.617-14 35.5Q531 777 545.412 791q14.412 14 35 14ZM378 799l246-245-42-42-245 246 41 41Zm2.412-194Q401 605 415.5 590.588q14.5-14.411 14.5-35Q430 535 415.382 520.5q-14.617-14.5-35.5-14.5Q359 506 345 520.618q-14 14.617-14 35.5Q331 577 345.412 591q14.412 14 35 14Zm99.581 392Q333.66 997 235.83 896.948 138 796.895 138 647.843q0-104.753 84.5-228.798T480 147q173 148 258 272.108t85 228.716q0 148.847-98.337 249.011Q626.327 997 479.993 997Zm-.249-91Q587 906 659 832.278t72-184.828q0-73.45-64.494-168.95-64.495-95.5-186.5-209.5Q358 383 293.5 478.967 229 574.934 229 648.025q0 110.578 71.744 184.276Q372.488 906 479.744 906ZM480 572Z"/></svg>
                <p class="more-container__important__data__details__p1">${this._date.language.forecastData.humidity}</p>
                <p class="more-container__important__data__details__p2">${this._date.current.humidity}%</p>
                <hr class="more-container__important__data__details__hr">
            </div>
            <div class="more-container__important__data__details">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" height="48" viewBox="0 96 960 960" width="48"><path d="M479.588 945q-155.358 0-261.973-106.85Q111 731.299 111 575.941t106.833-263.149Q324.667 205 480 205q6.707 0 13.854.5Q501 206 514 207q-29 36-44 78.5T455 374q0 96.417 66.083 162.208Q587.167 602 683 602q46.891 0 89.946-13Q816 576 851 549q-1 11.975-.5 17.195.5 5.22.5 8.72 0 155.168-108.277 262.627Q634.446 945 479.588 945Zm.412-91q90 0 160-53t91-126q-19 8-42.167 11.5Q665.667 690 645 689q-109.612-13-186.806-88.486Q381 525.027 367 409q-1-15.333 2-36.667Q372 351 382 322q-79 30-129.5 100.5T202 576q0 117.086 80.457 197.543Q362.914 854 480 854Zm-13-266Z"/></svg>
                <p class="more-container__important__data__details__p1">${this._date.language.forecastData.moonPhase}</p>
                <p class="more-container__important__data__details__p2">${this._date.forecast.forecastday[0].astro.moon_phase}</p>
                <hr class="more-container__important__data__details__hr">
            </div>
        </div>
    </section>
    `;
    }
}

export default new forecastData();
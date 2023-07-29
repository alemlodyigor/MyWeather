class darkView {
    _parentElement = document.querySelector('.nav-menu__options__theme');
    _darkIcon = document.querySelector('.nav-menu__options__theme__dark');
    _lightIcon = document.querySelector('.nav-menu__options__theme__light');

    _addSwitchThemeHandler(handler){
        this._parentElement.addEventListener('click', (e)=>{
            const target = e.target.closest('svg');

            const targetClass = target.classList.contains('nav-menu__options__theme__dark');

            this._darkIcon.classList.toggle('hidden');
            this._lightIcon.classList.toggle('hidden');

            handler(targetClass);

        })
    }

}

export default new darkView();
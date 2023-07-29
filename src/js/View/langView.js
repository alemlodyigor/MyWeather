class langView {
    _parentElement = document.querySelector('.nav-menu__options__lang__select');

    _addChangeLangHandler(handler){
        this._parentElement.addEventListener('change', (e)=>{
            const code = this._parentElement.value;

            handler(code);
        })
    }
}

export default new langView();
import {getTemplate} from "./template/getTemplate.js";

export class SelectPlugin {
    constructor(selector, options) {
        this.selector = selector;
        this.options = options;

        this.el = document.querySelector(selector);
        this.selectedId = options.selectedId;
        this._eventList = [];

        this._render();
        this._setup();
    }

    open() {
        this.el.classList.add("open");
    }

    close() {
        this.el.classList.remove("open");
    }

    destroy() {
        this._eventList.forEach(item => {
            const {element, event, handler} = item;
            element.removeEventListener(event, handler);
        });

        this.el.innerHTML = "";
    }

    _render() {
        this.el.classList.add("select");
        this.el.innerHTML = getTemplate(this.options);
    }
  
    _setup() {
        this._setupEvents();
        this._eventList.forEach(item => {
            let {element, event, handler} = item;
            handler = handler.bind(this);
            element.addEventListener(event, handler);
        });

        this.inputValue = this.el.querySelector('[data-type="input_value"]');

    }

    _setupEvents() {
        this._addEvent(this.el, "click", this._clickInSelectHandler);
        this._addEvent(window, "click", this._clickOutOfSelectHandler);
    }

    _addEvent(element, event, handler) {
        this._eventList.push({element, event, handler})
    }

    _clickInSelectHandler(event) {
        const dataset = event.target.dataset;    

        if (dataset.type === "input") {
            this._toggle();
        } else if (dataset.type === "item") {
            this._selectItem(dataset.id);
        } else {
            this._toggle();
        }
    }

    _clickOutOfSelectHandler(event) {
        if(!event.target.closest(this.selector)) {
            this.close();
        }
    }

    _toggle() {
        this._isOpen() ? this.close() : this.open();
    }

    _isOpen() {
        return this.el.classList.contains("open");
    }

    _selectItem(id) {

        this.selectedId = id;
        this.inputValue.textContent = this._currentItem.value;

        this.el.querySelectorAll('[data-type="item"]').forEach(element => {
            element.classList.remove("selected");
        });

        const item = this.el.querySelector(`[data-id="${id}"]`);
        item.classList.add("selected");

        this.close();
    }

    get _currentItem() {
        return this.options.data.find(item => item.id === this.selectedId);
    }
}




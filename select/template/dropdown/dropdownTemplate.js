import { isSelected } from "../common";

const dropdownTemplate = options => {
    return `
        <div class="select__dropdown">
            <ul class="select__list">
                ${getListItems(options)}
            </ul>
        </div>
    `;
}

const getListItems = (options) => {
    const {data, selectedId} = options;
    if (typeof data === "undefined") {
        throw new Error("Parameters in options.data must be passed to the input/dropdown template");
    }

    return data
        .map(item => {
            let selected;
            isSelected(item, selectedId) ? selected = "selected" : selected = "";

            return `
                <li tabindex="0" class="select__item ${selected}" data-id="${item.id}" data-type="item">${item.value}</li>
            `;
        })
        .join("");
}

export {
    dropdownTemplate
}




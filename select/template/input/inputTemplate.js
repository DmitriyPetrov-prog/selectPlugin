import { isSelected } from "../common";

const inputTemplate = options => {
    return `
        <div class="select__input" data-type="input">
            ${getInputValue(options)}
            <i class="fas fa-chevron-down"></i>
        </div>`
}

const getInputValue = options => {
    const {placeholder, data, selectedId} = options;
    
    if (typeof data === "undefined") {
        throw new Error("Parameters in options.data must be passed to the input/dropdown template");
    }

    let text = placeholder || "Default placeholder";
    data.forEach(item => {
        if (isSelected(item, selectedId)) text = item.value;
    })

    return `
        <span data-type="input_value">${text}</span>
    `;
}

export {
    inputTemplate
}

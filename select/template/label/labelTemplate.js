export const labelTemplate = (options) => {
    let value = options.label;
    if(typeof value === "undefined") {
        value = "";
    }

    let content;
    value.toString() 
        ? content = `<div class="select__label" data-type="label">${value}</div>`
        : content = "";

    return content;
}
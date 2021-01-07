import { dropdownTemplate } from "./dropdown/dropdownTemplate";
import { labelTemplate} from "./label/labelTemplate";
import { inputTemplate } from "./input/inputTemplate";

export const getTemplate = (options) => {
    return `       
        ${labelTemplate(options)}
        ${inputTemplate(options)}
        ${dropdownTemplate(options)}
    `;
}






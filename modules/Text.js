import { Element } from "./Element.js";

export class Text extends Element {
    constructor(x, y, props, parent, canvas) {
        super(parent, 'text', canvas, {x, y, ...props});
    }

    setText(text) {
        this.element.textContent = text;
        return this;
    }
}
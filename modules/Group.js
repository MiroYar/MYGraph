import { Element } from "./Element.js";

export class Group extends Element {
    constructor(props, parent, canvas) {
        super(parent, 'g', canvas, props);
    }
}
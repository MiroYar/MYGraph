import { Primitive } from "./Primitive.js";

export class Element extends Primitive {
    constructor(parent, tag, canvas, props = {}) {
        super(parent, tag, canvas, props);
    }
}
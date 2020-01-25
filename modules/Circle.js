import { Geometry } from "./Geometry.js";

export class Circle extends Geometry {
    constructor(cx, cy, r, props, parent, canvas) {
        super(parent, 'circle', canvas, { cx, cy, r, ...props});
    }

    moveX(cx) {
        this.setAttr({ cx });
        return this;
    }

    moveY(cy) {
        this.setAttr({ cy });
        return this;
    }
}
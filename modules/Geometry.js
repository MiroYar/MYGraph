import { Element } from "./Element.js";

export class Geometry extends Element {
    constructor(parent, tag, canvas, props = {}) {
        super(parent, tag, canvas, props);
        this._pathLength = this.element.getTotalLength();
        this._fillable = false;
    }

    fillablePath(percent = 100) {
        this.setAttr({ 'stroke-dasharray': `${this._pathLength} ${this._pathLength}`, 'stroke-dashoffset': `${this._pathLength - this._pathLength * percent / 100}` }, this.element);
        this._fillable = true;
        return this;
    }

    fillPath(percent) {
        this.setAttr({ 'stroke-dashoffset': `${this._pathLength - this._pathLength * percent / 100}` }, this.element);
        return this;
    }
}
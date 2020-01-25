import { Primitive } from './modules/Primitive.js';
import { Path } from './modules/Path.js';
import { Text } from './modules/Text.js';
import { Circle } from './modules/Circle.js';
import { Group } from './modules/Group.js';

export class MYSVG extends Primitive {
    constructor(
        parent,
        widthCanvas,
        heightCanvas,
        { canvas, invertX = false, invertY = false, props = {} } = {}
    ) {
        super(parent, 'svg', (canvas = canvas ? canvas : 'self'), {
            xmlns: 'http://www.w3.org/2000/svg',
            version: '1.1',
            viewBox: `0 0 ${widthCanvas} ${heightCanvas}`,
            ...props
        });
        this._widthCanvas = widthCanvas;
        this._heightCanvas = heightCanvas;
        this._invertX = invertX;
        this._invertY = invertY;
    }

    circle(cx, cy, r, props = {}, parent = this.element, canvas = this) {
        return new Circle(cx, cy, r, props, parent, canvas);
    }

    path(d, props = {}, parent = this.element, canvas = this) {
        return new Path(d, props, parent, canvas);
    }

    text(x, y, props = {}, parent = this.element, canvas = this) {
        return new Text(x, y, props, parent, canvas);
    }

    group(props = {}, parent = this.element, canvas = this) {
        return new Group(props, parent, canvas);
    }
}

import { Geometry } from './Geometry.js';
import { LineCommand } from './LineCommand.js';

export class Path extends Geometry {
    constructor(d, props, parent, canvas) {
        super(parent, 'path', canvas, { d, ...props });
        this._lineCommands = this.parsePath(d);
    }

    _invertPath() {
        this._lineCommands.forEach(lineCommand => {
            let commName = lineCommand.name;
            if (['M', 'm', 'L', 'l', 'T', 't'].includes(commName)) {
                let point = lineCommand.value;
                lineCommand.value = [
                    this.canvas._invertX ? this.canvas._widthCanvas - point[0] : point[0],
                    this.canvas._invertY ? this.canvas._heightCanvas - point[1] : point[1]
                ]
            }
            else if (['C', 'c', 'S', 's', 'Q', 'q'].includes(commName)) {
                lineCommand.value = lineCommand.value.map(point => {
                    return [
                        this.canvas._invertX ? this.canvas._widthCanvas - point[0] : point[0],
                        this.canvas._invertY ? this.canvas._heightCanvas - point[1] : point[1]
                    ];
                });
            }
            else if (['H', 'h'].includes(commName) && this.canvas._invertX) {
                lineCommand.value = this.canvas._widthCanvas - lineCommand.value;
            }
            else if (['V', 'v'].includes(commName) && this.canvas._invertY) {
                lineCommand.value = this.canvas._heightCanvas - lineCommand.value;
            }
        });
    }

    morphPath(d, fullness = 100) {
        this.setAttr({ d });
        if (this._fillable) {
            this._pathLength = this.element.getTotalLength();
            this.fillablePath(fullness);
        }
        return this;
    }

    parsePath(path) {
        let arr = path.match(/\w[\d\s,\.\-]*(?=\s\D|$)/g);
        return arr.map(lineCommandStr => {
            return new LineCommand(
                lineCommandStr
            );
        });
    }

    stringifyPath() {
        return this._lineCommands.reduce((result, el, i) => {
            return `${result}${i > 0 ? ' ' : ''}${el.string}`;
        }, '');
    }

    setPoint() {
        let group = this.canvas.group();
        let canvas = this.canvas.element;
        let point, X, Y;
        this._lineCommands.forEach(lineComm => {
            lineComm.value.forEach(point => {
                point.style = this.canvas.circle(point.x, point.y, 6, { fill: 'green' }, group.element);
                point.style.element.addEventListener('movePoint', () => {
                    point.x = point.style.element.getAttribute('cx');
                    point.y = point.style.element.getAttribute('cy');console.log(lineComm.value)
                    lineComm.string = lineComm.stringifyCoord();
                    this.element.setAttribute('d', this.stringifyPath());
                });
            });
        });
        function mousemove(event) {
            point.setAttribute('cx', event.offsetX - X);
            point.setAttribute('cy', event.offsetY - Y);
            point.dispatchEvent(new CustomEvent('movePoint', { bubbles: true }));
        }
        function mouseup() {
            canvas.removeEventListener('mousemove', mousemove);
        }
        this.canvas.element.addEventListener('mousedown', (event) => {
            point = event.target;
            X = event.offsetX - event.target.getAttribute('cx');
            Y = event.offsetY - event.target.getAttribute('cy');
            this.canvas.element.addEventListener('mousemove', mousemove);
            this.canvas.element.addEventListener('mouseup', mouseup, { once: true });
        }, { passive: true });
    }
}
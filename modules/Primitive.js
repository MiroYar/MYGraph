export class Primitive {
    constructor(parent, tag, canvas, props = {}) {
        this.parent = typeof parent === 'string' ? document.querySelector(parent) : parent;
        this.element = this._draw(tag, props);
        this.canvas = canvas === 'self' ? this : canvas;
    }

    _draw(tag, props) {
        let element = this._create(tag, props);
        this.parent.appendChild(element);
        return element;
    }

    _create(tag, props) {
        let element = document.createElementNS('http://www.w3.org/2000/svg', tag);
        element = this.setAttr(props, element);
        return element;
    }

    getAttr(...props) {
        let result = props.map(attr => this.element.getAttribute(attr));
        return result.length === 1 ? result[0]: result;
    }

    setAttr(props, element = this.element) {console.log(element, props)
        Object.keys(props).forEach(attr => element.setAttribute(attr, props[attr]));
        return this.element ? this : element;
    }

    removeAttr(...props) {
        props.forEach(attr => this.element.removeAttribute(attr));
        return this;
    }
}
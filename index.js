import { MYSVG } from './MYSVG.js';

let range = document.querySelector('#range');

range.addEventListener('input', () => {
    circle.fillPath(range.value);
});

let svg = new MYSVG('.svg', 500, 500, { invertY: true });

let path = svg.path('M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80', {
    id: 'tutu',
    fill: 'none',
    stroke: '#ff0066',
    'stroke-width': '4'
});

let circle = svg
    .circle('60', '200', '50', { fill: 'none', stroke: '#ff0066', 'stroke-width': '4' })
    .fillablePath(range.value);

let text = svg
    .text('0', '100', { 'stroke-dasharray': `20 20`, 'stroke-dashoffset': `50`, fill: '#ffffff' })
    .setText('Very interesting text.');

// LINE
let svgLine = new MYSVG('.svgLine', 500, 300);

let pathLine = svgLine.path('M10 25 L 480 285', {
    fill: 'none',
    stroke: '#ff0066',
    'stroke-width': '4'
});

let pointX = document.querySelector('#pointX');
let pointY = document.querySelector('#pointY');

function getX(y, { a, b }) {
    return ((y - a[1]) * (b[0] - a[0])) / (b[1] - a[1]) + a[0];
}

function getY(x, { a, b }) {
    return ((x - a[0]) * (b[1] - a[1])) / (b[0] - a[0]) + a[1];
}

let a = [10, 25];
let b = [480, 285];

let point = svgLine.circle(
    getX(a[1] + ((b[1] - a[1]) * pointY.value) / 100, { a, b }),
    getY(a[0] + ((b[0] - a[0]) * pointX.value) / 100, { a, b }),
    4,
    { fill: 'blue' }
);

pointX.addEventListener('input', () => {
    let x = a[0] + ((b[0] - a[0]) * pointX.value) / 100;
    let y = getY(x, { a, b });
    point.setAttr({ cx: x, cy: y });
    pointY.value = ((y - a[1]) * 100) / (b[1] - a[1]);
});

pointY.addEventListener('input', () => {
    let y = a[1] + ((b[1] - a[1]) * pointY.value) / 100;
    let x = getX(y, { a, b });
    point.setAttr({ cx: x, cy: y });
    pointX.value = ((x - a[0]) * 100) / (b[0] - a[0]);
});

let svg2 = new MYSVG('.svg2', 500, 500);

let path2 = svg2.path('M10 10 C 70 10 70 20 10 50', {
    fill: 'none',
    stroke: '#ff0066',
    'stroke-width': '4'
});

setTimeout(() => {
    path2.setPoint();
    path.setPoint();
}, 5000);

console.log(svg.canvas);
console.log(path2);

console.log(path2.getAttr('d'));
console.log(path2.stringifyPath());

let frame = new MYSVG('.frame', 500, 500, { props: { width: '500', height: '500' } });

let c1 = frame.circle('250', '250', '250', { fill: 'green' });
let c2 = frame.circle('250', '750', '250', { fill: 'yellow' });
let c3 = frame.circle('-250', '750', '250', { fill: 'red' });
let c4 = frame.circle('-250', '250', '250', { fill: 'blue' });

let pX, pY, ar;

function mM(event) {
    frame.element.setAttribute('viewBox', `${pX - event.offsetX} ${pY - event.offsetY} 500 500`);
}

function mU() {
    frame.element.removeEventListener('mousemove', mM);
}

frame.element.addEventListener('mousedown', event => {
    ar = frame.element.getAttribute('viewBox').match(/[\S]+/g);
    pX = Number(ar[0]) + event.offsetX;
    pY = Number(ar[1]) + event.offsetY;
    frame.element.addEventListener('mousemove', mM);
    frame.element.addEventListener('mouseup', mU, { once: true });
});

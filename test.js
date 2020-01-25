function setLineCommand(target) {
    return new Proxy(target, {
        get(target, prop) {
            switch (prop) {
                case 'name':
                    return Object.keys(target)[0];
                case 'value':
                    return Object.values(target)[0];
                default:
                    return undefined;
            }
        },
        set(target, prop, value) {
            if (Object.keys(target).includes(prop)) {
                target[prop] = value;
                return true;
            }
            else {
                return false;
            }
        }
    })
}

let t = {
    test: [10, 10]
}

t = setLineCommand(t);

console.log(t);
console.log(t.key);
console.log(t.value);

t.key = 'S';
t.value = [[10,10], [20,20]];
console.log(t);
console.log(t.key);
console.log(t.value);

t['test'] = 'H';
console.log('key', t);
import { Point } from "./Point.js";

export class LineCommand {
    constructor(string) {
        this.name = string.match(/\w/)[0];
        this.value = this.parseCoord(this.name, string.match(/[\-\d][\d\s,\.\-]+/)[0]);
        this.string = string;
    }

    parseCoord(commName, commValueStr) {
        try {
            if (['Z', 'z'].includes(commName)) return null;
            else {
                commValueStr = commValueStr.match(/[\d\.\-]+/g);
                if ((['H', 'h'].includes(commName) && commValueStr.length === 1)) {
                    return new Point({x: value});
                }
                else if ((['V', 'v'].includes(commName) && commValueStr.length === 1)) {
                    return new Point({y: value});
                }
                else if (
                    (['M', 'm', 'L', 'l', 'T', 't'].includes(commName) && commValueStr.length === 2)
                    || (['C', 'c'].includes(commName) && commValueStr.length === 6)
                    || (['S', 's', 'Q', 'q'].includes(commName) && commValueStr.length === 4)
                ) {
                    commValueStr = commValueStr.reduce((result, value, i) => {
                        if (i % 2 == 0) {
                            result.push(new Point({x: value}));
                            return result;
                        }
                        else {
                            result[result.length - 1].y = value;
                            return result;
                        };
                    }, []);
                    return commValueStr;
                }
                else if (['A', 'a'].includes(commName)) {
                    console.log('Для дуг еще не сформирован парсинг в файле ./methods/parsePath.js.')
                    return commValueStr;
                }
                else{
                    throw new Error(`Неправильное наименование точки: ${commName}, или точка имеет не правильные координаты: ${commValueStr}`);
                }
            }
        }
        catch (err) {
            console.error(err);
        }
    }

    stringifyCoord() {
        let points = this.value.reduce((result, point, i) => {
            return `${result}${i > 0 ? ' ' : ''}${point.x} ${point.y}`
        }, '');
        return `${this.name} ${points}`;
    }
}
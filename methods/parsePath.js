import { Point } from "../modules/Point.js";
import { LineCommand } from "../modules/LineCommand.js";

function getCoordArr(commName, commValueStr) {
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

function getLineCommand(lineCommandStr) {
    let commName = lineCommandStr.match(/\w/)[0];
    let commValueStr = lineCommandStr.match(/[\-\d][\d\s,\.\-]+/);
    return new LineCommand(
        commName,
        getCoordArr(commName, commValueStr[0]),
        lineCommandStr
    );
}

function getLineCommandsArr(arr) {
    return arr.map(lineCommandStr => getLineCommand(lineCommandStr));
}

function getLineCommandsStrArr(path) {
    return path.match(/\w[\d\s,\.\-]*(?=\s\D|$)/g);
}

export function parsePath(path) {
    let arr = getLineCommandsStrArr(path);
    return getLineCommandsArr(arr);
}
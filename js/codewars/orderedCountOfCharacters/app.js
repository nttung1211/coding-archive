"use strict";
function countCharsV1(chars) {
    const result = [];
    const countedChars = [];
    for (let char of chars) {
        let count = 0;
        if (!countedChars.includes(char)) {
            countedChars.push(char);
            for (let char2 of chars) {
                if (char2 === char) {
                    count++;
                }
            }
        }
        else {
            continue;
        }
        result.push([char, count]);
    }
    return result;
}
function countCharsV2(chars) {
    const result = [];
    outerLoop: for (let i = 0; i < chars.length; i++) {
        let count = 0;
        for (let j = 0; j < chars.length; j++) {
            if (chars[i] === chars[j]) {
                if (i > j) {
                    continue outerLoop;
                }
                else {
                    count++;
                }
            }
        }
        result.push([chars[i], count]);
    }
    return result;
}
function countCharsV3(chars) {
    const uniqueChars = [...new Set([...chars])];
    return uniqueChars.map(char => [char, chars.split(char).length - 1]);
}
function countCharsV4(chars) {
    return [...[...chars].reduce((result, char) => result.set(char, result.has(char) ? result.get(char) + 1 : 1), new Map())];
}
var countCharsV5 = function (text) {
    return Array.from(new Set(text)).map(c => [c, text.match(new RegExp(c, 'g')).length]);
};
console.log(countCharsV4('abacbdddccdd'));
//# sourceMappingURL=app.js.map
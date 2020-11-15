// + VERSION 1:
function countCharsV1(chars: string): Array<[string, number]> {
  const result: Array<[string, number]> = [];
  const countedChars: string[] = [];

  for (let char of chars) {
    let count = 0;

    if (!countedChars.includes(char)) {
      countedChars.push(char);
      for (let char2 of chars) {
        if (char2 === char) {
          count++;
        }
      }
    } else {
      continue;
    }

    result.push([char, count]);
  }

  return result;
} 


// + VERSION 2:
function countCharsV2(chars: string): Array<[string, number]> {
  const result: Array<[string, number]> = [];

  outerLoop:
  for (let i = 0; i < chars.length; i++) {
    let count = 0;

    for (let j = 0; j < chars.length; j++) {

      if (chars[i] === chars[j]) {

        if (i > j) {
          continue outerLoop;
        } else {
          count++;
        }
      }
    }

    result.push([chars[i], count]);
  }

  return result;
} 

// + VERSION 3:
function countCharsV3(chars: string): [string, number][] {
  // Make unique characters with new Set 
  const uniqueChars = [...new Set([...chars])];
  // Find number of a character in a string with split()
  return uniqueChars.map(char => [char, chars.split(char).length - 1]);
}

// + VERSION 4:
function countCharsV4(chars: string): [string, number][] {
  return [...[...chars].reduce((result, char) => result.set(char, result.has(char) ? result.get(char)! + 1 : 1), new Map())];
}

// + VERSION 5:
var countCharsV5 = function (text: string): [string, number][] {
  return Array.from(new Set(text)).map(c => [c, text.match(new RegExp(c, 'g'))!.length]);
}

// TESTING
console.log(countCharsV4('abacbdddccdd'));

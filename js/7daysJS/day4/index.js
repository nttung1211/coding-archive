function sumPrimesV1(num) {
  if (num === 1) return 1;
  if (num === 2) return 3;
  const primes = [1, 2];

  for (let i = 3; i <= num; i++) {
    let isPrime = true;

    for (let j = 2; j < i; j++) {
      if (i % j === 0) {
        isPrime = false;
        break;
      }
    }
    
    if (isPrime) {
      primes.push(i);
    }
  }

  return primes.reduce((total, num) => total + num);
}

const sumPrimesV2 = num => {
  if (num === 1) return 1;
  let sum = 1;

  for (let i = 2; i <= num; i++) {
    for (let j = 2; j <= i; j++) {
      if (j === i) {
        sum += i;
      }

      if (i % j === 0) {
        break;
      }
    }
  }

  return sum;
}

console.log(sumPrimesV1(10));

function toCamelCase(str){
  const words = str.replace(/[-]/g, '_').split('_');

  words.forEach((word, i) => {
    if (i > 0) {
      words[i] = word.replace(word[0], word[0].toUpperCase());
    }
  })

  return words.join('');
}

console.log(toCamelCase('the_stealth_warrior'));


let string = 'nguyen_tung';
console.log(string.replace(/[_-][a-z]/g, (match, offset, string) => string[offset + 1].toUpperCase()));

function toCamel(str){
  return str.replace(/[_-]\w/gi, ch => ch[1].toUpperCase());
}

console.log(toCamel('the_stealth_warrior'));

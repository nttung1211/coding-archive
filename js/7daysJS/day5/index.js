// function isAllEven(num) {
//   const digits = `${num}`.split('');

//   return digits.every(digit => +digit % 2 === 0);
// }

const isAllEven = number => `${number}`.split('').every(stringDigit => +stringDigit % 2 === 0);

console.log(isAllEven(2489));

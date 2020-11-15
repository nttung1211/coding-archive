// + ADD TWO DIGITS

function addDigits(num) {
  const nums = `${num}`.split('');
  return nums.reduce((total, num) => total + +num, 0)
}

console.log(addDigits(1234));
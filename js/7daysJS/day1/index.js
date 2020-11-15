function border(arr) {
  arr = arr.map(el => `*${el}*`);
  const wall = '*'.repeat(arr[0].length + 2);
  arr.unshift(wall);
  arr.push(wall);

  return arr;
}

const names = [
  'tung',
  'hung'
]

const boderedNames = border(names);
console.log(boderedNames);
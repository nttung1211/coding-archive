function firstDuplicateV1(arr) {
  const n = arr.length;
  
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (arr[i] === arr[j]) {
        return arr[i];
      }
    }
  }

  return 'No duplicate';
}

const firstDuplicateV2 = (nums) => {
  const uniqueNums = [];

  for (let num of nums) {
    if (uniqueNums.some(uniqueNum => uniqueNum == num)) {
      return num;
    }

    uniqueNums.push(num);
  }

  return 'No duplicate';
}

const firstDuplicateV3 = (nums) => {
  const uniqueNums = {};

  for (let num of nums) {
    if (uniqueNums.hasOwnProperty(num)) {
      return num;
    }

    uniqueNums[num] = null;
  }

  return 'No duplicate';
}

console.log('First duplicate: ' + firstDuplicateV3([1, 3, 4, 5]));


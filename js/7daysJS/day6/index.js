// + VERSION 1:
function makeConsecutiveV1(nums) {
  const addedNums = [];
  let numOfAddedNum = 0;

  for (let i = 2; i <= 9; i++) {
    let isExisting = false;
    for (let num of nums) {
      if (i === num) {
        isExisting = true;
        break;
      }
    }
  
    if (!isExisting) {
      numOfAddedNum++;
      addedNums.push(i);
    }
  }

  return {
    addedNums,
    numOfAddedNum
  }
}

// + VERSION 2:
function makeConsecutiveV2(nums) {
  const addedNums = [];
  let numOfAddedNum = 0;

  outerLoop:
  for (let i = 2; i <= 9; i++) {
    for (let j = 0; j <= nums.length; j++) {
      if (j === nums.length) {
        numOfAddedNum++;
        addedNums.push(i);
        continue outerLoop;
      }

      if (i === nums[j]) {
        break;
      }
    }
  }

  return {
    addedNums,
    numOfAddedNum
  }
}

// + VERSION 3:
function makeConsecutiveV3(nums) {
  const addedNums = [];
  let numOfAddedNum = 0;

  outerLoop:
  for (let i = 2; i <= 9; i++) {
    for (let j = 0; j <= nums.length; j++) {
      if (i === nums[j]) {
        continue outerLoop;
      }
    }

    numOfAddedNum++;
    addedNums.push(i);
  }

  return {
    addedNums,
    numOfAddedNum
  }
}

// + VERSION 4:
function makeConsecutiveV4(nums) {
  const addedNums = [];
  let numOfAddedNum = 0;

  for (let i = 2; i <= 9; i++) {
    if (nums.includes(i)) {
      continue;
    }

    numOfAddedNum++;
    addedNums.push(i);
  }

  return {
    addedNums,
    numOfAddedNum
  }
}

// TESTING
console.log(makeConsecutiveV4([2, 4 ,7, 9]));
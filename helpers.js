function createFrequencyCounter(arr) {
  return arr.reduce(function (acc, next) {
    acc[next] = (acc[next] || 0) + 1;
    return acc;
  }, {});
}

function convertAndValidateNumsAr(numsString) {
  let result = [];
  for (let i = 0; i < numsString.length; i++) {
    let valToNumber = Number(numsString[i]);

    if (Number.isNaN(valToNumber)) {
      return new Error(
        `This Value ${numsString[i]} at index ${i} is not a valid number`
      );
    }
    result.push(valToNumber);
  }
  return result;
}

function findMean(nums) {
  if (nums.length === 0) return 0;
  return (
    nums.reduce(function (acc, cur) {
      return acc + cur;
    }) / nums.length
  );
}

function findMedian(nums) {
  //sor and get middle element

  nums.sort((a, b) => a - b);

  let middleIndex = Math.floor(nums.length / 2);
  let median;

  if (nums.length % 2 === 0) {
    median = (nums[middleIndex] + nums[middleIndex - 1]) / 2;
  } else {
    median = nums[middleIndex];
  }
  return median;
}

/**
 * Find the most common element in the array
 * @param {Array} arr any array
 */
function findMode(arr) {
  let freqCounter = createFrequencyCounter(arr);

  let count = 0;
  let mostFrequent;

  for (let key in freqCounter) {
    if (freqCounter[key] > count) {
      mostFrequent = key;
      count = freqCounter[key];
    }
  }

  return +mostFrequent;
}

module.exports = {
  convertAndValidateNumsAr,
  findMean,
  findMedian,
  findMode,
};

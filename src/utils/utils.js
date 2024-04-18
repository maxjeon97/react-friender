/** Finds the difference between two times in hours and returns that
 * difference as a float
 */

function getTimeDifferenceInHours(currentTime, lastSearchedTime) {
  const differenceMillis = Math.abs(
    currentTime.getTime() - lastSearchedTime.getTime());

  return differenceMillis / (1000 * 3600);
}

export { getTimeDifferenceInHours };
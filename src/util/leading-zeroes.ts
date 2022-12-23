export const leadingZeroes = (num: number, positions: number): string => {
  if (positions <= 1) {
    return num.toString();
  }
  if (num >= 10 ** (positions - 1)) {
    return num.toString();
  }

  const numBuff = num + 10 ** positions;
  const res = numBuff.toString().substring(1);
  return res;
};

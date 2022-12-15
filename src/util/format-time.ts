import { Seconds } from '../model/util-types';

const leadingZeroes = (num: number, positions: number): string => {
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

export const formatTime = (all: Seconds): string => {
  let secondsLeft = all;

  const h = Math.floor(secondsLeft / 60 / 60);
  secondsLeft -= h * 60 * 60;

  const m = Math.floor(secondsLeft / 60);
  secondsLeft -= m * 60;

  const s = Math.floor(secondsLeft);

  const h_f = h <= 0 ? [] : leadingZeroes(h, 2);
  const m_f = h <= 0 && m <= 0 ? [] : leadingZeroes(m, 2);
  const s_f = h <= 0 && m <= 0 ? s.toString() : leadingZeroes(s, 2);

  const res = [h_f, m_f, s_f].flatMap((a) => a).join(':');

  return res;
};

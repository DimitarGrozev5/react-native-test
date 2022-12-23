import { Seconds } from '../model/util-types';
import { getHMS } from './getHMS';
import { leadingZeroes } from './leading-zeroes';

export const formatTime = (all: Seconds): string => {
  const [h, m, s] = getHMS(all);

  const h_f = h <= 0 ? [] : leadingZeroes(h, 2);
  const m_f = h <= 0 && m <= 0 ? [] : leadingZeroes(m, 2);
  const s_f = h <= 0 && m <= 0 ? s.toString() : leadingZeroes(s, 2);

  const res = [h_f, m_f, s_f].flatMap((a) => a).join(':');

  return res;
};

import { Seconds } from '../model/util-types';

export const getHMS = (time: Seconds): [number, number, number] => {
  let secondsLeft = time;

  const h = Math.floor(secondsLeft / 60 / 60);
  secondsLeft -= h * 60 * 60;

  const m = Math.floor(secondsLeft / 60);
  secondsLeft -= m * 60;

  const s = Math.floor(secondsLeft);

  return [h, m, s];
};

const fns = {
  easeInCubic,
  easeOutQuart,
};

export const animateState = (
  from: number,
  to: number,
  setter: (value: number) => void,
  finalFunction: () => void,
  duration = 100,
  fn: keyof typeof fns = 'easeOutQuart'
) => {
  const start = new Date().getTime();
  const range = to - from;

  setter(from);

  const interval = setInterval(() => {
    const now = new Date().getTime();
    const dt = now - start;
    const dtScaled = dt / duration;

    const val = fns[fn](dtScaled) * range + from;
    if (dtScaled > 1) {
      clearInterval(interval);
      finalFunction();
      return;
    }
    setter(val);
  }, 10);
};

function easeInCubic(x: number): number {
  return x * x * x;
}

function easeOutQuart(x: number): number {
  return 1 - Math.pow(1 - x, 4);
}

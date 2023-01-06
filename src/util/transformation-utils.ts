import { BarCodeScanningResult } from 'expo-camera';

export const center = (res: BarCodeScanningResult) => {
  const [sumX, sumY] = res.cornerPoints.reduce(
    ([sX, sY], pt) => {
      return [sX + pt.x, sY + pt.y];
    },
    [0, 0]
  );

  return { x: sumX / 4, y: sumY / 4 };
};

export const dist = (res: BarCodeScanningResult) => {
  return Math.max(
    Math.sqrt(
      (res.cornerPoints[0].x - res.cornerPoints[1].x) ** 2 +
        (res.cornerPoints[0].y - res.cornerPoints[1].y) ** 2
    ),
    Math.sqrt(
      (res.cornerPoints[0].x - res.cornerPoints[3].x) ** 2 +
        (res.cornerPoints[0].y - res.cornerPoints[3].y) ** 2
    )
  );
};

export const orient = (res: BarCodeScanningResult) => {
  // Calculate the angles of all the lines
  const angles = res.cornerPoints.map((pt1, i) => {
    const index = i === 3 ? 0 : i + 1;
    const pt2 = res.cornerPoints[index];

    const rawAngle = Math.atan2(pt1.y - pt2.y, pt1.x - pt2.x);

    const currentAngle = rawAngle < 0 ? rawAngle + Math.PI * 2 : rawAngle;

    return rawAngle;
  });
  console.log(angles);

  // Find the angle that is closes to horizontal or vertical
  const flatestAngle = angles.reduce(
    (min, a) => (Math.abs(a) < Math.abs(min) ? a : min),
    100
  );

  console.log(flatestAngle);

  return flatestAngle;
};

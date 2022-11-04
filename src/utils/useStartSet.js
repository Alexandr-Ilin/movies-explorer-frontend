export default function useStartSet(widthScreen) {
  const startSet = {};
  if (widthScreen >= 1280) {
    startSet.start = 12;
    startSet.step = 4;
    return startSet;
  }
  if (widthScreen < 1280 && widthScreen > 929) {
    startSet.start = 9;
    startSet.step = 3;
    return startSet;
  }
  if (widthScreen < 930 && widthScreen > 639) {
    startSet.start = 8;
    startSet.step = 2;
    return startSet;
  }
  startSet.start = 5;
  startSet.step = 5;
  return startSet;
}

import {
  DEVISE_WIDE,
  DEVISE_NO_VERY_WIDE,
  DEVISE_NOT_WIDE,
  START_WIDE,
  START_WIDE_STEP,
  START_NO_VERY_WIDE,
  START_NO_VERY_WIDE_STEP,
  START_NOT_VERY_SMALL_WIDTH,
  START_NOT_VERY_SMALL_WIDTH_STEP,
  START_SMALL_WIDTH,
} from './consts';

export default function useStartSet(widthScreen) {
  const startSet = {};
  if (widthScreen >= DEVISE_WIDE) {
    startSet.start = START_WIDE;
    startSet.step = START_WIDE_STEP;
    return startSet;
  }
  if (widthScreen < DEVISE_WIDE && widthScreen > DEVISE_NO_VERY_WIDE) {
    startSet.start = START_NO_VERY_WIDE;
    startSet.step = START_NO_VERY_WIDE_STEP;
    return startSet;
  }
  if (widthScreen <= DEVISE_NO_VERY_WIDE && widthScreen > DEVISE_NOT_WIDE) {
    startSet.start = START_NOT_VERY_SMALL_WIDTH;
    startSet.step = START_NOT_VERY_SMALL_WIDTH_STEP;
    return startSet;
  }
  startSet.start = START_SMALL_WIDTH;
  startSet.step = START_NOT_VERY_SMALL_WIDTH_STEP;
  return startSet;
}

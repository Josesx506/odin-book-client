import useScreenVisibility from "./useScreenVisibility";

const breakpoints = {
  sm: '(max-width: 639px)',
  md: '(min-width: 640px)',
  lg: '(min-width: 1025px)',
};

export default function useBreakpoint(bp) {
  return useScreenVisibility(breakpoints[bp]);
}

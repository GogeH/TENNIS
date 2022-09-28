/* eslint-disable @typescript-eslint/no-explicit-any */
import type { StateWithUIState } from 'types';

export default {
  getUI: (state: StateWithUIState): any => state.ui,
  getProp:
    (propKey: string) =>
    (state: StateWithUIState): any =>
      state.ui[propKey],
};

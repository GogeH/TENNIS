import type { State, UserState } from 'types';

export default {
  getUser: (state: State): UserState => state.user,
  getProp:
    <T extends keyof UserState>(propKey: T) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (state: State): any =>
      state.user[propKey],
};

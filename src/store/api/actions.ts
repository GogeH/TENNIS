export const request = <T = string, P = never>(
  defaultType: T,
  payload?: P,
): { type: string; payload: P | undefined } => ({
  type: `${defaultType}_REQUEST`,
  payload,
});

export const success = <T = string, P = never>(
  defaultType: T,
  payload?: P,
): { type: string; payload: P | undefined } => ({
  type: `${defaultType}_SUCCESS`,
  payload,
});

export const error = <T = string, E = never>(
  defaultType: T,
  err?: E,
): { type: string; payload: E | undefined; err: E | undefined } => ({
  type: `${defaultType}_ERROR`,
  payload: err,
  err,
});

export const reset = <T = string>(defaultType: T): { type: string } => ({
  type: `${defaultType}_RESET`,
});

export default {
  request,
  success,
  error,
  reset,
};

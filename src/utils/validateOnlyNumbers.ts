export const validateOnlyNumbers = (value: string): boolean => {
  return !(!value.match(/^\d+(\.)?(\d{1,18})?$|^$/) || value === '00');
};

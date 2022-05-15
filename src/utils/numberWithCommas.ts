export const getNumberWithSeparator = (x: number, separator = " ") =>
  x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, separator);

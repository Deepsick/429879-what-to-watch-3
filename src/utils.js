export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const isEmptyObject = (object) => {
  return !Object.keys(object).length;
};

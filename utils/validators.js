const stationIdValidator = (v) => {
  const types = ['node', 'way'];
  const [type, id] = v.split('/');
  if (!types.includes(type)) return false;
  return /^\d*$/.test(id);
};

const priceValidator = (v) => {
  return /^((\d{1,3}[.])\d{1,3})$/.test(v);
};

const addDecimals = (price) => {
  if (priceValidator(price)) {
    const dec = price.split('.')[1];
    const len = dec.length > 3 ? dec.length : 3;
    return Number(price).toFixed(len).toString();
  }
};

export {
  stationIdValidator,
  priceValidator,
  addDecimals,
};
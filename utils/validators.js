import {UserInputError} from 'apollo-server-express';

const stationIdValidator = (v) => {
  const types = ['node', 'way'];
  const [type, id] = v.split('/');
  if (!types.includes(type)) return false;
  return /^\d*$/.test(id);
};

const priceValidator = (v) => {
  return /^((\d{1,3}[.])\d{1,3})$/.test(v);
};

const passwordValidator = (v) => {
  return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(v);
};

const addDecimals = (price) => {
  if (priceValidator(price)) {
    const dec = price.split('.')[1];
    const len = dec.length > 3 ? dec.length : 3;
    return Number(price).toFixed(len).toString();
  }
  throw new UserInputError("Invalid price")
};

export {
  stationIdValidator,
  priceValidator,
  addDecimals,
  passwordValidator,
};
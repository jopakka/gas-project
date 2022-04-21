import {priceValidator, stationIdValidator} from './validators';

const stationID = {
  type: String,
  required: true,
  validate: {
    validator: stationIdValidator,
    message: props => `${props.value} is not a station ID!`,
  },
};

const price = {
  type: String,
  required: true,
  validate: {
    validator: priceValidator,
    message: props => `${props.value} is not a valid price!`,
  },
};

export {
  stationID,
  price,
};
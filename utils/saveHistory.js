import History from '../models/historyModel';

const saveHistory = async (stationID, user, price, saved, type) => {
  const history = new History({
    stationID,
    userID: user._id,
    price,
    updatedAt: saved.updatedAt,
    type,
  });
  return await history.save();
};

export default saveHistory;
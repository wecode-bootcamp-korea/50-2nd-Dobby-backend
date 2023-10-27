const subscriptionDao = require('../models/subscriptionDao');
const jwt = require('jsonwebtoken');

const throwError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  throw error;
};

const getSubscription = async (headers, query) => {
  if (!headers.authorization) {
    throwError('로그인해 주세요', 401);
  }

  const token = headers.authorization.split(' ')[1];
  
  let decoded;
  
  try {
    decoded = jwt.verify(token, process.env.SECRET_KEY);
  } catch (err) {
    throwError('Invalid Token', 401);
  }
  
  const userId = decoded.id;
  const subName = query.dobbyBox;
  
  const user = await subscriptionDao.findUserById(userId);
  if (!user) {
    throwError('UNAUTHORIZED', 401);
  }

  const existingSubscription = await subscriptionDao.findSubscriptionByName(subName);
  if (!existingSubscription) {
    throwError('해당 구독은 이용하실 수 없습니다.', 400);
  }

  return { redirectUrl: `http://127.0.0.1:8000/payment?dobbyBox=${subName}` };
};

module.exports = { getSubscription };
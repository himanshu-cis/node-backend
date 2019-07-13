const { NotAcceptable } = require('rest-api-errors');
const { sendCreated, sendNotFound } = require('../../middleware/requests-helpers');

const create = (models) => async (req, res, next) => {
  const { params: { collection } } = req;
  if (typeof models[collection] === 'function') {
    try {
      const product = new models[collection](req.body);
      await product.save();
      return sendCreated(res, { product });
    } catch (error) {
      next(error);
    }
  } else {
    sendNotFound(res);
  }
};

module.exports = { create };

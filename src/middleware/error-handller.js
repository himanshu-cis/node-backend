const { APIError, InternalServerError } = require('rest-api-errors');
const { STATUS_CODES } = require('http');
//const logger = require('../../logger');

// eslint-disable-next-line
const errorHandler = (err, req, res, next) => {
  const error = (err.status === 401 ||
    err instanceof APIError) ? err : new InternalServerError();

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line
    console.log('-----> Unknown server error...');
    // todo: comment here for production
    // eslint-disable-next-line
    console.log(err);
  }


  if (err.name === 'ValidationError') {
    return res.status(405).json({ success: false, message: err });
  }

  if (err.name === 'CastError' && err.path === '_id') {
    return res.status(422).json({ success: false, message: 'Invalid ObjectID.' });
  }

  //logger.info('API error', { error: err });
  return res
    .status(error.status || 500)
    .json({
      success: false,
      code: error.code || 500,
      message: error.message || STATUS_CODES[error.status],
    });
};

module.exports = { errorHandler };
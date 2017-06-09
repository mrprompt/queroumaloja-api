module.exports = (error, response, data, next) => {
  if (error) {
    response.status(500).json({
      object: 'error',
      data: error.message,
      itemCount: 0,
      pageCount: 0
    });

    return;
  }

  next(data);
};

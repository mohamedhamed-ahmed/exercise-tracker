const interceptor = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

const errorHandler = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ message: 'Something went wrong!' });
};

export { interceptor, errorHandler };

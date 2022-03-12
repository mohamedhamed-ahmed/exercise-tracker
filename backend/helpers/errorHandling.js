const use = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

const errorHandlingMidleware = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ message: 'Something went wrong!' });
};

export { use, errorHandlingMidleware };

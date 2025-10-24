const { ValidationError } = require('../errors/CustomErrors');

exports.validateProduct = (req, res, next) => {
  const { name, description, price, category, inStock } = req.body;
  const errors = [];

  if (!name || typeof name !== 'string') errors.push('name is required and must be a string');
  if (!description || typeof description !== 'string') errors.push('description is required and must be a string');
  if (price === undefined || typeof price !== 'number') errors.push('price is required and must be a number');
  if (!category || typeof category !== 'string') errors.push('category is required and must be a string');
  if (inStock === undefined || typeof inStock !== 'boolean') errors.push('inStock is required and must be a boolean');

  if (errors.length) return next(new ValidationError(errors.join('; ')));
  next();
};

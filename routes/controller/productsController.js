const { products } = require('../data/productsData');
const { v4: uuidv4 } = require('uuid');
const { NotFoundError } = require('../errors/CustomErrors');

const clone = (obj) => JSON.parse(JSON.stringify(obj));

exports.listProducts = (req, res, next) => {
  try {
    let results = clone(products);

    if (req.query.q) {
      const q = req.query.q.toLowerCase();
      results = results.filter(p => p.name.toLowerCase().includes(q));
    }

    if (req.query.category) {
      results = results.filter(p => p.category === req.query.category);
    }

    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.max(1, parseInt(req.query.limit) || 10);
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginated = results.slice(start, end);

    res.json({ total: results.length, page, limit, data: paginated });
  } catch (err) {
    next(err);
  }
};

exports.getProductById = (req, res, next) => {
  try {
    const product = products.find(p => p.id === req.params.id);
    if (!product) throw new NotFoundError('Product not found');
    res.json(product);
  } catch (err) {
    next(err);
  }
};

exports.createProduct = (req, res, next) => {
  try {
    const { name, description, price, category, inStock } = req.body;
    const newProduct = { id: uuidv4(), name, description, price, category, inStock };
    products.push(newProduct);
    res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
};

exports.updateProduct = (req, res, next) => {
  try {
    const product = products.find(p => p.id === req.params.id);
    if (!product) throw new NotFoundError('Product not found');
    Object.assign(product, req.body);
    res.json(product);
  } catch (err) {
    next(err);
  }
};

exports.deleteProduct = (req, res, next) => {
  try {
    const index = products.findIndex(p => p.id === req.params.id);
    if (index === -1) throw new NotFoundError('Product not found');
    const removed = products.splice(index, 1)[0];
    res.json(removed);
  } catch (err) {
    next(err);
  }
};

exports.categoryStats = (req, res, next) => {
  try {
    const stats = products.reduce((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1;
      return acc;
    }, {});
    res.json(stats);
  } catch (err) {
    next(err);
  }
};

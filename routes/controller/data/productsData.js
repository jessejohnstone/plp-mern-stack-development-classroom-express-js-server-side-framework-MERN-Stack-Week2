const { v4: uuidv4 } = require('uuid');

const products = [
  { id: uuidv4(), name: 'Apple', description: 'Fresh red apple', price: 0.5, category: 'fruit', inStock: true },
  { id: uuidv4(), name: 'Banana', description: 'Ripe banana', price: 0.3, category: 'fruit', inStock: true },
  { id: uuidv4(), name: 'Carrot', description: 'Organic carrot', price: 0.2, category: 'vegetable', inStock: false }
];

module.exports = { products };

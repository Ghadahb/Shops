const Product = require("../../db/models/Product");


exports.fetchProduct = async (productId, next) => {
  try {
    const product = await Product.findById(productId);
    return product;
  } catch (error) {
    next(error);
  }
};

exports.productCreate = async (req, res, next) => {
  try {
    req.body.image = `http://localhost:8000/${req.file.path}`;
    const newProduct = await Product.create(req.body);
    return res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

exports.productListFetch = async (req, res, next) => {
  try {
    const products = await Product.find();
    return res.json(products);
  } catch (error) {
    next(error);
  }
};

exports.getShops = async (req, res, next) => {
  try {
    const shops = await Shop.find();
    return res.json(shops);
  } catch (error) {
  return res.status(500).json({ message: error.message });
  }
};

exports.productDetailFetch = async (req, res, next) =>
  res.status(200).json(req.product);


exports.shopCreate = async (req, res, next) => {
  try {
    const newShop = await Shop.create(req.body);
    return res.status(201).json(newShop);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.productUpdate = async (req, res, next) => {
  try {
    req.body.image = `http://localhost:8000/${req.file.path}`;
    const product = await Product.findByIdAndUpdate(
      req.product,
      req.body,
      { new: true, runValidators: true } // returns the updated product
    );
    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

exports.productDelete = async (req, res, next) => {
  try {
    await req.product.remove();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

// Create
// Status: 201
// Content: newly created item

// Retrieve (List && Detail)
// Status: 200
// Content: Requested data

// Update
// Status: 200
// Content: updated item

// Delete
// Status: 204
// Content: No Content

const Product = require("./model");
const Category = require('./../category/model');
const { productValidate } = require("./productschema");
const errorCreate = require("http-errors");
const {generateProductId} = require('./utility');

const addProduct = async (req, res, next) => {
  try {
    const result = await productValidate.validateAsync(req.body);
    const isExist = await Product.findOne({productName:result.productName});
    if (isExist)
     throw errorCreate.BadRequest(`${result.productName} is already exist`);
     result.productId = await generateProductId();
     result.isActive = 1;
     const category = await Category.findOne({categoryName:result.categoryId,isActive:1});
      if(!category) throw errorCreate.Unauthorized();
      result.categoryName = category.categoryName;
    const product = new Product(result);
    const productAdd = await product.save();
    res.send(productAdd);
  } catch (error) {
    if (error.isJoi == true) error.status = 422;
    next(error);
  }
};

const getAllProduct = async (req, res, next) => {
  try {
    let products;
    const productCount = await Product.aggregate(
      [
        {
          $match: {
            isActive: 1
          }
        },
        {
          $count: "count"
        }
      ]
    );
  
    if (req.query.page > 1) {
      products = await Product.find({isActive:1}).skip((req.query.page - 1) * req.query.count)
    .limit(Number(req.query.count)).sort({ createdAt: -1 });
    console.log(products);
  } else {
      products = await Product.find({isActive:1}).limit(Number(req.query.count)).sort({ createdAt: -1 });
    }
    res.send({products,productCount});
    
  } catch (error) {
    if (error.isJoi == true) error.status = 422;
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
      const product = await Product.findOne({productId:req.params.id,isActive:1});
      if(!product) throw errorCreate.Unauthorized();
      res.send(product);
  } catch (error) {
      
    if (error.isJoi == true) error.status = 422;
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findOne({productId:req.params.id});
    if(!product) throw errorCreate.BadRequest(`Product with id ${req.params.id} doesn't exist`);
    for (let data in req.query) {
      product[data] = req.query[data];
    }
    const category = await Category.findOne({categoryId:product.categoryId,isActive:1});
      if(!category) throw errorCreate.Unauthorized();
      product.categoryName = category.categoryName;
    await product.save();
    res.send(product);
  } catch (error) {
    if (error.isJoi == true) error.status = 422;
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findOne({productId:req.params.id});
    if(!product) throw errorCreate.Unauthorized();
    product.isActive = 0;
    await product.save();
    res.send(product);
  } catch (error) {
    if (error.isJoi == true) error.status = 422;
    next(error);
  }
};

module.exports = {
  addProduct,
  getAllProduct,
  getById,
  updateProduct,
  deleteProduct
};

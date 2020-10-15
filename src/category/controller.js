const Category = require("./model");
const { categoryValidate } = require("./categoryschema");
const errorCreate = require("http-errors");
const {generateCategoryId} = require('./utility');
const Product = require('./../product/controller');

const addCategory = async (req, res, next) => {
  try {
    const result = await categoryValidate.validateAsync(req.body);
    const isExist = await Category.findOne({categoryName:result.categoryName});
    if (isExist)
     throw errorCreate.BadRequest(`${result.categoryName} is already exist`);
     result.categoryId = await generateCategoryId();
     result.isActive = 1;
    const category = new Category(result);
    const categoryAdd = await category.save();
    res.send(categoryAdd);
  } catch (error) {
    if (error.isJoi == true) error.status = 422;
    next(error);
  }
};

const getAllCategory = async (req, res, next) => {
  try {
    const categories = await Category.find({isActive:1}).sort({createdAt:-1});
    res.send(categories);
  } catch (error) {
    if (error.isJoi == true) error.status = 422;
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
      const category = await Category.findOne({categoryId:req.params.id,isActive:1});
      if(!category) throw errorCreate.Unauthorized();
      res.send(category);
  } catch (error) {
      
    if (error.isJoi == true) error.status = 422;
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findOne({categoryId:req.params.id});
    if(!category) throw errorCreate.Unauthorized();
    for (let data in req.query) {
      category[data] = req.query[data];
    }
    await category.save();
        res.send(category);
  } catch (error) {
    if (error.isJoi == true) error.status = 422;
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findOne({categoryId:req.params.id});
    if(!category) throw errorCreate.Unauthorized();
    category.isActive = 0;
    await category.save();
    
    res.send(category);
  } catch (error) {
    if (error.isJoi == true) error.status = 422;
    next(error);
  }
};

module.exports = {
  addCategory,
  getAllCategory,
  getById,
  updateCategory,
  deleteCategory,
};

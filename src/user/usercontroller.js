const User = require("./model");
const errorCreate = require("http-errors");
const { userValidate } = require("./userschema");
const auth = require("./../authentication/auth");
const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await userValidate.validateAsync(req.body);
    const isExist = await User.findOne({ email: result.email });
    if (isExist)
      throw errorCreate.Conflict(`User with ${email} alrady registered`);

    const user = new User(result);
    const addUser = await user.save();
    const token = await auth.sign(addUser._id);
    res.send({addUser, token});
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await userValidate.validateAsync(req.body);
    const user = await User.findOne({ email: result.email });
    if (!user) throw errorCreate.Conflict(`User with ${email} not registered`);

    const checkPassword = await user.isValidPassword(result.password);
    if (!checkPassword) throw errorCreate.BadRequest(`Wrong Password`);

    const token = await auth.sign(user._id);
    res.send({result,token});
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
};

module.exports = {
  signup,
  login
};

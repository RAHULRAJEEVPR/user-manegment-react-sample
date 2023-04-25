const User = require("../model/authModel");
const AdminModel = require("../model/AdminModel");
const jwt = require("jsonwebtoken");
const async = require("hbs/lib/async");
const fs = require("fs");
const path = require("path");

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "secretkey", {
    expiresIn: maxAge,
  });
};

const handleErrors = (err) => {
  let errors = { email: "", password: "" };

  console.log(err);
  if (err.message === "incorrect email") {
    errors.email = "That email is not registered";
  }

  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }

  if (err.code === 11000) {
    errors.email = "Email is already registered";
    return errors;
  }

  if (err.message.includes("Users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

module.exports.register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.create({ email, password });
    const token = createToken(user._id);

    res.cookie("jwt", token, {
      withCredentials: true,
      httpOnly: false,
      maxAge: maxAge * 1000,
    });

    res.status(201).json({ user: user._id, created: true });
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.json({ errors, created: false });
  }
};

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000 });
    res.status(200).json({
      user: user._id,
      status: true,
      email: user.email,
      imageUrl: user.image,
    });
  } catch (err) {
    const errors = handleErrors(err);
    res.json({ errors, status: false });
  }
};

module.exports.updateImage =async(req,res,next)=>{
try {
  const userId =req.body.userId;
  const imageUrl = req.file.filename;
  const alreadyImage = await User.findOne({ _id: userId });

  if (alreadyImage.image !== undefined) {
    fs.unlink(
      path.join(__dirname, "../../public/public/images/", alreadyImage.image),
      (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("image deleted");
        }
      }
    );
  }
  
  const image = await User.updateOne(
    { _id: userId },
    { $set: { image: imageUrl } }
  ).then((res) => {
    console.log(res);
  });
  // console.log(image)
  res.status(201).json({ updated: true, imageUrl: imageUrl });


} catch (error) {
  console.log(error);
  const errors = handleErrors(error);
  res.json({ errors, created: false });
}
}

//      ------admin----------

module.exports.adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const admin = await AdminModel.findOne({ email: email });
    if (admin === null) {
      console.log("email wrong");
      res.json({ created: false, message: "Incorrect email" });
    } else {
      console.log(admin);
      if (admin.password === password) {
        const token = createToken(admin._id);
        res.cookie("adminjwt", token, {
          withCredentials: true,
          httpOnly: false,
          maxAge: maxAge * 1000,
        });

        res.status(200).json({ created: true, adminId: admin._id });
      } else {
        console.log("Password is wrong");
        res.json({ created: false, message: "incorrect Password" });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const allUser = await User.find({});
    // console.log(allUser)
    res.status(200).json({ data: allUser });
  } catch (error) {
    console.log(error);
  }
};

module.exports.deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    await User.deleteOne({ _id: userId }).then(() => {
      res.status(200).json({ deleted: true });
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.EditUser = async (req, res, next) => {
  try {
    const { userId, userEmail } = req.body;
    await User.updateOne({ _id: userId }, { $set: { email: userEmail } });
    res.status(201).json({ update: true });
  } catch (error) {
    console.log(error)
  }
};

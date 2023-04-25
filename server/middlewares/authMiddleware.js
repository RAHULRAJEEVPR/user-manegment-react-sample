const User = require("../model/authModel");
const Admin = require("../model/AdminModel")
const jwt = require("jsonwebtoken");

module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(
      token,
      "secretkey",
      async (err, decodedToken) => {
        if (err) {
          res.json({ status: false });
          next();
        } else {
          const user = await User.findById(decodedToken.id);
          if (user) res.json({ status: true, user: user.email });
          else res.json({ status: false });
          next();
        }
      }
    );
  } else {
    res.json({ status: false });
    next();
  }
};

module.exports.checkAdmin = (req, res, next) => {
  const token = req.cookies.adminjwt
  if(token){
      jwt.verify(token, "secret key", async (err, decodedToken) => {
          if (err) {
              res.json({ status: false })
              next()
          } else {
              const admin = await Admin.findById(decodedToken.id)
              if(admin) res.json({status: true, admin:admin._id })
              else res.json({status: false})
              next()
          }
      })
  }else{
      res.json({status: false})
      next()
  }
}

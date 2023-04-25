const {
  register,
  login,
  adminLogin,
  updateImage,
  getAllUsers,
  deleteUser,
  EditUser,
} = require("../controllers/authControllers");
const { checkUser, checkAdmin } = require("../middlewares/authMiddleware");

const router = require("express").Router();
const upload = require("../middlewares/multer");

router.post("/", checkUser);
router.post("/register", register);
router.post("/login", login);
router.post("/profile", upload.single("image"), updateImage);

//----------admin--------------
router.post("/admin/login", adminLogin);
router.post("/admin", checkAdmin);
router.get("/getallusers", getAllUsers);
router.post("/admin/adduser", register);
router.post("/admin/delete-user/:id", deleteUser);
router.post("/admin/edit-user", EditUser);

module.exports = router;

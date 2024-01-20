const router = require("express").Router();
const userController=require('../controllers/users/controller')
const {Authorization}=require('../middlewares/jwt')

router.post("/register",userController.register);
router.post("/forget-password",userController.forgetPassword);
router.post("/reset-password",userController.resetPassword);
router.post("/login", userController.login);
router.get("/search",Authorization,userController.search);

module.exports = router;

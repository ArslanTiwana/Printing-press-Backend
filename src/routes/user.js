const router = require("express").Router();
const userController=require('../controllers/users/controller')
const {Authorization}=require('../middlewares/jwt')

router.post("/register",userController.register);
router.post("/forgetpassword",userController.forgetPassword);
router.put("/update/:id",userController.update);
router.get("/get",userController.getAll);
router.delete("/delete/:id",userController.delete);
router.get("/get/:id",userController.getById);
router.post("/resetpassword",userController.resetPassword);
router.post("/login", userController.login);
router.get("/search",Authorization,userController.search);

module.exports = router;

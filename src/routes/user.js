const router = require("express").Router();
const userController=require('../controllers/users/controller')
const {Authorization}=require('../middlewares/jwt')

router.post("/register",userController.register);
router.post("/change_password",Authorization,userController.changePassword);
router.put("/update/:id",Authorization,userController.update);
router.get("/resetPassword/:id",userController.resetPassword);
router.get("/get",Authorization,userController.getAll);
router.delete("/delete/:id",Authorization,userController.delete);
router.get("/get/:id",Authorization,userController.getById);
router.post("/login", userController.login);

module.exports = router;

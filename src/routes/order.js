const router = require("express").Router();
const OrderController=require('../controllers/order/controller')
const {Authorization}=require('../middlewares/jwt')

router.post("/create",Authorization,OrderController.create);
router.get("/get",Authorization,OrderController.getAll);
router.get("/get/:id",Authorization,OrderController.getById);
router.get("/get/client/:id",Authorization,OrderController.getByClient);
router.delete("/delete/:id",Authorization,OrderController.delete);

module.exports = router;

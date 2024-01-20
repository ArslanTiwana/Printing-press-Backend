const router = require("express").Router();
const OrderController=require('../controllers/order/controller')
const {Authorization}=require('../middlewares/jwt')

router.post("/create",Authorization,OrderController.create);


module.exports = router;

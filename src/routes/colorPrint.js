const router = require("express").Router();
const ColorPrintController=require('../controllers/colorPrint/controller')
const {Authorization}=require('../middlewares/jwt')

router.post("/create",Authorization,ColorPrintController.create);
router.get("/get",Authorization,ColorPrintController.getAll);
router.get("/get/:id",Authorization,ColorPrintController.getById);


module.exports = router;

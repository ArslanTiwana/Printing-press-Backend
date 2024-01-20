const router = require("express").Router();
const OffsetController=require('../controllers/offset/controller')
const {Authorization}=require('../middlewares/jwt')

router.get("/get",Authorization,OffsetController.getAll);
router.get("/get/:id",Authorization,OffsetController.getById);


module.exports = router;

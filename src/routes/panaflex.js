const router = require("express").Router();
const PanaflexController=require('../controllers/panaflex/controller')
const {Authorization}=require('../middlewares/jwt')

router.get("/get",Authorization,PanaflexController.getAll);
router.get("/get/:id",Authorization,PanaflexController.getById);


module.exports = router;

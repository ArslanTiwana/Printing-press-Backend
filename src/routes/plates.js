const router = require("express").Router();
const PlatesController=require('../controllers/plates/controller')
const {Authorization}=require('../middlewares/jwt')

router.get("/get",Authorization,PlatesController.getAll);
router.get("/get/:id",Authorization,PlatesController.getById);


module.exports = router;

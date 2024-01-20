const router = require("express").Router();
const WeddingCardController=require('../controllers/weddingCard/controller')
const {Authorization}=require('../middlewares/jwt')

router.get("/get",Authorization,WeddingCardController.getAll);
router.get("/get/:id",Authorization,WeddingCardController.getById);


module.exports = router;

const router = require("express").Router();
const WeddingCardController=require('../controllers/weddingCard/controller')
const {Authorization}=require('../middlewares/jwt')

router.get("/get",Authorization,WeddingCardController.getAll);
router.get("/get/:id",Authorization,WeddingCardController.getById);
router.post("/create",Authorization,WeddingCardController.create);
router.put("/update/:id",Authorization,WeddingCardController.update);
router.delete("/:id",Authorization,WeddingCardController.delete);

module.exports = router;

const router = require("express").Router();
const WeddingCardController=require('../controllers/weddingCard/controller')
const {Authorization}=require('../middlewares/jwt')

router.get("/get",Authorization,WeddingCardController.getAll);
router.get("/get/:id",Authorization,WeddingCardController.getById);
router.post("/create",Authorization,WeddingCardController.create);
router.put("/update/:id",Authorization,WeddingCardController.update);
router.delete("/delete/:id",Authorization,WeddingCardController.delete);
router.get("/get_pending",Authorization,WeddingCardController.getAllPending);
router.get("/proceed/:id",Authorization,WeddingCardController.statusChange);
router.get("/get_all",Authorization,WeddingCardController.getAllForScrumBoard);
router.put("/update_scrumboard/:id",Authorization,WeddingCardController.updateScrumboard);
module.exports = router;

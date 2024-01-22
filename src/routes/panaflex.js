const router = require("express").Router();
const PanaflexController=require('../controllers/panaflex/controller')
const {Authorization}=require('../middlewares/jwt')

router.get("/get",Authorization,PanaflexController.getAll);
router.get("/get/:id",Authorization,PanaflexController.getById);
router.post("/create",Authorization,PanaflexController.create);
router.put("/update/:id",Authorization,PanaflexController.update);
router.delete("/delete/:id",Authorization,PanaflexController.delete);

module.exports = router;

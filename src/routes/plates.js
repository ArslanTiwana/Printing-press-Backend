const router = require("express").Router();
const PlatesController=require('../controllers/plates/controller')
const {Authorization}=require('../middlewares/jwt')

router.get("/get",Authorization,PlatesController.getAll);
router.get("/get/:id",Authorization,PlatesController.getById);
router.post("/create",Authorization,PlatesController.create);
router.put("/update/:id",Authorization,PlatesController.update);
router.delete("/:id",Authorization,PlatesController.delete);


module.exports = router;

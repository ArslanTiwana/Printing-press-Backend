const router = require("express").Router();
const OffsetController=require('../controllers/offset/controller')
const {Authorization}=require('../middlewares/jwt')

router.get("/get",Authorization,OffsetController.getAll);
router.get("/get/:id",Authorization,OffsetController.getById);
router.post("/create",Authorization,OffsetController.create);
router.put("/update/:id",Authorization,OffsetController.update);
router.delete("/:id",Authorization,OffsetController.delete);

module.exports = router;

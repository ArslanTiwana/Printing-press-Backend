const router = require("express").Router();
const OffsetController=require('../controllers/offset/controller')
const {Authorization}=require('../middlewares/jwt')

router.get("/get",Authorization,OffsetController.getAll);
router.get("/get/:id",Authorization,OffsetController.getById);
router.post("/create",Authorization,OffsetController.create);
router.put("/update/:id",Authorization,OffsetController.update);
router.delete("/delete/:id",Authorization,OffsetController.delete);
router.get("/get_pending",Authorization,OffsetController.getAllPending);
router.get("/proceed/:id",Authorization,OffsetController.statusChange);
router.get("/get_all",Authorization,OffsetController.getAllForScrumBoard);
router.put("/update_scrumboard/:id",Authorization,OffsetController.updateScrumboard);
module.exports = router;

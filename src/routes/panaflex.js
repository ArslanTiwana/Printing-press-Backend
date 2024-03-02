const router = require("express").Router();
const PanaflexController=require('../controllers/panaflex/controller')
const {Authorization}=require('../middlewares/jwt')

router.get("/get",Authorization,PanaflexController.getAll);
router.get("/get/:id",Authorization,PanaflexController.getById);
router.post("/create",Authorization,PanaflexController.create);
router.put("/update/:id",Authorization,PanaflexController.update);
router.delete("/delete/:id",Authorization,PanaflexController.delete);
router.get("/get_pending",Authorization,PanaflexController.getAllPending);
router.get("/proceed/:id",Authorization,PanaflexController.statusChange);
router.get("/get_all",Authorization,PanaflexController.getAllForScrumBoard);
router.put("/update_scrumboard/:id",Authorization,PanaflexController.updateScrumboard);

module.exports = router;

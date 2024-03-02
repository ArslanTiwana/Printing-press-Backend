const router = require("express").Router();
const OtherJobController=require('../controllers/otherJob/controller')
const {Authorization}=require('../middlewares/jwt')

router.get("/get",Authorization,OtherJobController.getAll);
router.get("/get_all",Authorization,OtherJobController.getAllForScrumBoard);
router.get("/get/:id",Authorization,OtherJobController.getById);
router.post("/create",Authorization,OtherJobController.create);
router.put("/update/:id",Authorization,OtherJobController.update);
router.delete("/delete/:id",Authorization,OtherJobController.delete);
router.put("/update_scrumboard/:id",Authorization,OtherJobController.updateScrumboard);
router.get("/get_pending",Authorization,OtherJobController.getAllPending);
router.get("/proceed/:id",Authorization,OtherJobController.statusChange);
router.get("/get_all",Authorization,OtherJobController.getAllForScrumBoard);
router.put("/update_scrumboard/:id",Authorization,OtherJobController.updateScrumboard);

module.exports = router;

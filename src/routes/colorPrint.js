const router = require("express").Router();
const ColorPrintController=require('../controllers/colorPrint/controller')
const {Authorization}=require('../middlewares/jwt')

router.post("/create",Authorization,ColorPrintController.create);
router.put("/update/:id",Authorization,ColorPrintController.update);
router.delete("/delete/:id",Authorization,ColorPrintController.delete);
router.get("/get",Authorization,ColorPrintController.getAll);
router.get("/get/:id",Authorization,ColorPrintController.getById);
router.get("/get_pending",Authorization,ColorPrintController.getAllPending);
router.get("/proceed/:id",Authorization,ColorPrintController.statusChange);
router.get("/get_all",Authorization,ColorPrintController.getAllForScrumBoard);
router.put("/update_scrumboard/:id",Authorization,ColorPrintController.updateScrumboard);

module.exports = router;

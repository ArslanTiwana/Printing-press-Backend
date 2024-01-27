const router = require("express").Router();
const PlatesController=require('../controllers/plates/controller')
const {Authorization}=require('../middlewares/jwt')

router.get("/get",Authorization,PlatesController.getAll);
router.get("/get_all",Authorization,PlatesController.getAllForScrumBoard);
router.get("/get/:id",Authorization,PlatesController.getById);
router.post("/create",Authorization,PlatesController.create);
router.put("/update/:id",Authorization,PlatesController.update);
router.delete("/delete/:id",Authorization,PlatesController.delete);
router.put("/update_scrumboard/:id",Authorization,PlatesController.updateScrumboard);


module.exports = router;

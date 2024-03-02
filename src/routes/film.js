const router = require("express").Router();
const FilmController=require('../controllers/film/controller')
const {Authorization}=require('../middlewares/jwt')

router.get("/get",Authorization,FilmController.getAll);
router.get("/get/:id",Authorization,FilmController.getById);
router.post("/create",Authorization,FilmController.create);
router.put("/update/:id",Authorization,FilmController.update);
router.delete("/delete/:id",Authorization,FilmController.delete);
router.get("/get_pending",Authorization,FilmController.getAllPending);
router.get("/proceed/:id",Authorization,FilmController.statusChange);
router.get("/get_all",Authorization,FilmController.getAllForScrumBoard);
router.put("/update_scrumboard/:id",Authorization,FilmController.updateScrumboard);
module.exports = router;

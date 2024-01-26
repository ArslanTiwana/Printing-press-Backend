const router = require("express").Router();

router.use("/user", require("./user"));
router.use("/client", require("./client"));
router.use("/colorprint", require("./colorPrint"));
router.use("/film", require("./film"));
router.use("/offset", require("./offset"));
router.use("/order", require("./order"));
router.use("/panaflex", require("./panaflex"));
router.use("/plates", require("./plates"));
router.use("/weddingcard", require("./weddingCard"));
router.use("/invoice", require("./invoice"));

module.exports = router;

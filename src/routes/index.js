const router = require("express").Router();

router.use("/user", require("./user"));
router.use("/client", require("./client"));
router.use("/color_print", require("./colorPrint"));
router.use("/film", require("./film"));
router.use("/offset", require("./offset"));
router.use("/order", require("./order"));
router.use("/panaflex", require("./panaflex"));
router.use("/plates", require("./plates"));
router.use("/wedding_card", require("./weddingCard"));

module.exports = router;

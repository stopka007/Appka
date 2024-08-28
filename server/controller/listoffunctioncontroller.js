const express = require("express");
const router = express.Router();
const mathFunctions  = require("../abl/listoffunctionsAbl");

router.get("/" , (req, res) => {
    mathFunctions(req, res);
  });


module.exports = router; 
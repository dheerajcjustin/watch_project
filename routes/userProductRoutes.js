const express = require("express");
const router = express.Router();
const productFilter=require("../controllers/productSortAndFilter");

router.post("/filter",productFilter.filter);
router.post("/filter/gender",productFilter.genderFilter)







module.exports = router;


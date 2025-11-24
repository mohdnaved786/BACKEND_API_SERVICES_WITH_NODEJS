const express = require("express");
const router = express.Router();
const {
  createDummyUsers,
  getAllDummyUsers,
} = require("../controllers/duserController");

router.post("/create", createDummyUsers);
router.get("/getAllDummyUsers", getAllDummyUsers);

module.exports = router;

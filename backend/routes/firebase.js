const express = require("express");
const multer = require("multer");
const router = express.Router();
const { uploadFile, getFile} = require("../controllers/firebase.controller");
const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload", upload.single("filename"), uploadFile);
router.get("/:type/:filename", getFile);

module.exports = router;


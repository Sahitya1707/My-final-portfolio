const express = require("express");
const formSubmission = require("../../controllers/contact/formSubmission");
const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.post("/send", formSubmission);

module.exports = router;

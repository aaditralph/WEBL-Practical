const express = require("express");
const router = express.Router();
const User = require("../models/user");

// CREATE
router.post("/", async (req, res) => {
  const user = new User(req.body);
  const data = await user.save();
  res.json(data);
});

// READ ALL
router.get("/", async (req, res) => {
  const data = await User.find();
  res.json(data);
});

// READ ONE
router.get("/:id", async (req, res) => {
  const data = await User.findById(req.params.id);
  res.json(data);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const data = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(data);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
});
module.exports = router;

const Order = require("../models/Order");
const Pet = require("../models/Pet");

const router = require("express").Router();

router.post("/", async (req, res) => {
  try {
    const { name, category, breed, age, gender, price, isAvailable } = req.body;

    const pet = new Pet({
      name,
      category,
      breed,
      age,
      gender,
      price,
      isAvailable: isAvailable !== undefined ? isAvailable : true,
    });

    await pet.save();

    res.status(201).json({ message: "Pet created successfully", pet });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    res.json(pet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!pet) {
      return res.status(404).json({ error: "Pet not found" });
    }
    res.json({ message: "Pet updated successfully", pet });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const pet = await Pet.findByIdAndDelete(req.params.id);
    if (!pet) {
      return res.status(404).json({ error: "Pet not found" });
    }
    res.json({ message: "Pet deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;

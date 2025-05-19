const Order = require("../models/Order");
const Pet = require("../models/Pet");

const router = require("express").Router();

router.post("/", async (req, res) => {
  try {
    const { customerName, customerEmail, pets } = req.body;

    let totalAmount = 0;

    for (const item of pets) {
      const pet = await Pet.findById(item.petId);
      if (!pet) {
        return res
          .status(404)
          .json({ error: `Pet with id ${item.petId} not found.` });
      }
      totalAmount += pet.price * item.quantity;
    }

    const order = new Order({
      customerName,
      customerEmail,
      pets,
      totalAmount,
      orderStatus: "Pending",
      paymentStatus: "Pending",
    });

    await order.save();

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json({ message: "Order updated successfully", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
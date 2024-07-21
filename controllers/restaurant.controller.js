const Restaurant = require("../models/restaurant.model");

// Create and save a new Restaurant
exports.create = async (req, res) => {
  const { name, rtype, img } = req.body;

  if (!name || !rtype || !img) {
    return res.status(400).send({ message: "ชื่อ, ประเภท หรือ URL ของภาพไม่สามารถว่างได้!" });
  }

  const restaurant = await Restaurant.findOne({ where: { name: name } });
  if (restaurant) {
    return res.status(400).send({ message: "ร้านอาหารนี้มีอยู่แล้ว!" });
  }

  const newRestaurant = { name, rtype, img };
  try {
    const data = await Restaurant.create(newRestaurant);
    res.send(data);
  } catch (error) {
    res.status(500).send({ message: error.message || "เกิดข้อผิดพลาดในการสร้างร้านอาหาร" });
  }
};

exports.getAll = async (req, res) => {
  try {
    const data = await Restaurant.findAll();
    res.send(data);
  } catch (error) {
    res.status(500).send({ message: error.message || "เกิดข้อผิดพลาดบางอย่าง" });
  }
};

exports.getById = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Restaurant.findByPk(id);
    if (!data) {
      return res.status(404).send({ message: "ไม่พบร้านอาหารที่มี id " + id });
    }
    res.send(data);
  } catch (error) {
    res.status(500).send({ message: error.message || "เกิดข้อผิดพลาดบางอย่าง" });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;
  try {
    const num = await Restaurant.update(req.body, { where: { id } });
    if (num[0] === 1) {
      return res.send({ message: "อัปเดตร้านอาหารสำเร็จ" });
    }
    res.status(404).send({ message: "ไม่สามารถอัปเดตร้านอาหารที่มี id " + id });
  } catch (error) {
    res.status(500).send({ message: error.message || "เกิดข้อผิดพลาดบางอย่าง" });
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const num = await Restaurant.destroy({ where: { id } });
    if (num === 1) {
      return res.send({ message: "ลบร้านอาหารสำเร็จ" });
    }
    res.status(404).send({ message: "ไม่สามารถลบร้านอาหารที่มี id " + id });
  } catch (error) {
    res.status(500).send({ message: error.message || "เกิดข้อผิดพลาดบางอย่าง" });
  }
};

const Restaurant = require("../models/restaurant.model");

//Create and save a new Restaurant
exports.create = async (req, res) => {
  const { name, rtype, img } = req.body;
  //Validate data
  if (!name || !rtype || !img) {
    res.status(400).send({
      message: "Name, Type or ImageUrl can not be empty!",
    });
  }

  await Restaurant.findOne({ where: { name: name } }).then((restaurant) => {
    if (restaurant) {
      res.status(400).send({
        message: " Restaurant already exists! ",
      });
      return;
    }
    // create a restaurant
    const newRestaurant = {
      name: name,
      rtype: rtype,
      img: img,
    };
    Restaurant.create(newRestaurant)
      .then((data) => {
        res.send(data);
      })
      .catch((error) => {
        res.status(500).send({
          message:
            error.message ||
            "Something error occured while creating the restaurant.",
        });
      });
  });
};

exports.getAll = async (req, res) => {
  await Restaurant.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500),
        send({
          message: error.message || "something error",
        });
    });
};
exports.getById = async (req, res) => {
  const id = req.params.id;
  await Restaurant.findByPk(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "No found Restaurant with id" + id });
      } else {
        res.send(data);
      }
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message ||
          "Something error occured while createing the restaurant",
      });
    });
};

exports.update = async (req, res) => {
  const id = req.params.id;
  await Restaurant.update(req.body, {
    where: {
      id: id,
    },
  })
    .then((num) => {
      if (num === 1) {
        res.send({ message: "Restaurant update successfully" });
      } else {
        res.send("can not update restaurant with id " + id);
      }
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message ||
          "Something error occured while createing the restaurant",
      });
    });
};

exports.delete = async (req,res) =>{
        const id = req.param.id;
        await Restaurant.destroy({
          where: { id: id },
        })
          .then((num) => {
            if (num === 1) {
              res.send({ message: "Restaurant update successfully" });
            } else {
              res.send("can not update restaurant with id " + id);
            }
          })
          .catch((error) => {
            res.status(500).send({
              message:
                error.message ||
                "Something error occured while createing the restaurant",
            });
          });  
}
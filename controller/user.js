const userValidator = require("./../validation/user/userValidator");
const userModel = require("./../model/userModel");
const { isValidObjectId, default: mongoose } = require("mongoose");

exports.getAll = async (req, res) => {
  await userModel
    .find({})
    .then((respons) => {
      return res.send(respons);
    })
    .catch((err) => {
      return res.status(500).send("error :", err);
    });
};
exports.get = async (req, res) => {
  if (isValidObjectId(req.params.id)) {
    const id = req.params.id;
    await userModel
      .findById(id)
      .then((respons) => {
        return res.send(respons);
      })
      .catch((err) => {
        return res.status(500).send(err);
      });
  } else {
    res.status(422).send({ message: "the id must be in the correct format" });
  }
};
exports.create = async (req, res) => {
  const userValidator_create = userValidator(req.body);
  if (userValidator_create !== true) {
    if (Array.isArray(userValidator_create)) {
      let errorInfo = [];
      userValidator_create.forEach((i) => {
        return errorInfo.push(i.message);
      });
      res.status(422).send(errorInfo);
    }
  } else {
    const { name, lastname, password, email } = req.body;
    await userModel
      .create({ name, lastname, password, email })
      .then(() => {
        return res.status(201).send("this is true");
      })
      .catch((err) => {
        return res.status(500).send(err);
      });
  }
};
exports.update = async (req, res) => {
  if (isValidObjectId(req.params.id)) {
    const userValidator_create = userValidator(req.body);
    console.log(req.params.id);

    if (userValidator_create !== true) {
      if (Array.isArray(userValidator_create)) {
        let errorInfo = [];
        userValidator_create.forEach((i) => {
          return errorInfo.push(i.message);
        });
        return res.status(422).send(errorInfo);
      }
    } else {
      const { name, lastname, password, email } = req.body;
      const objectId = new mongoose.Types.ObjectId(req.params.id);
      await userModel
        .findOneAndUpdate(
          { _id: objectId },
          { name, lastname, password, email },
          { new: true }
        )
        .then((newData) => {
          return res.status(201).send(newData);
        })
        .catch((err) => {
          return res.status(500).send(err);
        });
    }
  } else {
    res.status(422).send({ message: "the id must be in the correct format" });
  }
};
exports.remove = async (req, res) => {
  if (isValidObjectId(req.params.id)) {
    const objectId = new mongoose.Types.ObjectId(req.params.id);
    await userModel
      .deleteOne({ _id: objectId })
      .then((respons) => {
        if (respons.deletedCount === 0) {
          return res.status(404).send({ message: "user not found" });
        } else {
          return res.send(respons);
        }
      })
      .catch((err) => {
        return res.status(500).send(err);
      });
  } else {
    res.status(422).send({ message: "the id must be in the correct format" });
  }
};

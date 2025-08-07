const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  image: String,
    createdAt: {
    type: Date,
    default: Date.now,
  },
});

const clientModel = mongoose.model("client", clientSchema);
module.exports = clientModel;

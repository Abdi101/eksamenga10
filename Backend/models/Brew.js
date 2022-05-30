const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BrewSchema = new Schema({
  coffeeBeanId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "CoffeeBean" 
  },
  grindingSettings: {
    type: Number,
    required: true
  },
  litresOfWater: {
    type: Number,
    required: true
  },
  gramsOfCoffee: {
    type: Number,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Brew", BrewSchema);

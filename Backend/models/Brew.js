const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userVoteSchema = new Schema({
  userId: { 
    type: String, 
    ref: "User" 
  },
});

const BrewSchema = new Schema({
  coffeeBeanId: { 
    type: Number, 
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
  },
  userVotes: [userVoteSchema],
});

module.exports = mongoose.model("Brew", BrewSchema);

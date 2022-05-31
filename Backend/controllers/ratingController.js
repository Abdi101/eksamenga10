const Rating = require("../models/Rating");
const Brew = require("../models/Brew");

module.exports = {

  getAllRatings: async (req, res) => {
    Rating.find({})
      .then((ratings) => {
        if (ratings.length) {
          res.status(200).json(ratings);
        } else {
          res.status(404).json({ message: "Sorry!, ratings not found." });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  },  


  createRating: async (req, res) => {
    const ratingData = new Rating({
      brewId: req.body.brewId,
      userId: req.body.userId,
      rating: req.body.rating
    });

    // check if review already exists
    let rating = await Rating.findOne({ userId: req.body.userId, brewId: req.body.brewId });
    if(rating){
      return res.status(409).json({ error: "rating already exists." });
    }

    else{
      const newRating = new Rating(ratingData);
      newRating.save()
        .then((rating) => {
        console.log("review added");
          res.status(201).json({ newRating });
        })
        .catch((err) => {
          res.status(500).json({ error: 'Failed to add rating, try again.', err });
        });
    }

  },

  editRating: async (req, res) => {
    const ratingId = req.params.id;
    Rating.updateOne({ _id: ratingId }, req.body)
      .then((rating) => {
        res.status(200).json({ message: 'rating updated successfully.', rating });
      })
      .catch((err) => {
        res.status(404).json({ error: `Rating of given ID (${ratingId}) not found` });
      });
  },  

  getMyRatings: async (req, res) => {
    Rating.find({ userId: req.query.userId }).populate('brewId')
      .then((ratings) => {
        if (ratings.length) {
          console.log(ratings);
          res.status(200).json(ratings);
        } else {
          res.status(404).json({ message: "Sorry!, ratings not found." });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }  

  
};
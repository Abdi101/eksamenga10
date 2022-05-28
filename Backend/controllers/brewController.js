const Brew = require("../models/Brew");
const CoffeeBean = require("../models/CoffeeBean");

module.exports = {

  createBrew: async (req, res) => {
    // check if Coffee bean exists in the DB
    CoffeeBean.find({ _id: req.body.coffeeBeanId })
      .then(() => {
        checkIfBrewExists();
      })
      .catch((err) => {
        return res.status(404).json({ error: `Coffee of given ID (${req.body.coffeeBeanId}) not found` });
      });

    // check if coffee bean brew with given grinding setting already exists
    async function checkIfBrewExists() {
      let brew = await Brew.findOne({ grindingSettings: req.body.grindingSettings, coffeeBeanId: req.body.coffeeBeanId });
      if (brew) {
        return res.status(400).json({ error: `Coffee brew of grinding setting (${req.body.grindingSettings}) already exists for this bean.` });
      } else {
        addBrewToDb();
      }
    }
    // add brew to DB
    function addBrewToDb() {
      const newBrew = new Brew(req.body);
      newBrew
        .save()
        .then((brew) => {
          res.status(200).json({ message: 'Brew added successfully', brew });
        })
        .catch((err) => {
          res.status(400).json({ error: err });
        });
    }
  },

  getBrewById: (req, res) => {
    const brewId = req.params.id;
    Brew.find({ _id: brewId })
      .then((brew) => {
        res.status(200).json(brew);
      })
      .catch((err) => {
        res.status(404).json({ error: `Brew of given ID (${brewId}) not found` });
      });
  },

  getAllBrews: (req, res) => {
    Brew.find({})
      .then((brews) => {
        if (brews.length) {
          res.status(200).json(brews);
        } else {
          res.status(404).json({ message: "Sorry!, brews not found." });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  },

  updateBrewById: (req, res) => {
    const brewId = req.params.id;
    Brew.updateOne({ _id: brewId }, req.body)
      .then((brew) => {
        res.status(200).json({ message: 'Brew updated successfully.', brew });
      })
      .catch((err) => {
        res.status(404).json({ error: `Brew of given ID (${brewId}) not found` });
      });
  },

  deleteBrewById: (req, res) => {
    const brewId = req.params.id;
    Brew.deleteOne({ _id: brewId })
      .then((brew) => {
        res.status(200).json({ message: 'Brew deleted successfully', brew });
      })
      .catch((err) => {
        res.status(404).json({ error: `Brew of given ID (${brewId}) not found` });
      });
  },

  queryTopFiveGrindingLevels: (req, res) => {
    const { water, bean } = req.query;
    // Find the bean id
    CoffeeBean.find({ name: bean })
      .then((bean) => {
        let beanId = bean[0]['_id'];
        getBrewArray(beanId);
      })
      .catch((err) => {
        res.status(404).json({ error: `CoffeeBean of name ${bean} not available.` });
      })

    // Get bean array by id and filter by amount of water
    function getBrewArray(beanId) {
      // convert water to a number format
      let amountOfWater = +water;
      Brew.find({ coffeeBeanId: beanId, litresOfWater: amountOfWater }).sort({ userVotes: 'desc' }).limit(5)
        .then((brews) => {
          if (brews.length) {
            getTopGrindingLevels(brews);
          } else {
            res.status(404).json({ message: "Sorry!, brews not found." });
          }
        })
        .catch((err) => {
          res.status(404).json({ error: 'That Data is not available' });
        })
    }
    // render HTML for top grinding levels
    function getTopGrindingLevels(brews) {
      res.render('pages/grindingLevels', { brews });
    }
  },

  voteBrew: async (req, res) => {
    const brewId = req.params.id;
    // check if brew id exists
    let brew = await Brew.findOne({ _id: brewId })
    if (brew) {
      let userVotes = brew.userVotes;
      // check if user already voted
      if (userVotes) {
        let userIds = userVotes.map((vote) => String(vote.userId));
        if (userIds.includes(req.userId)) {
          res.status(400).json({ error: 'User already voted for brew. Vote not recorded.' })
        } else {
          Brew.updateOne({ _id: brewId }, { $push: { userVotes: { userId: req.userId } } })
            .then((brew) => {
              res.status(200).json({ message: 'User vote successfully recorded.' })
            })
            .catch((err) => {
              res.status(500).json({ error: 'Failed to add user vote', err });
            })
        }
      } else {
        res.json({ error: 'Something failed...' })
      }

    } else {
      res.status(404).json({ error: `Coffee Brew of ID ${brewId} not found.` });
    }


  }

};
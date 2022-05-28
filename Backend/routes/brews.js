const {
    generateToken,
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndEmployee,
    verifyTokenAndAdmin
} = require('../helpers/webToken');
const Brew = require("../models/Brew");
const CoffeeBean = require("../models/CoffeeBean");
const router = require("express").Router()

//   Create new brew
router.post("/", verifyTokenAndEmployee, async (req, res) => {

    // check if coffee bean brew with given grinding setting already exists
    let brew = await Brew.findOne({ grindingSettings: req.body.grindingSettings, coffeeBeanId: req.body.coffeeBeanId });
    if (brew) {
        return res.status(400).json({ error: `Coffee brew of grinding setting (${req.body.grindingSettings}) already exists for this bean.` });
    } else {
        try {
            const newBrew = new Brew(req.body);
            const brew = await newBrew.save();
            res.status(201).json({
                message: "Brew Created Successfully",
                brew
            });
        } catch (error) {
            res.status(400).json({
                message: "Brew Creation Failed",
                error
            });
        }
    }
})

// Get all brews
router.get("/", verifyTokenAndEmployee, async (req, res) => {
    try {
        const brew = await Brew.find({});
        res.status(200).json({
            message: "All brews",
            brew
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to get all brews",
            error
        });
    }
})

// Get brew by id
router.get("/:id", verifyTokenAndEmployee, async (req, res) => {
    try {
        const brew = await Brew.findById(req.params.id);
        if (!brew) {
            return res.status(404).json({
                message: "Brew not found"
            });
        }
        res.status(200).json({
            message: "Brew found",
            brew
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to get brew",
            error
        });
    }
})

// Update brew by id
router.put("/update/:id", verifyTokenAndEmployee, async (req, res) => {
    try {
        const breww = await Brew.findByIdAndUpdate(
            req.params.id, { $set: req.body }, {
            new: true,
            runValidators: true
        });
        if (!brew) {
            return res.status(404).json({
                message: "Brew not found"
            });
        }
        res.status(200).json({
            message: "Brew updated",
            coffeeBean
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to update brew",
            error
        });
    }
})


// Delete brew by id
router.delete("/remove/:id", verifyTokenAndEmployee, async (req, res) => {
    try {
        const brew = await Brew.findByIdAndDelete(req.params.id);
        if (!brew) {
            return res.status(404).json({
                message: "Brew not found"
            });
        }
        res.status(200).json({
            message: "Brew deleted",
            brew
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete brew",
            error
        });
    }
})

// Query Top Five Grinding Levels
router.get("/topgl", async (req, res) => {
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
)


// Vote brew
router.get("/vote/:id", verifyTokenAndEmployee, async (req, res) => {
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
})

module.exports = router;

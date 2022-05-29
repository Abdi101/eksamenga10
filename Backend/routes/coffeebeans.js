const {
    generateToken,
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndEmployee,
    verifyTokenAndAdmin
} = require('../helpers/webToken');
const CoffeeBean = require("../models/CoffeeBean");
const router = require("express").Router()

//   Create Coffee Bean
router.post("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const newCoffeeBean = new CoffeeBean(req.body);
        const coffeeBean = await newCoffeeBean.save();
        res.status(201).json({
            message: "Coffee Bean Created Successfully",
            coffeeBean
        });
    } catch (error) {
        res.status(400).json({
            message: "Coffee Bean Creation Failed",
            error
        });
    }
})

// Get all coffee beans
router.get("/", verifyToken, async (req, res) => {
    try {
        const coffeeBeans = await CoffeeBean.find({});
        res.status(200).json({
            message: "All Coffee Beans",
            coffeeBeans
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to get all coffee beans",
            error
        });
    }
})

// Get coffee bean by id
router.get("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const coffeeBean = await CoffeeBean.findById(req.params.id);
        if (!coffeeBean) {
            return res.status(404).json({
                message: "Coffee Bean not found"
            });
        }
        res.status(200).json({
            message: "Coffee Bean found",
            coffeeBean
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to get coffee bean",
            error
        });
    }
})

// Update coffee bean by id
router.patch("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        console.log(req.body);
        const coffeeBean = await CoffeeBean.findByIdAndUpdate(
            req.params.id, { $set: req.body }, {
            new: true,
            runValidators: true
        });
        if (!coffeeBean) {
            return res.status(404).json({
                message: "Coffee Bean not found"
            });
        }
        res.status(200).json({
            message: "Coffee Bean updated",
            coffeeBean
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to update coffee bean",
            error
        });
    }
})


// Delete coffee bean by ID
router.delete("/remove/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const coffeeBean = await CoffeeBean.findByIdAndDelete(req.params.id);
        if (!coffeeBean) {
            return res.status(404).json({
                message: "Coffee Bean not found"
            });
        }
        res.status(200).json({
            message: "Coffee Bean deleted",
            coffeeBean
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete coffee bean",
            error
        });
    }
})

module.exports = router;

const CoffeeBean = require("../models/CoffeeBean");
const beansDummyData = require('../dummy_data/beans.json');

module.exports = {
  createCoffeeBean: async(req, res) => {
    // check if bean exists
    let bean = await CoffeeBean.findOne({name:req.body.name});
    if(bean){
      return res.status(400).json({error: `Coffee bean with name (${req.body.name}) already exists, try again.`});
    }else{
      const newCoffeeBean = new CoffeeBean(req.body);
      newCoffeeBean
        .save()
        .then((bean) => {
          res.status(200).json({message: 'Coffee bean added successfully.', bean});
        })
        .catch((err) => {
          res.status(400).json({error: 'Failed to add coffee bean, try again.', err});
        });
    }
    
  },

  getCoffeeBeanById: (req, res) => {
    const coffeeBeanId = req.params.id;
    CoffeeBean.find({ _id: coffeeBeanId })
      .then((bean) => {
        if(bean.length){
          res.status(200).json(bean);
        }else{
          res.status(404).json({error:`Coffee Bean of given ID (${coffeeBeanId}) not found`});
        }
      })
      .catch((err) => {
        res.status(500).json({error:err});
      });
  },

  getAllCoffeeBeans: (req, res) => {
    CoffeeBean.find({})
      .then((beans) => {
        if(beans.length){
          res.status(200).json(beans);
        }else{
          res.status(404).json({error: "Sorry!, Coffee beans not found, Please add Coffee Beans to system."});
        }
      })
      .catch((err) => {
        res.status(500).json({error:err});
      });
  },

  updateCoffeeBeanById: (req, res) => {
    const coffeeBeanId = req.params.id;
    CoffeeBean.updateOne({ _id: coffeeBeanId }, req.body)
      .then((bean) => {
        res.status(200).json({message: `Coffee Bean of given ID (${coffeeBeanId}) updated successfully.`});
      })
      .catch((err) => {
        res.status(404).json({error:`Coffee Bean of given ID (${coffeeBeanId}) not found`, err});
      });
  },

  deleteCoffeeBeanById: (req, res) => {
    const coffeeBeanId = req.params.id;
    CoffeeBean.deleteOne({ _id: coffeeBeanId })
      .then((bean) => {
        res.status(200).json({message: `Coffee Bean of given ID (${coffeeBeanId}) deleted successfully.`});
      })
      .catch((err) => {
        res.status(404).json({error:`Coffee Bean of given ID (${coffeeBeanId}) not found.`});
      });
  },

  populateDatabase: (req,res) => {
    CoffeeBean.insertMany(beansDummyData)
      .then((beans) => {
        res.satus(200).json({message: 'Added all coffee beans successfully.',beans});
      })
      .catch((err) =>{
        res.status(500).json({error: 'Failed to populate coffee beans collection.',err});
      });
  }
};

const cors = require('cors');
const express = require('express');
const dotenv = require('dotenv');
const databaseConnection = require('./config/database');

// Import Routers
const userRouter = require("./routes/userRoute");
const userRouterAuth = require("./routes/allusers");
const brewRoute = require("./routes/brews");
// const brewRouter = require("./routes/brewRoute");
const coffeeBeanRouter = require("./routes/coffeeBeanRoute");
const coffeeBeanRoute = require("./routes/coffeebeans");
const ratingRoute = require("./routes/ratingRoute");


// env variables'
dotenv.config();

const app = express();

// App Middleware
app.use(express.json());
app.use(cors());

// set view engine to ejs
app.set('view engine', 'ejs');

// Deafult API Route
app.get('/api', (req, res) => {
    res.render('pages/index');
})

// Routes MiddleWare
app.use('/api/users', userRouter);
app.use('/api/allusers', userRouterAuth);
app.use('/api/coffeebeans', coffeeBeanRoute);
app.use('/api/beans', coffeeBeanRouter);
app.use('/api/brews', brewRoute);
app.use('/api/ratings', ratingRoute);
// app.use('/api/brews',brewRouter);

// Connect to mongodb database
databaseConnection();

const PORT = process.env.PORT || 3001;

// Start the server
app.listen(PORT, () => console.log("Coffee Brew API running on PORT : " + PORT));

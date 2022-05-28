# coffee-beans-api
API for information about coffee beans, brews, and customer ratings for those brews

### Api Documentation
[https://documenter.getpostman.com/view/6512450/Uyr5nKB6](https://documenter.getpostman.com/view/6512450/Uyr5nKB6)

### Tech Stack

* Node.js
* Express.js
* Joi request body validator
* JsonWebToken (JWT)
* EJS templating engine

### Environment Variables

* PORT -- `Server port number`
* MONGODB_URL -- `MongoDB database URI`
* SECRET_KEY -- `jwt sign secret`
* PASS_SECRET -- `Password secret`

### Usage
1. `clone` this repository.
2. `cd` into project root directory.
3. run `npm install` to install all dependencies.
   (you must have [node](https://nodejs.org) installed)
4. Run `npm start` to start the server.

### Api Endpoints summary
| Endpoint                   | Method  |
|:---------------------------|:-------| 
| `/api/beans/`       | GET |
| `/api/coffeebeans/` | POST or GET |
| `/api/coffeebeans/:<bean-id>` | PUT or GET |
| `/api/coffeebeans/remove:<bean-id>` | DELETE |
| `/api/brews/` | GET or POST |
| `/api/brews/:<bean-id>` | GET or PUT |
| `/api/brews/vote/:<bean-id>` | PUT |
| `/api/brews/:<brew-id>` | DELETE or GET |
| `/api/brews/levels?water=<amount>&bean=<coffee-bean-name>` | GET |
| `/api/users/` | POST |
| `/api/allusers` | GET or POST |
| `/api/allusers/:id` | PUT |
| `/api/allusers/remove:id` | DELETE |
| `/api/allusers/:id` | GET |
| `/api/users/login` | POST |

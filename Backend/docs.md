swagger: '2.0'
info:
  version: '1.0'
  title: Cofee Bean Dashboard
  description: An awesome api for the coffee beans dashboard 
paths: {}
# Added by API Auto Mocking Plugin
host: virtserver.swaggerhub.com
basePath: /Personal53561/CoffeeBeans/1.0
tags:
- name: coffee beans
  description: Awesome endpoints
- name: dashboard
  description: Access to coffee beans machine
- name: users
  description: Operations about user
- name: coffee beans
  description: Operations about coffee beans
- name: brews
  description: Operations about brews

# schemes:
# - http


paths:

  # users

  # Register user 
  /users/:
    post:
      tags:
      - users
      summary: Add a new user to the database
      operationId: addUser
      consumes:
      - application/json
      produces:
      - application/json
      parameters:
      - in: body
        name: body
        description: User that needs to be added to the database
        required: true
        schema:
          $ref: '#/definitions/User'
      responses:
        201:
          description: Success, user created successfully
        500:
          description: Internal server error, failed to add user
      security:
      - jwt:
        - write: verifyToken
     
     
  # Login user 
  /users/login/:
    post:
      tags:
      - users
      summary: Login user
      operationId: loginUser
      consumes:
      - application/json
      produces:
      - application/json
      parameters:
      - in: body
        name: body
        description: User that needs to be added to the database
        required: true
        schema:
          $ref: '#/definitions/User'
      responses:
        201:
          description: Success, user login successfully
        500:
          description: Internal server error, failed to login user
      security:
      - jwt:
        - write:  createToken
        - read: createToken 
        
        
    
  # Update user
  /allusers/:_id/:
  put:
    tags:
    - user
    summary: Update an existing user
    operationId: updateUser
    consumes:
    - application/json
    produces:
    - application/json
    parameters:
    - in: body
      name: body
      description: User object that needs to be updated
      required: true
      schema:
        $ref: '#/definitions/User'
    responses:
      200:
        description: User has been updated succesfully
      400:
        description: Invalid ID supplied
      404:
        description: User not found
      500:
        description: Internal server error
    security:
    - jwt:
      - write: verifyTokenAndAdmin
      - read: verifyTokenAndAdmin
    
    
  # Get a user byid
  /allusers/:_id/:
  get:
    tags:
    - user
    summary: Get an existing user
    operationId: getUser
    consumes:
    - application/json
    produces:
    - application/json
    parameters:
    - in: body
      name: body
      description: User object that needs to be retrieved
      required: true
      schema:
        $ref: '#/definitions/User'
    responses:
      200:
        description: User has been found
      400:
        description: Invalid ID supplied
      404:
        description: User not found
      500:
        description: Internal server error
    security:
    - jwt:
      - write: verifyTokenAndAdmin
      - read: verifyTokenAndAdmin 
    
    
  # Get all users
  /allusers/:
  get:
    tags:
    - user
    summary: Get an existing user
    operationId: getUser
    consumes:
    - application/json
    produces:
    - application/json
    parameters:
    - in: body
      name: body
      description: User object that needs to be retrieved
      required: true
      schema:
        $ref: '#/definitions/User'
    responses:
      200:
        description: Fetched users succussfully
      500:
        description: Internal server error
    security:
    - jwt:
      - write: verifyTokenAndAdmin 
      - read: verifyTokenAndAdmin 
    
      
  # Delete user
  /allusers/remove/:_id/
  delete:
    tags:
    - user
    summary: Delete an existing user
    operationId: deleteUser
    consumes:
    - application/json
    produces:
    - application/json
    parameters:
    - in: body
      name: body
      description: User object that needs to be deleted
      required: true
      schema:
        $ref: '#/definitions/User'
    responses:
      200:
        description: User has been deleted succesfully
      400:
        description: Invalid ID supplied
      404:
        description: User not found
      500:
        description: Internal server error
    security:
    - jwt:
      - write: verifyTokenAndAdmin 
      - read: verifyTokenAndAdmin 
      
  
  
  # Coffee beans
  
  # Create coffee bean 
  /coffeebeans/:
    post:
      tags:
      - coffee beans
      summary: Add a coffee bean user to the database
      operationId: addCoffeeBean
      consumes:
      - application/json
      produces:
      - application/json
      parameters:
      - in: body
        name: body
        description: Coffee bean that needs to be added to the database
        required: true
        schema:
          $ref: '#/definitions/CoffeeBean'
      responses:
        201:
          description: Success, Coffee bean created successfully
        500:
          description: Internal server error, failed to add user
      security:
      - jwt:
        - write: verifyTokenAndAdmin || verifyTokenAndEmployee 
        - read: verifyTokenAndAdmin || verifyTokenAndEmployee 
     
     
  # Update Coffee Bean
  /coffeebeans/:_id/
  put:
    tags:
    - Coffee bean
    summary: Update an existing Coffee bean
    operationId: updateCoffeeBean
    consumes:
    - application/json
    produces:
    - application/json
    parameters:
    - in: body
      name: body
      description: Coffee bean object that needs to be updated
      required: true
      schema:
        $ref: '#/definitions/CoffeeBean'
    responses:
      200:
        description: User has been updated succesfully
      400:
        description: Invalid ID supplied
      404:
        description: User not found
      500:
        description: Internal server error
    security:
    - jwt:
      - write: verifyTokenAndAdmin
      - read: verifyTokenAndAdmin
    
    
  # Get a coffee bean by id 
  /coffeebeans/:_id/:
    get:
      tags:
      - coffee beans
      summary: Get an existing coffee bean
      operationId: getCoffeeBean
      consumes:
      - application/json
      produces:
      - application/json
      parameters:
      - in: body
        name: body
        description: coffee bean object that needs to be retrieved
        required: true
        schema:
          $ref: '#/definitions/User'
      responses:
        200:
          description: coffee bean has been found
        400:
          description: Invalid ID supplied
        404:
          description: User not found
        500:
          description: Internal server error
      security:
      - jwt:
        - write: verifyTokenAndAdmin
        - read: verifyTokenAndAdmin 
    
    
  # Get all coffee beans
  /beans/
  get:
    tags:
    - Get all coffee beans in the database
    operationId: getCoffeeBeans
    consumes:
    - application/json
    produces:
    - application/json
    parameters:
    - in: body
      name: body
      description: Coffee beans that needs to be retrieved
      required: true
      schema:
        $ref: '#/definitions/CoffeeBean'
    responses:
      200:
        description: Fetched all coffee beans succussfully
      500:
        description: Internal server error
    security:
    - jwt:
      - write: verifyTokenAndAdmin 
      - read: verifyTokenAndAdmin 
    
      
  # Delete coffee beans
  /coffeebeans/remove/:_id
  delete:
    tags:
    - coffee bean
    summary: Delete an existing coffee bean
    operationId: deleteCoffeeBean
    consumes:
    - application/json
    produces:
    - application/json
    parameters:
    - in: body
      name: body
      description: Coffee bean object that needs to be deleted
      required: true
      schema:
        $ref: '#/definitions/CoffeeBean'
    responses:
      200:
        description: Coffee bean has been deleted succesfully
      400:
        description: Invalid ID supplied
      404:
        description: User not found
      500:
        description: Internal server error
    security:
    - jwt:
      - write: verifyTokenAndAdmin 
      - read: verifyTokenAndAdmin 
  
 
  # Brew
  
  # Create brew 
  /brews/
    post:
      tags:
      - brew
      summary: Add a brew to the database
      operationId: addBrew
      consumes:
      - application/json
      produces:
      - application/json
      parameters:
      - in: body
        name: body
        description: Brew that needs to be added to the database
        required: true
        schema:
          $ref: '#/definitions/Brew'
      responses:
        201:
          description: Success, brew created successfully
        500:
          description: Internal server error, failed to add user
      security:
      - jwt:
        - write: verifyTokenAndAdmin || verifyTokenAndEmployee 
        - read: verifyTokenAndAdmin || verifyTokenAndEmployee 
     
     
  # Update brew
  /brews/:_id/
  put:
    tags:
    - brew
    summary: Update an existing brew
    operationId: updateBrew
    consumes:
    - application/json
    produces:
    - application/json
    parameters:
    - in: body
      name: body
      description: Brew object that needs to be updated
      required: true
      schema:
        $ref: '#/definitions/Brew'
    responses:
      200:
        description: Brew has been updated succesfully
      400:
        description: Invalid ID supplied
      404:
        description: User not found
      500:
        description: Internal server error
    security:
    - jwt:
      - write: verifyTokenAndAdmin || verifyTokenAndEmployee 
      - read: verifyTokenAndAdmin || verifyTokenAndEmployee 
    
  # Get a brew by id 
  /brew/:_id/
    get:
      tags:
      - brew
      summary: Get an existing brew
      operationId: getBrew
      consumes:
      - application/json
      produces:
      - application/json
      parameters:
      - in: body
        name: body
        description: Brew object that needs to be retrieved
        required: true
        schema:
          $ref: '#/definitions/Brew'
      responses:
        200:
          description: Brew has been found
        400:
          description: Invalid ID supplied
        404:
          description: User not found
        500:
          description: Internal server error
      security:
      - jwt:
        - write: verifyTokenAndAdmin ||verifyTokenAndEmployee
        - read: verifyTokenAndAdmin || verifyTokenAndEmployee
    
    
  # Get all brews
  /brews/
  get:
    tags:
    - Get all brews in the database
    operationId: getBrews
    consumes:
    - application/json
    produces:
    - application/json
    parameters:
    - in: body
      name: body
      description: Brews that needs to be retrieved
      required: true
      schema:
        $ref: '#/definitions/Brews'
    responses:
      200:
        description: Fetched all brews succussfully
      500:
        description: Internal server error
    security:
    - jwt:
      - write: verifyTokenAndAdmin || verifyTokenAndEmployee
      - read: verifyTokenAndAdmin || verifyTokenAndEmployee
    
      
  # Delete brew
  /brews/delete/:_id
  delete:
    tags:
    - brew
    summary: Delete an existing brew
    operationId: deleteBrew
    consumes:
    - application/json
    produces:
    - application/json
    parameters:
    - in: body
      name: body
      description: Brew object that needs to be deleted
      required: true
      schema:
        $ref: '#/definitions/Brew'
    responses:
      200:
        description: Brew has been deleted succesfully
      400:
        description: Invalid ID supplied
      404:
        description: User not found
      500:
        description: Internal server error
    security:
    - jwt:
      - write: verifyTokenAndAdmin || verifyTokenAndEmployee
      - read: verifyTokenAndAdmin || verifyTokenAndEmployee
  
 
 
 
 
 
 
 
 
 
- create a repository
- Intialize the repository
- node_modules, package.json, package-lock.json
- Install express
- Create a server
- Listen to port 3000
- write request handler for /test, /hello
- Install nodemon and update script package.json
- What are dependencies
- What is the use of "-g" while npm install
- Diffrence between caret and tilde (~ vs ^)

- intialize git
- .gitignore
- Create a remote repo on github
- Push all code to remote origin
- Play with routes and routes extensions ex /hello, /, hello/2
- Order of routes matter
- Install Postman app and make a workspace/collection > Test API
- Write logic to handle GET,POST, PATCH, DELETE API and test them on Postman
- Exlplore routing and use of ?, + , (), \* in the routes
- Use of regex in rotes /a/ , //\*fly$/
- How to read query params in the routes and reading the dynamic routes

- Multiple Route Handler -Play with Code
- next()
- next function and errors
- What is middleware
- How express JS basically handles request behind the scene
- Diffrence BWT app.use and app.all
- Write a dummy auth middleware for admin
- Write a dummy auth middleware for all user routes, except /user/login

- Created a free cluster on MongoDB website (Mongo Atlas)
- Install mongoose library
- Connect your application to database
- Call the connectDB function and connect to database before starting apllication 3000
- Create a user Schema
- What is the \_id and \_\_v in mongodb
- Create /signup API to add data to database
- Push some document using API call from postman
- Error Handling usinmg try, catch
- Diffrence between JSON and javascript object
- add the express.json middleware to your app
- Make your signup API dynamic to recevied data from the end user
- User.findOne with duplicate email ids , which one returs
- API - GET user by email
- API- Feed API -GET /feed - get all the user from the database
- API -GET USER BY ID
- Create Delete User by userId
- Diffrence Between PATCH AND PUT

- Validate data in Signup API
- Install bcrypt package
- Create a password Hashed using bcrypt.hash &saving the user is expected password
- Create Login API
- Compare password and throw errors if email or password is invalid

- install cookie-parser
- just need a dummy cookie to user
- create GET /profile API and check if you get the cookie back
- Install jsonwebtoken
- In Login API, after email and password validation . crate a JWT token and send it to user in cookies
- read the cookies inside your profile API and find the logged
- userAuth Middleware
- And the userAuth middle were in profile API and new sendConnectionRequest API
- Set the expiry of JWT token and cookies to 7 days
- Create UserSchema method to getJWT()
- Create UserSchema method to validate

- Explore tinder APIs
- Create a list all API you can think of in Dev Tinder
- Group multiple routes under respective routes
- Read Documenttation for express.Router
- Create routes folder for managing auth, profile, request router
- Create authRouter , profileRouter , requestRouter
- Import these routers in app.js

- Read Compund Indexes in MongoDB
- why do we need index in DB?
- what is the advantages and disadvantages of creating?
- Create a connection Request Schema
- Send Connection Request API
- Proper validation of Data
- Think About all corner cases
- $or query and $and query

-Logic for GET / feed API

/feed?page=1&limit=10 => first 10 user 1-10
/feed?page=2&limit=10 => 11-20
/feed?page=3&limit=10 =>21-30
.skip() & .limit()

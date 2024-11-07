# DevTinder APIs

AuthRouter

- POST /signup
- POST /login
- POST /logout

ProfileRouter

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

ConnectionRequestRouter

- POST /request/send/intrested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

userRouter

- GET /user/connections
- GET /user/request
- GET /user/feed - Get you the profile of other user

status : ignored, intrested, accepted, rejected

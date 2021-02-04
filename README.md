## Project Side

### Overview
This is an application to demonstrate how to build GraphQL API using Apollo server, Express JS, Mongoose, MongoDB etc. 

This API has multiple endpoints to fetch properties, mark property as favorite, create user, login etc complete list can be viewed on GraphIQL

### How to use the application

### DB config 
1. Update mongoDB ```DB_CONNECTION_URI``` URI in /config/env file

### application
* Vavigate to ```/server/``` run ``` npm install ``` to install all necessary dependencies 
* Once compelte run ``` node src/app.js ``` or  ``` nodemon src/app.js ```
* GrapIQl should be running at ``` http://localhost:4000/graphql ```
* Create a user using the following query 

```js
    mutation {
        createUser(input: {
            email: "test@example.com"
            password:"test"
        }) {
            _id
        }
    }
```

running this should return something like 

```json
{
  "data": {
    "createUser": {
      "_id": "601b84acaba4509b83eb72fd"
    }
  }
}
```
* Now try to login using the credentails used to create a new user 

```js
{
    login(input: {email: "test@example.com", password: "test"}) {
        authToken
        email
        id
    }
}

```

* When successful you will see a response with "AuthToken" 

```json
{
  "data": {
    "login": {
      "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMWI3ZjJlMjYxZWMyOTk4YjJhMjEyNCIsImVtYWlsIjoidXNlcjFAc2lkZWluYy5jb20iLCJpYXQiOjE2MTI0MTQ4NjN9.YScM1E9R4aSiDa2EqESFtUqMF2awnlBh_QLo39oxDTQ",
      "email": "user1@sideinc.com",
      "id": "601b7f2e261ec2998b2a2124"
    }
  }
}

```

* This "AuthToken"  can be used to access other protected API endpoints

### Accessing Protected API's

* To access protected API, we need to pass the AuthToken in the request
* I use POSTMAN to easily pass the AuthToken in the headers 

* ```properties```
  
  returns the list of properties fetched from SimplyRETS API

```js
{
    properties {
        mlsId
        favoriteCount
    }
}

```

*  ```propertiesByCity(city: String)```

returns the list of properties filtered by city name

```js
propertiesByCity(
    city: String
    ) {
        mlsId
        favoriteCount
    }

```

* ``` markFavorite(mlsId: Int)```
  
increments the fav rount on a property identified by its mlsId and returns a response of type ```FavoriteProperty```

```js
markFavorite(
mlsId: 12345
) {
    mlsId
    favoriteCount
}

```

* Other endpoints can be seen using the self documented section in GraphIQL


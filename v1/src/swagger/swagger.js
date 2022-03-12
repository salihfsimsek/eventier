const user = require('./user')

module.exports ={
    openapi: "3.0.1",
    info: {
      version: "1.0.0",
      title: "APIs Document",
      description: "your description here",
      termsOfService: "",
      contact: {
        name: "Salih Simsek",
        url: "https://salihfsimsek.com"
      }
    },
    servers: [
      {
        url: "http://localhost:3000/api",
        description: "Local server"
      }
    ],
    components: {
      schemas: {},
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },
    tags: [
      {
        name: "Users",
        description: "API for Users Endpoints"
      }
    ],
    paths: {
      "/users": {
        post: {
          ...user.getAllUsers
        }
      }
    },
    definitions: {
      createUser: {
        required: ["firstName", "lastName", "email", "password", "username"],
        properties: {
          full_name: {
            type: "string"
          },
          username: {
            type: "string"
          },
          email: {
            type: "string"
          },
          phone_number: {
            type: "string"
          },
          profile_picture: {
            type: "string"
          },
          password: {
            type: "string"
          }
        }
      }
    }
  }
  
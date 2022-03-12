const getAllUsers = {
    tags: ["Users"],
    summary: "API Endpoint user list",
    description: "Fetch all users in database",
    parameters: [
      {
        name: "user",
        description: "User params to register new user",
        in: "body",
        required: "true",
        schema: {
          $ref: "#definitions/createUser"
        }
      }
    ],
    produces: ["application/json"],
    responses: {
      200: {
        description: "OK",
        content: {
          'application/json': {
            schema: {
              type: "object",
              example: {
                _id: "asdf12345678",
                full_name: "Salih Simsek",
                username: "salihfsimsek",
                email: "salihfsimsek@gmail.com",
                phone_number: "00000000000",
                profile_picture: null
              }
            }
          }
        }
      }
    }
  }

  module.exports = {getAllUsers}
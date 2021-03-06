const UserModel = require('../models/user-model')

const path = require('path')
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../app')
const should = chai.should()

chai.use(chaiHttp)

describe('Users', () => {
    beforeEach((done) => {
        UserModel.findOneAndDelete({email: 'salihfiratsimsek@gmail.com'}, err => {
            done()
        })
    }),

    describe('/POST login', () => {
        it('it should get an access token', (done) => {
            const user = {
                username: 'salihffsimsek',
                password: 'user12345'
            }
            chai.request(server).post('/api/users/login').send(user).end((err,res) => {
                res.should.have.status(201)
                process.env.ACCESS_TOKEN = `Bearer ${res.body.access_token}`
                done()
            })
        })

        it('it should return wrong information, username', (done) => {
            const user = {
                username: 'salihfffsimsek',
                password: 'user12345'
            }
            chai.request(server).post('/api/users/login').send(user).end((err, res) => {
                res.should.have.status(401)
                done()
            })
        })

        it('it should return wrong information, email', (done) => {
            const user = {
                email: 'salihfffsimsek@gmail.com',
                password: 'user12345'
            }
            chai.request(server).post('/api/users/login').send(user).end((err, res) => {
                res.should.have.status(401)
                done()
            })
        })

        it('it should return validation error, email or username required', (done) => {
            const user = {
                password: 'user12345'
            }
            chai.request(server).post('/api/users/login').send(user).end((err, res) => {
                res.should.have.status(400)
                done()
            })
        })
    })

    describe('/POST create user ', () => {
        it('it should create a user', (done) => {
            const newUser = {
                full_name: "Salih ??im??ek",
                username: "salihfsimsek",
                email: "salihfiratsimsek@gmail.com",
                phone_number: "00000000000",
                password: "user12345"
            }
            chai.request(server).post('/api/users').send(newUser).end((err,res) => {
                res.should.have.status(200)
                done()
            })
        })

        it('it should return duplicate error', (done) => {
            const newUser = {
                full_name: "Salih ??im??ek",
                username: "salihfsimsek",
                email: "salihfiratsimsek@gmail.com",
                phone_number: "00000000000",
                password: "user12345"
            }
            chai.request(server).post('/api/users').send(newUser).end((err,res) => {
                res.should.have.status(200)
                chai.request(server).post('/api/users').send(newUser).end((err,res) => {
                    res.should.have.status(409)
                    done()
                })
            })
        })

        it('it should return validation error for email', (done) => {
            const newUser = {
                full_name: "Salih ??im??ek",
                username: "salihfsimsek",
                email: "salihfiratsimsek.com",
                phone_number: "00000000000",
                password: "user12345"
            }
            chai.request(server).post('/api/users').send(newUser).end((err,res) => {
                res.should.have.status(400)
                done()
            })
        })

        it('it should return validation error for username', (done) => {
            const newUser = {
                full_name: "Salih ??im??ek",
                email: "salihfiratsimsek@gmail.com",
                phone_number: "00000000000",
                password: "user12345"
            }
            chai.request(server).post('/api/users').send(newUser).end((err,res) => {
                res.should.have.status(400)
                done()
            })
        })

        it('it should return validation error for fullname', (done) => {
            const newUser = {
                username: 'salihfsimsek',
                email: "salihfiratsimsek@gmail.com",
                phone_number: "00000000000",
                password: "user12345"
            }
            chai.request(server).post('/api/users').send(newUser).end((err,res) => {
                res.should.have.status(400)
                done()
            })
        })

        it('it should return validation error for phone number', (done) => {
            const newUser = {
                full_name: "Salih ??im??ek",
                username: 'salihfsimsek',
                email: "salihfiratsimsek@gmail.com",
                password: "user12345"
            }
            chai.request(server).post('/api/users').send(newUser).end((err,res) => {
                res.should.have.status(400)
                done()
            })
        })

        it('it should return validation error for password', (done) => {
            const newUser = {
                full_name: "Salih ??im??ek",
                username: 'salihfsimsek',
                email: "salihfiratsimsek@gmail.com",
                phone_number: "00000000000",
            }
            chai.request(server).post('/api/users').send(newUser).end((err,res) => {
                res.should.have.status(400)
                done()
            })
        })

    })

    describe('/Patch update user', () => {
        it('it should be update the user', (done) => {
            const newInfos = {
                full_name: 'Salih Simsek'
            }
            chai.request(server).patch('/api/users').send(newInfos).set({Authorization: process.env.ACCESS_TOKEN}).end((err,res) => {
                res.should.have.status(200)
                done()
            })
        })

        it('it should be return email validation error', (done) => {
            chai.request(server).patch('/api/users').send({email: 'salihfsimsek@com'}).set({Authorization: process.env.ACCESS_TOKEN}).end((err,res) => {
                res.should.have.status(400)
                done()
            })
        })

        it('it should be return duplicate email error', (done) => {
            chai.request(server).patch('/api/users').send({email: 'demoacc@gmail.com'}).set({Authorization: process.env.ACCESS_TOKEN}).end((err,res) => {
                res.should.have.status(409)
                done()
            })
        })
    })

    describe('/patch change password', (done) => {
        let newData = {
            password: "user12345",
            c_password: "user12345"
        }
        it('it should be update the password', (done) => {
            chai.request(server).patch('/api/users/change-password').send(newData).set({Authorization: process.env.ACCESS_TOKEN}).end((err,res) => {
                res.should.have.status(200)
                done()
            })
        })

        it('it should return password and c_password not equal error', (done) => {
            chai.request(server).patch('/api/users/change-password').send({...newData, c_password: 'user123456'}).set({Authorization: process.env.ACCESS_TOKEN}).end((err,res) => {
                res.should.have.status(400)
                done()
            })
        })

        it('it should return password not enough long', (done) => {
            chai.request(server).patch('/api/users/change-password').send({...newData, password: 'user'}).set({Authorization: process.env.ACCESS_TOKEN}).end((err,res) => {
                res.should.have.status(400)
                done()
            })
        })
    })

    describe('/patch reset password', () => {
        let user = {email: 'demoacc@gmail.com'}
        it('it should return success message for email send', (done) => {
            chai.request(server).post('/api/users/reset-password').send(user).end((err,res) => {
                res.should.have.status(200)
                done()
            })
        })

        it('it should return user not found error', (done) => {
            chai.request(server).post('/api/users/reset-password').send({email: 'salihfsimsek@gmail.com'}).end((err,res) => {
                res.should.have.status(404)
                done()
            })
        })
    })

    describe('/Get Users', () => {
        it('it should get all users', (done) => {
            chai.request(server).get('/api/users').set({Authorization: process.env.ACCESS_TOKEN}).end((err,res) => {
                res.should.have.status(200)
                res.body.should.be.a('array')
                done()
            })
        })
    })

    describe('/get user', () => {
        let userId = "62290fbc6876df97d8e3e9a2"
        let fakeUserId = '62290fbc6876df97d8e3e9a3'
        it('it should return specific user', (done) => {
            chai.request(server).get(`/api/users/${userId}`).set({Authorization: process.env.ACCESS_TOKEN}).end((err, res) => {
                res.should.have.status(200)
                done()
            })
        })

        it('it should return not found error', (done) => {
            chai.request(server).get(`/api/users/${fakeUserId}`).set({Authorization: process.env.ACCESS_TOKEN}).end((err, res) => {
                res.should.have.status(404)
                done()
            })
        })
    })   

    describe('/patch update users profile picture', () => {
        it('it should be update users profile picture', (done) => {
            chai.request(server).patch('/api/users/profile-picture').set({Authorization: process.env.ACCESS_TOKEN}).set('Content-Type', 'multipart/form-data').attach('profile_picture', path.resolve(__dirname,'profile-picture.jpeg')).end((err, res) => {
                res.should.have.status(200)
                done()
            })
        })

        it('it should remove the users profile picture', (done) => {
            chai.request(server).patch('/api/users/profile-picture').set({Authorization: process.env.ACCESS_TOKEN}).end((err,res) => {
                res.should.have.status(200)
                done()
            })
        })
    })

    describe('/get users events', () => {
        let userId = "62290fbc6876df97d8e3e9a2"
        let fakeUserId = '62290fbc6876df97d8e3e9a3'
        it('it should return users all events', (done) => {
            chai.request(server).get(`/api/users/users-events/${userId}`).set({Authorization: process.env.ACCESS_TOKEN}).end((err,res) => {
                res.should.have.status(200)
                done()
            })
        })

        it('it should return user not found error', (done) => {
            chai.request(server).get(`/api/users/users-events/${fakeUserId}`).set({Authorization: process.env.ACCESS_TOKEN}).end((err,res) => {
                res.should.have.status(404)
                done()
            })
        })
    })
})
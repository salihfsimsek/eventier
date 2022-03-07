const UserModel = require('../models/user-model')

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
                password: 'simsek123'
            }
            chai.request(server).post('/api/users/login').send(user).end((err,res) => {
                res.should.have.status(201)
                process.env.ACCESS_TOKEN = `Bearer ${res.body.access_token}`
                done()
            })
        })
    })

    describe('/POST create user ', () => {
        it('it should create a user', (done) => {
            const newUser = {
                full_name: "Salih Şimşek",
                username: "salihfsimsek",
                email: "salihfiratsimsek@gmail.com",
                phone_number: "00000000000",
                password: "simsek123"
            }
            chai.request(server).post('/api/users').send(newUser).end((err,res) => {
                res.should.have.status(200)
                done()
            })
        })

        it('it should return duplicate error', (done) => {
            const newUser = {
                full_name: "Salih Şimşek",
                username: "salihfsimsek",
                email: "salihfiratsimsek@gmail.com",
                phone_number: "00000000000",
                password: "simsek123"
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
                full_name: "Salih Şimşek",
                username: "salihfsimsek",
                email: "salihfiratsimsek.com",
                phone_number: "00000000000",
                password: "simsek123"
            }
            chai.request(server).post('/api/users').send(newUser).end((err,res) => {
                res.should.have.status(400)
                done()
            })
        })

        it('it should return validation error for username', (done) => {
            const newUser = {
                full_name: "Salih Şimşek",
                email: "salihfiratsimsek@gmail.com",
                phone_number: "00000000000",
                password: "simsek123"
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
                password: "simsek123"
            }
            chai.request(server).post('/api/users').send(newUser).end((err,res) => {
                res.should.have.status(400)
                done()
            })
        })

        it('it should return validation error for phone number', (done) => {
            const newUser = {
                full_name: "Salih Şimşek",
                username: 'salihfsimsek',
                email: "salihfiratsimsek@gmail.com",
                password: "simsek123"
            }
            chai.request(server).post('/api/users').send(newUser).end((err,res) => {
                res.should.have.status(400)
                done()
            })
        })

        it('it should return validation error for password', (done) => {
            const newUser = {
                full_name: "Salih Şimşek",
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

    describe('/Get Users', () => {
        it('it should get all the users', (done) => {
            chai.request(server).get('/api/users').set({Authorization: process.env.ACCESS_TOKEN}).end((err,res) => {
                res.should.have.status(200)
                res.body.should.be.a('array')
                res.body.length.should.be.eql(1)
                done()
            })
        })
    })

    describe('/Patch update users information', () => {
        it('it should change the users data', (done) => {
            chai.request(server).patch('/api/users').set({Authorization: process.env.ACCESS_TOKEN}).end((err,res) => {
                res.should.have.status(200)
                done()
            })
        })
    })
})
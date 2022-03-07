const EventModel = require('../models/event-model')

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../app')
const should = chai.should()

chai.use(chaiHttp)

describe('Events', () => {
    beforeEach((done) => {
        EventModel.deleteMany({}, err => {
            done()
        })
    })

    describe('/POST create event', () => {
        it('it should create an event', () => {
            const newEvent = 
                {
                    title: "Konseeer",
                    description: "Bir cok farkli sanatcinin katilacagi konser",
                    date: "12.03.2022",
                    location: "Istanbul"
                
            }
            chai.request(server).post('/api/events').set({Authorization: process.env.ACCESS_TOKEN}).send(newEvent).end((err,res) => {
                res.should.have.status(201)
            })
        })
    })
})
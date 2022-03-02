const mongoose = require('mongoose')

const db = mongoose.connection

db.once('open', () => {
    console.log('Connected to db')
})

const connectDB = async () => {
    try{
        await mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,{
            useNewurlParser: true,
            useUnifiedTopology: true
        })
    }catch(err){
        console.log(err)
    }
}

module.exports = connectDB
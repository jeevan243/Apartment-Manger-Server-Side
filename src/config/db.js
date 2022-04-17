const mongoosoe = require("mongoose");
require("dotenv").config()

const connect = () => {
    return mongoosoe.connect(process.env.MONGOURI)
}


module.exports = connect;
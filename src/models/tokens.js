const mongoose = require('mongoose')

const tokenSchema = mongoose.Schema(
    {
        symbol: {
            type: String,
            required: [true],
            unique: true
        },
        address: {
            type: String,
            required: [true]
        }
    },
    {
        timestamps: true
    }
)

const Token = mongoose.model('Token',tokenSchema);

module.exports = Token;
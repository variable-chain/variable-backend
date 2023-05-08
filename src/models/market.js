const mongoose = require('mongoose')

const marketSchema = mongoose.Schema(
    {
        address: {
            type: String,
            required: [true],
            unique: true
        },
        symbol: {
            type: String,
            required: [true],
            unique: true
        }
    },
    {
        timestamps: true
    }
)

const Market = mongoose.model('Market',marketSchema);

module.exports = Market;

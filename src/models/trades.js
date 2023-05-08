const mongoose = require('mongoose')

const tradeSchema = mongoose.Schema(
    {
        trade_id: {
            type: Number,
            required: [true],
            unique: true
        },
        status: {
            type: String,
            required: [true]
        },
        calldata: {
            type: Object,
            required: [false]
        },
        order_id: {
            type: Number,
            required: [true]
        }
    },
    {
        timestamps: true
    }
)

const Trade = mongoose.model('Trade',tradeSchema);

module.exports = Trade;
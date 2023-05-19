const mongoose = require('mongoose')

const depositSchema = mongoose.Schema(
    {
        tx_id: {
            type: String,
            required: [true],
            unique: true
        },
        calldata: {
            type: Object,
            required: [true]
        },
        status: {
            type: String,
            required: [true]
        }
    },
    {
        timestamps: true
    }
)

const Deposit = mongoose.model('Deposit',depositSchema);

module.exports = Deposit;

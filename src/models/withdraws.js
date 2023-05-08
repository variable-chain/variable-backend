const mongoose = require('mongoose')

const withdrawSchema = mongoose.Schema(
    {
        tx_id: {
            type: Number,
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

const Withdraw = mongoose.model('Deposit',withdrawSchema);

module.exports = Withdraw;

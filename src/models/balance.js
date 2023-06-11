const mongoose = require('mongoose')

const balanceSchema = mongoose.Schema(
    {
        stark_key: {
            type: String,
            required: [true],
            unique: true
        },
        asset: {
            type: String,
            required: [true]
        },
        amount: {
            type: Number,
            required: [true]
        }
    },
    {
        timestamps: true
    }
)

const Balance = mongoose.model('Balance',balanceSchema);

module.exports = Balance;
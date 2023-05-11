const mongoose = require('mongoose')

const transactionSchema = mongoose.Schema(
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
        },
        transaction_type: {
            type: String,
            required: [true]
        },
        user_id: {
            type: Number,
            required: [true]
        }
    },
    {
        timestamps: true
    }
)

const Transaction = mongoose.model('Transaction',transactionSchema);

module.exports = Transaction;

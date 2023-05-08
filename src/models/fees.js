const mongoose = require('mongoose')

const feeSchema = mongoose.Schema(
    {
        tx_id: {
            type: Number,
            unique: true,
            required: [true]
        },
        fee_details: {
            type: Object,
            required: [false]
        }
    },
    {
        timestamps: true
    }
)

const Fee = mongoose.model('Fee',feeSchema);

module.exports = Fee;
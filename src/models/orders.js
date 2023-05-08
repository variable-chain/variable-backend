const mongoose = require('mongoose')

const orderSchema = mongoose.Schema(
    {
        order_id: {
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
            required: [true]
        },
        type: {
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

const Order = mongoose.model('Order',orderSchema);

module.exports = Order;
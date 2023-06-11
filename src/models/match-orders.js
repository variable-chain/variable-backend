const mongoose = require('mongoose')

const matchOrderSchema = mongoose.Schema(
    {
        match_order_id: {
            type: Number,
            required: [true],
            unique: true,
            default: 0
        },
        order: {
            type: Object,
            required: [true]
        },
        type: {
            type: String,
            required: [true]
        }
    },
    {
        timestamps: true
    }
)

const MatchOrder = mongoose.model('MatchOrder',matchOrderSchema);

module.exports = MatchOrder;
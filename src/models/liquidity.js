const mongoose = require('mongoose')

const liquiditySchema = mongoose.Schema(
    {
        pool_id: {
            type: Number,
            required: [true],
            unique: true
        },
        calldata: {
            type: Object,
            required: [true]
        }
    },
    {
        timestamps: true
    }
)

const Liquidity = mongoose.model('Liquidity',liquiditySchema);

module.exports = Liquidity;
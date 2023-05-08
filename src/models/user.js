const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        eth_key: {
            type: String,
            required: [true,"Ethereum address is not provided"],
            unique: true
        },
        sign: {
            type: String,
            required: [false]
        },
        stark_key: {
            type: String,
            required: [true,"Stark Key not provided"]
        },
        user_id: {
            type: Number,
            required: [true],
            unique: true
        }
    },
    {
        timestamps: true
    }
)

const User = mongoose.model('User',userSchema);

module.exports = User;
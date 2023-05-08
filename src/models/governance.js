const mongoose = require('mongoose')

const governanceSchema = mongoose.Schema(
    {
        address: {
            type: String,
            required: [true],
        },
        user_id: {
            type: Number,
            required: [true]
        },
        tokens: {
            type: String,
            required: [true]
        }
    },
    {
        timestamps: true
    }
)

const Governance = mongoose.model('Governance',governanceSchema);

module.exports = Governance;

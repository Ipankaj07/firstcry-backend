const monogose = require('mongoose');

const userSchema = new monogose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    cart: [
        {
            type: monogose.Schema.Types.ObjectId,
            ref: 'Product', required: false
        }
    ],
    sortlist: [
        {
            type: monogose.Schema.Types.ObjectId,
            ref: 'Product', required: false
        }
    ],
},
    {
        versionKey: false,
        timestamps: true
    }
);

module.exports = monogose.model('User', userSchema);
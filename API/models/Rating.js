const mongoose = require('mongoose');


const RatingSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    contentId: {
        type: String,
        required: true,
    },
    rate: {
        type: Number,
        min: 1,
        max:5,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('Rating', RatingSchema);
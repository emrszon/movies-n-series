const mongoose = require('mongoose');


const ContentSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ["Serie", "Película"],
    },
    // numberOfViews: {
    //     type: Number,
    // },
    views: {
        type: [mongoose.Types.ObjectId],
    },
    dayPick: {
        type: Boolean,
        default: false
    },
        
})

module.exports = mongoose.model('Content', ContentSchema);
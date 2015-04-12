var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var newsSchema = new Schema({
    author: {
        type: String,
        "default": 'System',
        trim: true,
        minlength: 2,
        maxlength: 32
    },
    header: {
        type: String,
        required: true,
        trim: true,
        minlength: 4,
        maxlength: 56
    },
    text: {
        type: String,
        required: true,
        trim: true,
        minlength: 12,
        maxlength: 8192
    },
    created: {
        type: Date,
        "default": Date.now
    }
});

module.exports = mongoose.model('News', newsSchema);

var mongoose = require('mongoose');
var moment = require('moment');
var slug = require('slug');
var fastimage = require("fastimage"); // Note: it's not an NPM module yet.

var Schema = mongoose.Schema;
var groupSchema = require('./group');

var eventSchema = new Schema({
    eventType: {
        type: String,
        required: true,
        uppercase: true,
        trim: true,
        enum: {
            values: ['TVT', 'CO'],
            message: 'Event type must be TVT or CO.'
        },
    },
    imageUrl: {
        type: String,
        trim: true,
        validate: [validateImage, 'Could not validate image. Ensure type is jpg/png/bmp/gif']
    },
    date: {
        type: Date,
        required: true,
        set: function(d) {
            var v = moment.utc(d);
            if (!(v.isValid())) {
                console.error('faulty date: ' + v.toString());
                v = moment.utc();
            }
            if (v.minutes() >= 15 &&  v.minutes() <= 45)
                v.minutes(30);
            else
                v.minutes(0);

            v.seconds(0);
            return v;
        },
        validate: [validateEventDate, 'Event date needs to be maximum two months ahead and at least one hour from now.']
    },
    createdBy: {
        type: String,
        trim: true,
        maxlength: 24,
        "default": 'System'
    },
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 4,
        maxlength: 56
    },
    amountSlots: {
        type: Number,
        min: 2,
        max: 99,
        "default": 99
    },
    slots: {
        blufor: {
            groups: [groupSchema]
        },
        opfor: {
            groups: [groupSchema]
        },
        greenfor: {
            groups: [groupSchema]
        },
        civilian: {
            groups: [groupSchema]
        }
    },
    permalink: {
    	type: String,
    	trim: true,
    	required: true,
    	unique: true
    }
});

function validateEventDate(eventDate) {
    eventDate = moment(eventDate);
    var refTime = moment.utc().add(1, 'hour');

    if (eventDate < refTime) return false;
    refTime.subtract(1, 'hour').add(2, 'months');
    return (eventDate < refTime);
}

function validateImage(image, callback) {
    fastimage(image.url, function(err, img) {
        if (err) {
            console.error(err);
            return callback(false);
        }
        // todo: maybe check height and weight ? img.width, img.height

        callback(img && 'png jpg jpeg bmp gif'.split(' ').indexOf(img.type) !== -1);
    });
}

eventSchema.pre('validate', function(next) {
    var link =
        this.get('eventType')
        .concat('-' + this.get('amountSlots'))
        .concat('-' + this.get('name'));

    var permalink = slug(link, {
    	separator: '-',
    	truncate: 50 
    }).toLowerCase();

    this.set('permalink', permalink);
    next();
});


module.exports = mongoose.model('EventSchema', eventSchema);
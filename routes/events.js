var moment = require('moment');
var fs = require('fs');
var multer = require('multer');
var path = require('path');
var slug = require('slug');
var moment = require('moment');


var errorHelper = require('../util/error-helper');
var sqmParser = require('../util/sqm-parser');
var Event = require('../schemas/event');

/**
 * Creates a new event
 */
exports.create = function(req, res) {
    var body = req.body ||  {};
    
    new Event({
        eventType: body.eventType,
        imageUrl: body.imageUrl,
        date: body.date,
        createdBy: body.createdBy,
        name: body.name,
        description: body.description,
        amountSlots: body.amountSlots,
        slots: body.slots
    }).save(function(err, doc) {
        if (err) {
            console.error(err);
            res.status(500).json({
                error: errorHelper(err)
            });
        } else {
            res.status(200).json({
                data: true
            });
        }
    });
};

/**
 * returns a list of all events
 * sorted by the event date in ascending order
 */
exports.list = function(req, res) {

    Event.find({}, {
        _id: false,
        eventType: true,
        amountSlots: true,
        name: true,
        date: true,
        createdBy: true,
        permalink: true
    })
    .sort({'date': 1})
    .lean()
    .exec(function(err, data) {
        if (err) {
            console.error(err);
            res.status(500).json({
                error: errorHelper(err)
            });
        } else {
            if (Array.isArray(data)) {
                var now = moment.utc();
                data.forEach(function(event) {
                    event.passed = moment.utc(event.date) < now;
                });
            }

            res.status(200).json({
                data: data
            });
        }

    });
};

/**
 * Finds a single event
 */
exports.findOne = function(req, res) {
    console.log(req.params);
    var id = req.params.eventId;

    Event.findOne({permalink: id}, {
        _id : false
    })
    .lean()
    .exec(function(err, data) {
        if (err) {
            console.error(err);
            res.status(500).json({
                error: 'Event not found'
            });
        }else {
            if (!data) {
                res.status(500).json({error: 'Event not found'});
            }else{
                res.status(200).json({data: data});

            }
        }
    });
};

/**
 * Uploads an event image
 * returns JSON with image path
 * or error
 */
var IMAGE_ALLOWED_FILE_TYPES = ['jpg', 'png', 'gif', 'bmp'];
var IMAGE_MAX_SIZE = 1024 * 1024 * 3; // 3mb

exports.uploadImage = [multer({
    dest: 'public/uploads/img',
    putSingleFilesInArray: true,
    limits: {
        files: 1,
        fileSize: IMAGE_MAX_SIZE
    },
    rename: function(fieldname, filename) {
        return slug(moment().format('YYYY MM DD hh:mm:ss') + '_' + filename, {
            separator: '_',
            truncate: 30
        }).toLowerCase();
    },
    onFileUploadStart: function(file, req, res) {
        if (IMAGE_ALLOWED_FILE_TYPES.indexOf(file.extension) === -1) {
            res.status(400).json({error: 'Invalid file type', });
            return false;
        }
    },
    onFileSizeLimit: function(file) {
        console.warn('Denied image upload due to size limit: ', file.originalname);
        file.error = 'File size too large (max ' + IMAGE_MAX_SIZE/(1024*1024) + 'mb)';
    },
    onFileUploadComplete: function(file, req, res) {
        if (file.error) {
            fs.unlink(file.path); // delete the partially written file
            return res.status(400).json({error: file.error});
        }
        res.status(200).json({data: 'uploads/img/' + file.name});
    }
    // dummy function, why is this needed?
}), function(req, res) {}];

/**
 * Uploads a SQM file and parses it
 * Returns JSON with data of parsed file, or error
 */
var SQM_MAX_SIZE = 1024 * 1024 * 8; // 8mb;

exports.uploadSqmFile = [multer({
	dest: 'public/uploads/sqm',
    limits:{
        files: 1,
        fileSize: SQM_MAX_SIZE,
    },
    putSingleFilesInArray: true,
    rename: function(fieldname, filename) {
        return slug(moment().format('YYYY MM DD hh:mm:ss') + '_' + filename, {
            separator: '_',
            truncate: 10
        }).toLowerCase();
    },
    onFileUploadStart: function(file, req, res) {
        if ('sqm' !== file.extension) {
            res.status(400).json({
                error: 'Invalid file'
            });
            return false;
        }
        console.info('SQM file upload: %s', file.name);
    },
    onFileSizeLimit: function(file) {
        console.warn('Failed sqm upload due to size limit: ', file.name);
        file.error  = 'File size too large (max ' + SQM_MAX_SIZE/(1024*1024) + 'mb)';
    },
    onFileUploadComplete: function(file, req, res) {
        
        if (file.error) {
            fs.unlink(file.path); // delete the partially written file
            return res.status(400).json({error: file.error});
        }

        console.info('SQM file upload complete: %s', file.name);
        fs.readFile(file.path, 'utf8', function(err, fileStr) {
            fs.unlink(file.path); // dont need file anymore
            if (err) {
                console.error(err);
                res.status(500).json({
                    error: 'Failed to parse file'
                });
            } else {
                sqmParser(fileStr, function(err, data) {
                    if (err) {
                        console.error(err);
                        res.status(400).json({
                            error: 'Failed to parse file'
                        });
                    } else {
                        res.status(200).json({
                            data: data
                        });
                    }
                });
            }
        });
    },
}), function(req, res) {}];
/**
 * Parses an SQM file for playable units and returns JSON
 * in the schema format (under slots)
 */

var ArmaClassParser = require('arma-class-parser');
var escape = require('escape-html');

var ALLOWED_SIDES = ['WEST', 'EAST', 'GUER', 'CIV'];
var PLAYABLE_TYPES = ['PLAY CDG', 'PLAYER COMMANDER'];
var SIDE_TRANSLATE_MAP = {
    WEST: 'blufor',
    EAST: 'opfor',
    GUER: 'greenfor',
    CIV: 'civilian'
};

/**
 * Checks if a given side is considered OK to parse
 * @param String
 * @returns {Boolean}
 */
function isAllowedSide(side) {
    side = '' + side;
    return ALLOWED_SIDES.indexOf(side.toUpperCase()) !== -1;
}

/**
 * Checks if a given unit is considered playable
 * @param String
 * @returns {Boolean}
 */
function isUnitPlayable(playerStr) {
    playerStr = '' + playerStr;
    return PLAYABLE_TYPES.indexOf(playerStr.toUpperCase()) !== -1;
}

/**
 * Translates a side, e.g given "WEST" returns "blufor"
 * @param String
 * @returns
 */
function getTranslatedSide(sideStr) {
    sideStr = '' + sideStr;
    var match = SIDE_TRANSLATE_MAP[sideStr.toUpperCase()];
    if (!match) throw new Error('Non existing side given to translate');
    
    return match;
}

/**
 * Attempts to parse a leaders init field to find the groupId of his group
 * @param {String} unit init
 * @returns String
 */
function getGroupNameFromLeaderInit(initStr) {
    initStr = '' + initStr;
    var ret = '';
    
    try {
        // get the last setGroupId if several defined
        var newStr = initStr.substr(initStr.toLowerCase().lastIndexOf('setgroupid'), initStr.length);
        
        // TODO: optimize / better regexp?
        // match (no capture "setgroupid" [<any>")<MATCH>(no capture "<any>])
        var match = newStr.match(/(?:\bsetgroupid\b)*(?:\[.*["'])(.*)(?:(["']{1}\]{1};))/i)[1];
        ret = match || '';
    }catch(e) {
        console.error(e)    ;
    }
    return ret.trim();
}

/**
 * Parses a SQM file string and tries to get the playable groups and the units role 
 * @param sqmFileStr
 * @param callback (err, data)
 */
module.exports = exports = function parseSqmString(sqmFileStr, callback) {
    if ('string' !== typeof sqmFileStr) throw new Error('parseSqmString expects a read file as string');
    callback = callback || function(){};


    var parsed;
    var data = {
        blufor: {groups: []},
        opfor: {groups: []},
        greenfor: {groups: []},
        civilian: {groups: []},
    };
    
    try {
        parsed = ArmaClassParser(sqmFileStr);
    } catch (e) {
        return callback(e);
    }

    // empty sqm?
    if (!parsed.Mission || !parsed.Mission.Groups) return callback(null, data);

    try {
        var idx = 0;
        var groups = parsed.Mission.Groups;

        Object.keys(groups).forEach(function(groupKey) {
            var group = groups[groupKey];

            if ('object' !== typeof group.Vehicles || !isAllowedSide(group.side)) return;

            var add = false;
            var side = group.side;
            var tempGrp = {
                name: 'Group ' + idx++,
                units : []
            };

            var units = group.Vehicles;

            Object.keys(units).forEach(function(unitKey) {
                var unit = units[unitKey];

                if (isUnitPlayable(unit.player)) {
                    add = true;
                    
                    if (unit.leader) { 
                        tempGrp.name = escape(getGroupNameFromLeaderInit(unit.init) || tempGrp.name).trim();
                        // real side of a group is the leaders side
                        side = unit.side;
                    }
                    
                    tempGrp.units.push({
                        role: escape(unit.description).trim(),
                    });
                }

            });

            if (add) {
                data[getTranslatedSide(side)].groups.push(tempGrp);
            }

        });
        
    }catch(e){
        return callback(e);
    }

    return callback(null, data);   
};
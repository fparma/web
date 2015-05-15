var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var groupSchema = new Schema({
	name: {
		type: String,
		trim: true,
		"default": 'Group',
		maxlength: 24,
	},
	units: [{
		player: {
			type: String,
			trim: true,
			"default": null,
			maxlength: 24,
			steam_id: {
				type: String
			}
		},
		role: {
			type: String,
			trim: true,
			maxlength: 24,
			"default": null
		}
	}]
});
groupSchema.pre('validate', function(next) {
	var group = this;
	if (Array.isArray(group.units)) {
		group.units.forEach(function(unit, idx) {
			if (!unit.role) {
				unit.role = 'Unit '.concat(++idx);
			}
		});
	}
	next();
});

groupSchema.path('units').validate(function(units){
    return (Array.isArray(units) && units.length);
}, 'Group requires at least one unit');

mongoose.model('GroupSchema', groupSchema);

module.exports = groupSchema;

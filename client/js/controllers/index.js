var name = 'app.controllers';

angular.module(name,[]);

require('./MenuCtrl')(name);
require('./NewsCtrl')(name);
require('./EventsCreateCtrl')(name);
require('./EventsListCtrl')(name);

module.exports = exports = name;
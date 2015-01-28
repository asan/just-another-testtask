var Store = require('../stores/Store');

var Action = function() {

};

Action.prototype.setText = function(text) {
  Store.setText(text);
};

Action.prototype.setFreqBy = function(freqBy) {
  Store.setFreqBy(freqBy);
};

Action.prototype.setSortBy = function(sortBy) {
  Store.setSortBy(sortBy);
};


module.exports = new Action;
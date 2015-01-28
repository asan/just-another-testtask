var EventEmitter = require('events').EventEmitter;
var util = require('util');
var R = require('ramda');

var Store = function() {
  this.freqBy = 'characters';
  this.sortBy = 'freq';
  var text = require('./initialData').text;
  this.setText(text);
};

util.inherits(Store, EventEmitter);

Store.prototype.setFreqBy = function(freqBy) {
  this.freqBy = freqBy;
  this.setText();
}

Store.prototype.setSortBy = function(sortBy) {
  this.sortBy = sortBy;
  this.setText();
}

Store.prototype.setText = function(text) {
  this.text = text || this.text;
  var sortByAlpha = function(a, b) {return a.key.charCodeAt(0) - b.key.charCodeAt(0)};
  var sortByFreq = function(a, b) {return b.freq - a.freq};
  var sortFunk = (this.sortBy === 'freq') ? sortByFreq : sortByAlpha;

  
  this.countFreq();
  
  this.arr = R.sort(sortFunk, this.objToArr(this.freq));
  this.emit('change');
}

Store.prototype.countFreq = function() {
  var text = this.text;
  var freqBy = (this.freqBy === 'characters') ? text.toLowerCase() : text.toLowerCase().split(" ");
  var freqs = {}
  var max = 0;
  R.forEach(function(letter) {
    freqs[letter] = freqs[letter] || 0;
    freqs[letter] += 1;
    if(freqs[letter] > max){
      max = freqs[letter];
    }
  }, freqBy);
  this.freq = freqs;
  this.max = max;
}

Store.prototype.objToArr = function(freq) {
  var arr = []
  R.mapObjIndexed(function(freq, key) {
    arr.push({
      key: key,
      freq: freq
    });
  }, freq);
  return arr;
};

module.exports = new Store;
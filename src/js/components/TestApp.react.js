var React = require('react');

var Store = require('../stores/Store');
var Action = require('../actions/Action');

var TextArea = require('./TextArea.react');
var FreqBoard = require('./FreqBoard.react');


function getStoreState() {
  return {
    text: Store.text,
    arr: Store.arr,
    max: Store.max,
    freqBy: Store.freqBy,
    sortBy: Store.sortBy
  }
};

var APP =
  React.createClass({
    getInitialState: function() {
      return getStoreState();
    },
    componentDidMount: function() {
      Store.on('change', this._onChange);
    },
    componentWillUnmount: function() {
      Store.off('change', this._onChange)
    },
    _onChange: function() {
      this.setState(getStoreState());
    },
    _changeFreqBy: function(e) {
      Action.setFreqBy(e.target.value);
    },
    _changeSortBy: function(e) {
      Action.setSortBy(e.target.value);
    },
    render:function(){
      return ( 
      <div>
        <div className="row">
          <div className="col-md-3 form-inline">
            <label>Считать частоту &nbsp;</label>
            <select className="form-control" value={this.state.freqBy} onChange={this._changeFreqBy}>
              <option value="characters">символов</option>
              <option value="words">слов</option>
            </select>
          </div>
          <div className="col-md-3 form-inline">
            <label>Сортировать по &nbsp;</label>
            
            <select className="form-control" value={this.state.sortBy} onChange={this._changeSortBy}>
              <option value="freq">частоте</option>
              <option value="alfa">алфавиту</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="left-pane col-md-6">
            <TextArea text={this.state.text} />
          </div>
          <div className="right-pane col-md-6">
            <FreqBoard arr={this.state.arr} max={this.state.max}/>
          </div>
        </div>
      </div>
      );
        
    }
  });
module.exports = APP;


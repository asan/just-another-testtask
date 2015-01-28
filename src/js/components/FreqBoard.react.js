var React = require('react');
var R = require('ramda');

var FreqBoard =
  React.createClass({
    render:function(){
      var FREQ_BOX_HEIGHT = 30;
      var list = this.props.arr.map(function(elem, index) {
        var width = (elem.freq/this.props.max)*100;
        return <div className="freq-box"
          style={{
            width: width + '%',
            transform: 'translate(0, ' + index * FREQ_BOX_HEIGHT + 'px)'
          }}
          key={elem.key}
        >{elem.key !== ' ' ? elem.key : '" "'} - {elem.freq}</div>
      }.bind(this));
      return <div className="freq-board" style={{height: this.props.arr.length * FREQ_BOX_HEIGHT}}>
          {list}
        </div>
    }
  });
module.exports = FreqBoard;
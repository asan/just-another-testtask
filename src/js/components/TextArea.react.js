var React = require('react');

var Action = require('../actions/Action');

var TextArea =
  React.createClass({
    render:function(){
      return <div>
          <textarea value={this.props.text} onChange={this._handleChange} />
        </div>
    },
    _handleChange: function(e) {
      Action.setText(e.target.value);
    }
  });
module.exports = TextArea;
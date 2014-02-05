/* Omega Node Status
 *
 * Copyright (C) 2014 Mo Morsi <mo@morsi.org>
 * Licensed under the MIT License
 */

if(typeof(Omega) === "undefined") Omega = {};

Omega.NodeStatus = {
  nodes : [{name : 'omegaverse.info',
            dst  : 'omegaverse.info:8080'},
           {name : 'syracloud.net',
            dst  : 'syracloud.net:8000'}],

  omega : function(){
    if(!this._omega) this._omega = new Omega.Easy();
    return this._omega;
  }, 

  anon : function(){
    if(!this.user) this.user =
      Omega.Easy.Obj.Factory.user({id       : 'anon',
                                   password : 'nona'});
    return this.user
  },

  test_node : function(node, cb){
    var _this = this;
    var anon = this.anon();

    var omega = this.omega();
    omega.set('ws', node.dst);
    omega.node.onerror =
      function(err){ cb(node, null, err); };
    omega.invoke('users::login', anon,
      function(response){ cb(node, response, null); });
  },
};

Omega.NodeStatus.Widget = function(){
  this.entries = {};
}

Omega.NodeStatus.Widget.prototype = {
  div_id : 'node_statuses',

  dom : function(){
    return $('#' + this.div_id);
  },

  _set_status : function(node, stat){
    var existing = $('#node_status_' + node.name);
    if(existing.length != 0)
      existing.delete();

    var stxt = $('<span/>',
                 {class : stat ? 'node_active' : 'node_inactive',
                  text  : stat ? 'active' : 'inactive'});
    var domstat = $('<div />',
                    {id   : 'node_status_' + node.name,
                     text : node.name + ': '});
    domstat.append(stxt);
    this.dom().append(domstat);
  },

  _node_test_response : function(node, response, error){
    if(error || response.error){
      this._set_status(node, false);
    }else{
      this._set_status(node, true);
    }
  },

  refresh : function(){
    var _this = this;
    var nodes = Omega.NodeStatus.nodes;
    for(var n = 0; n < nodes.length; n++){
      var node = nodes[n];
      Omega.NodeStatus.test_node(node,
        function(node, response, error){
          _this._node_test_response(node, response, error);
        });
    }
  }
};

$(document).ready(function(){
  var widget = new Omega.NodeStatus.Widget();
  widget.refresh();
});

/* Omega Easy Interface
 *
 * Copyright (C) 2014 Mo Morsi <mo@morsi.org>
 * Licensed under the MIT License
 */

if(typeof(Omega) === "undefined") Omega = {};

Omega.Easy = function(){
};

Omega.Easy.prototype = {
  constructor : Omega.Easy,

  close : function(){
    for(var transport in this.nodes){
      for(var dst in this.nodes[transport])
        if(this.nodes[transport][dst].close)
          this.nodes[transport][dst].close();
    }
  },

  header : function(key, value){
    for(var transport in this.nodes)
      for(var dst in this.nodes[transport])
        this.nodes[transport][dst].headers[key] = value;
  },

  set : function(transport, dst){
    this.node = this._get_node(transport, dst);
  },

  invoke : function(){
    var args = Array.slice(arguments);

    var node = this.node;
    if(!node){
      var transport = args.shift();
      var dst       = args.shift();
      node          = this._get_node(transport, dst);
    }

    return node.invoke.apply(node, args);
  },

  _get_node : function(transport, dst){
    if(!this.nodes) this.nodes = {};
    if(!this.nodes[transport]) this.nodes[transport] = {};
    if(!this.nodes[transport][dst]){
      this.nodes[transport][dst] =
        transport == 'ws' ?
          this._setup_ws(dst) : this._setup_http(dst);
    }

    return this.nodes[transport][dst];
  },

  /// TODO eventually support server notifications
  _setup_ws : function(dst){
    var host_port = dst.split(':');
    var host      = host_port[0];
    var port      = host_port[1];

    var node = new RJR.WsNode(host, port);
    node.open();
    return node;
  },

  /// XXX will require a proxy due to XSS prevention techniques
  _setup_http : function(dst){
    return new RJR.HttpNode(this.http_url);
  }
};

Omega.Easy.Obj = function(type){
}

Omega.Easy.Obj.prototype = {
};

Omega.Easy.Obj.Factory = {
  user : function(opts={}){
    var obj        = new Omega.Easy.Obj();
    obj.json_class = 'Users::User';
    obj.id         = opts['id'];
    obj.password   = opts['password'];
    return obj;
  }
}


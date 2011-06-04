(function() {
  /*
  Auto-generated from Core/Controls/Console.ctl
  */  var smio, smoothio;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  smio = smoothio = global.smoothio;
  smio.Packs_Core_Controls_Console = (function() {
    __extends(Packs_Core_Controls_Console, smio.Control);
    Packs_Core_Controls_Console.prototype.init = function() {};
    Packs_Core_Controls_Console.prototype.onLoad = function($el) {
      Packs_Core_Controls_Console.__super__.onLoad.call(this);
      if (!this.args['topDown']) {
        $("#" + this.ctlID + "_detail").insertBefore("#" + this.ctlID + "_ever");
        return $("#" + this.ctlID + "_hover").insertBefore("#" + this.ctlID + "_ever");
      }
    };
    function Packs_Core_Controls_Console(client, parent, args) {
      Packs_Core_Controls_Console.__super__.constructor.call(this, client, parent, args, "Core_Controls", "Core_Controls_Console");
      this.jsSelf = "smio.client.allControls['" + this.id() + "']";
      this.init();
    }
    Packs_Core_Controls_Console.prototype.renderHtml = function($el) {
      var __r;
      if (!this._html) {
        __r = {
          ctls: [],
          m: [],
          o: null
        };
        __r.o = __r.m;
        __r.o.push("\n<div id=\"");
        __r.o.push(this.ctlID);
        __r.o.push("\" class=\"smio-console smio-console-");
        __r.o.push(this.args['topDown'] ? 'top' : 'bottom');
        __r.o.push("\">\n\t<div id=\"");
        __r.o.push(this.ctlID);
        __r.o.push("_ever\" class=\"smio-console-ever\">header</div>\n\t<div id=\"");
        __r.o.push(this.ctlID);
        __r.o.push("_hover\" class=\"smio-console-hover\" style=\"display: none;\">hover</div>\n\t<div id=\"");
        __r.o.push(this.ctlID);
        __r.o.push("_detail\" class=\"smio-console-detail\" style=\"display: none;\">details</div>\n</div>\n\n");
        this._html = __r.o.join('');
      }
      if ($el) {
        $el.html(this._html);
      }
      return this._html;
    };
    return Packs_Core_Controls_Console;
  })();
}).call(this);

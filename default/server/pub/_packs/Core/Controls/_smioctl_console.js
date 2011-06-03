(function() {
  /*
  Auto-generated from Core/Controls/console.ctl
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
  smio.Packs_Core_Controls_console = (function() {
    __extends(Packs_Core_Controls_console, smio.Control);
    Packs_Core_Controls_console.prototype.init = function() {};
    Packs_Core_Controls_console.prototype.onLoad = function($el) {
      Packs_Core_Controls_console.__super__.onLoad.call(this);
      if (!this.args['topDown']) {
        $("#" + this.ctlID + "_detail").insertBefore("#" + this.ctlID + "_ever");
        return $("#" + this.ctlID + "_hover").insertBefore("#" + this.ctlID + "_ever");
      }
    };
    function Packs_Core_Controls_console(client, parent, args) {
      Packs_Core_Controls_console.__super__.constructor.call(this, client, parent, args, "Core_Controls", "Core_Controls_console");
      this.init();
    }
    Packs_Core_Controls_console.prototype.renderHtml = function($el) {
      var parts;
      if (!this._html) {
        parts = [];
        parts.push("\n<div id=\"");
        parts.push(this.ctlID);
        parts.push("\" class=\"smio-console smio-console-");
        parts.push(this.args['topDown'] ? 'top' : 'bottom');
        parts.push("\">\n\t<div id=\"");
        parts.push(this.ctlID);
        parts.push("_ever\" class=\"smio-console-ever\">header</div>\n\t<div id=\"");
        parts.push(this.ctlID);
        parts.push("_hover\" class=\"smio-console-hover\" style=\"display: none;\">hover</div>\n\t<div id=\"");
        parts.push(this.ctlID);
        parts.push("_detail\" class=\"smio-console-detail\" style=\"display: none;\">details</div>\n</div>\n\n");
        this._html = parts.join('');
      }
      if ($el) {
        $el.html(this._html);
      }
      return this._html;
    };
    return Packs_Core_Controls_console;
  })();
}).call(this);

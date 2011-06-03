(function() {
  /*
  Auto-generated from Core/Controls/MainFrame.ctl
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
  smio.Packs_Core_Controls_MainFrame = (function() {
    __extends(Packs_Core_Controls_MainFrame, smio.Control);
    Packs_Core_Controls_MainFrame.prototype.test = function() {
      var xy;
      return xy = "clientside";
    };
    function Packs_Core_Controls_MainFrame(client, parent, args) {
      Packs_Core_Controls_MainFrame.__super__.constructor.call(this, client, parent, args, "Core_Controls", "Core_Controls_MainFrame");
      this.jsSelf = "smio.client.allControls['" + this.id() + "']";
      this.init();
    }
    Packs_Core_Controls_MainFrame.prototype.renderHtml = function($el) {
      var __o;
      if (!this._html) {
        __o = [];
        __o.push("\n<div class=\"smio-main\" id=\"");
        __o.push(this.id());
        __o.push("\">\n\t");
        __o.push(this.renderTag("ctl", "Console", {
          id: this.id('ctop'),
          topDown: true
        }));
        __o.push("\n\t<div class=\"smio-console smio-console-main\"></div>\n\t");
        __o.push(this.renderTag("ctl", "Console", {
          id: this.id('cbottom'),
          topDown: false
        }));
        __o.push("\n</div>\n\n");
        this._html = __o.join('');
      }
      if ($el) {
        $el.html(this._html);
      }
      return this._html;
    };
    return Packs_Core_Controls_MainFrame;
  })();
}).call(this);

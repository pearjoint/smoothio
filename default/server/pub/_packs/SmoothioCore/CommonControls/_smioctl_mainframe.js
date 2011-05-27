(function() {
  /*
  Auto-generated from SmoothioCore/CommonControls/mainframe.ctl
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
  smio.Packs_SmoothioCore_CommonControls_mainframe = (function() {
    __extends(Packs_SmoothioCore_CommonControls_mainframe, smio.Control);
    Packs_SmoothioCore_CommonControls_mainframe.prototype.test = function() {
      var xy;
      return xy = "clientside";
    };
    function Packs_SmoothioCore_CommonControls_mainframe(client, args) {
      Packs_SmoothioCore_CommonControls_mainframe.__super__.constructor.call(this, client, args, "SmoothioCore_CommonControls", "SmoothioCore_CommonControls_mainframe");
      this.init();
    }
    Packs_SmoothioCore_CommonControls_mainframe.prototype.renderHtml = function($el) {
      var parts;
      if (!this._html) {
        parts = [];
        parts.push("\n<div class=\"smio-main\" id=\"");
        parts.push(this.id());
        parts.push("\">\n\t");
        parts.push(this.renderTag("ctl", "console", {
          id: this.id('ctop'),
          topDown: true
        }));
        parts.push("\n\t<div class=\"smio-console smio-console-main\"></div>\n\t");
        parts.push(this.renderTag("ctl", "console", {
          id: this.id('cbottom'),
          topDown: false
        }));
        parts.push("\n</div>\n\n");
        this._html = parts.join('');
      }
      if ($el) {
        $el.html(this._html);
      }
      return this._html;
    };
    return Packs_SmoothioCore_CommonControls_mainframe;
  })();
}).call(this);

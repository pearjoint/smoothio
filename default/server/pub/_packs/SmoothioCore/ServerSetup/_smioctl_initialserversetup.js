(function() {
  /*
  Auto-generated from SmoothioCore/ServerSetup/initialserversetup.ctl
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
  smio.Packs_SmoothioCore_ServerSetup_initialserversetup = (function() {
    __extends(Packs_SmoothioCore_ServerSetup_initialserversetup, smio.Control);
    function Packs_SmoothioCore_ServerSetup_initialserversetup(client, args) {
      Packs_SmoothioCore_ServerSetup_initialserversetup.__super__.constructor.call(this, client, args, "SmoothioCore_ServerSetup", "SmoothioCore_ServerSetup_initialserversetup");
      this.init();
    }
    Packs_SmoothioCore_ServerSetup_initialserversetup.prototype.renderHtml = function($el) {
      var parts;
      if (!this._html) {
        parts = [];
        parts.push("<div class=\"smio-setup\" id=\"");
        parts.push(this.id());
        parts.push("\">\n\t<div class=\"smio-setup-outer\">\n\t\t<div class=\"smio-setup-header\">");
        parts.push(this.renderTag("r", "title", null));
        parts.push("</div>\n\t\t<div class=\"smio-setup-header-desc\">");
        parts.push(this.renderTag("r", "desc", null));
        parts.push("</div>\n\t</div>\n\t<div class=\"smio-setup-inner\">\n\t\t<div class=\"smio-setup-usersetup\">\n\t\t\t");
        parts.push(this.renderTag("r", "usersetup", null));
        parts.push("\n\t\t</div>\n\t\t<div class=\"smio-setup-templates\">\n\t\t\t");
        parts.push(this.renderTag("r", "templateselection", null));
        parts.push("\n\t\t</div>\n\t</div>\n\t<div class=\"smio-setup-outer\">\n\t\t<div class=\"smio-setup-buttonarea\">\n\t\t\t<a disabled=\"disabled\" class=\"smio-setup-button\">");
        parts.push(this.renderTag("r", "button", null));
        parts.push("</a>\n\t\t</div>\n\t</div>\n</div>\n\n");
        this._html = parts.join('');
      }
      if ($el) {
        $el.html(this._html);
      }
      return this._html;
    };
    return Packs_SmoothioCore_ServerSetup_initialserversetup;
  })();
}).call(this);

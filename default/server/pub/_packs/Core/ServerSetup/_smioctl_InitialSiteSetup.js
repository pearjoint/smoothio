(function() {
  /*
  Auto-generated from Core/ServerSetup/InitialSiteSetup.ctl
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
  smio.Packs_Core_ServerSetup_InitialSiteSetup = (function() {
    __extends(Packs_Core_ServerSetup_InitialSiteSetup, smio.Control);
    function Packs_Core_ServerSetup_InitialSiteSetup(client, parent, args) {
      Packs_Core_ServerSetup_InitialSiteSetup.__super__.constructor.call(this, client, parent, args, "Core_ServerSetup", "Core_ServerSetup_InitialSiteSetup");
      this.jsSelf = "smio.client.allControls['" + this.id() + "']";
      this.init();
    }
    Packs_Core_ServerSetup_InitialSiteSetup.prototype.renderHtml = function($el) {
      var __o;
      if (!this._html) {
        __o = [];
        __o.push("<div class=\"smio-setup\" id=\"");
        __o.push(this.id());
        __o.push("\">\n\t<div class=\"smio-setup-outer\">\n\t\t<div class=\"smio-setup-header\">");
        __o.push(this.renderTag("r", "title", null));
        __o.push("</div>\n\t\t<div class=\"smio-setup-header-desc\">");
        __o.push(this.renderTag("r", "desc", null));
        __o.push("</div>\n\t</div>\n\t<div class=\"smio-setup-inner\">\n\t\t<div class=\"smio-setup-usersetup\">\n\t\t\t");
        __o.push(this.renderTag("r", "usersetup", null));
        __o.push("\n\t\t</div>\n\t\t<div class=\"smio-setup-templates\">\n\t\t\t");
        __o.push(this.renderTag("r", "templateselection", null));
        __o.push("\n\t\t</div>\n\t</div>\n\t");
        __o.push(this.renderTag("ctl", "TabStrip", {
          id: this.id('steptabs'),
          "class": 'smio-setup-outer smio-setup-steps',
          tabClass: 'smio-setup-step',
          tabs: ['owner', 'template', 'finish'],
          resPrefix: 'steps_'
        }));
        __o.push("\n</div>\n\n");
        this._html = __o.join('');
      }
      if ($el) {
        $el.html(this._html);
      }
      return this._html;
    };
    return Packs_Core_ServerSetup_InitialSiteSetup;
  })();
}).call(this);

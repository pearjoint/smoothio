(function() {
  /*
  Auto-generated from Core/Controls/tabstrip.ctl
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
  smio.Packs_Core_Controls_tabstrip = (function() {
    __extends(Packs_Core_Controls_tabstrip, smio.Control);
    function Packs_Core_Controls_tabstrip(client, parent, args) {
      Packs_Core_Controls_tabstrip.__super__.constructor.call(this, client, parent, args, "Core_Controls", "Core_Controls_tabstrip");
      this.init();
    }
    Packs_Core_Controls_tabstrip.prototype.renderHtml = function($el) {
      var firstDone, parts, tab, _i, _len, _ref;
      if (!this._html) {
        parts = [];
        parts.push("<div id=\"");
        parts.push(this.ctlID);
        parts.push("\" class=\"");
        parts.push(this.renderTag("arg", "class", null));
        parts.push("\">\n");
        firstDone = false;
        _ref = this.args['tabs'];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          tab = _ref[_i];
          parts.push("\n\t\t<a href=\"#\" id=\"");
          parts.push(this.id(tab));
          parts.push("\" class=\"");
          parts.push(this.renderTag("arg", "tabClass", null));
          parts.push(firstDone ? '' : ' ' + this.args['tabClass'] + '-active');
          parts.push("\">");
          parts.push(this.res(this.args['resPrefix'] + tab));
          parts.push("</a>\n\t\t");
          if (!firstDone) {
            firstDone = true;
          }
        }
        parts.push("\n</div>\n\n");
        this._html = parts.join('');
      }
      if ($el) {
        $el.html(this._html);
      }
      return this._html;
    };
    return Packs_Core_Controls_tabstrip;
  })();
}).call(this);

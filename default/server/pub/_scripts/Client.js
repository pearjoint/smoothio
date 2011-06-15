(function() {
  var smio;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  smio = global.smoothio;
  smio.Client = (function() {
    function Client() {
      this.syncControls = __bind(this.syncControls, this);
      this.onWindowResize = __bind(this.onWindowResize, this);
      this.init = __bind(this.init, this);      var cookie;
      this.sleepy = false;
      this.allControls = {};
      this.pageWindow = $(window);
      this.pageBody = $('#smio_body');
      $('#smio_offline_msg').text(smio.resources.smoothio.connect);
      cookie = $.cookie('smoo');
      this.pageUrl = $.url();
      try {
        this.smioCookie = JSON.parse(cookie);
      } catch (err) {
        this.smioCookie = null;
      }
      if (!this.smioCookie) {
        this.smioCookie = {};
      }
      this.sessionID = this.smioCookie['sessid'];
      this.socket = new smio.Socket(this, false);
      this.pageWindow.resize(_.debounce((__bind(function() {
        return this.onWindowResize();
      }, this)), 300));
    }
    Client.prototype.init = function() {
      this.socket.connect();
      return setInterval((__bind(function() {
        return this.pageBody.css({
          "background-image": "url('/_/file/images/bg" + (smio.Util.Number.randomInt(4)) + ".jpg')",
          "background-size": "auto auto"
        });
      }, this)), 4000);
    };
    Client.prototype.onWindowResize = function() {
      var ctl, h, id, w, _ref, _ref2, _results;
      _ref = [this.pageWindow.width(), this.pageWindow.height()], w = _ref[0], h = _ref[1];
      _ref2 = this.allControls;
      _results = [];
      for (id in _ref2) {
        ctl = _ref2[id];
        _results.push(ctl.onWindowResize(w, h));
      }
      return _results;
    };
    Client.prototype.syncControls = function(controlDescs) {
      var ctl, ctlDesc, id, _results;
      if ((ctlDesc = controlDescs[''])) {
        if ((ctl = this.allControls[''])) {
          ctl.syncUpdate(ctlDesc);
        } else {
          this.allControls[''] = ctl = new smio['Packs_' + ctlDesc._](this, null, smio.Util.Object.mergeDefaults(ctlDesc, {
            id: 'sm'
          }));
          ctl.init();
          ctl.renderHtml($('#smio_main'));
          ctl.onLoad();
        }
      }
      _results = [];
      for (id in controlDescs) {
        ctlDesc = controlDescs[id];
        _results.push(id && (ctl = this.allControls[id]) ? ctl.syncUpdate(ctlDesc) : void 0);
      }
      return _results;
    };
    return Client;
  })();
}).call(this);

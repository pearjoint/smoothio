(function() {
  var smio;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  smio = global.smoothio;
  smio.Client = (function() {
    function Client() {
      var cookie;
      this.sleepy = false;
      this.allControls = {};
      this.pageBody = $('#smio_body');
      $('#smio_offline').text(smio.resources.smoothio.connect);
      cookie = $.cookie('smoo');
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
    }
    Client.prototype.init = function() {
      this.socket.connect();
      return setInterval((__bind(function() {
        return this.pageBody.css({
          "background-image": "url('/_/file/images/bg" + (smio.Util.Number.randomInt(4)) + ".jpg')"
        });
      }, this)), 5000);
    };
    Client.prototype.syncControls = function(controlDescs) {
      var ctl, ctlDesc, id, _results;
      if ((ctlDesc = controlDescs[''])) {
        if ((ctl = this.allControls[''])) {
          ctl.syncUpdate(ctlDesc);
        } else {
          this.allControls[''] = ctl = new smio['Packs_' + ctlDesc._](this, smio.Util.Object.mergeDefaults(ctlDesc, {
            id: 'sm'
          }));
          ctl.init();
          ctl.renderHtml(this.pageBody);
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

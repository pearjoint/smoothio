(function() {
  var smio;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  smio = global.smoothio;
  smio.Client = (function() {
    function Client() {
      this.syncControls = __bind(this.syncControls, this);
      this.onWindowResize = __bind(this.onWindowResize, this);
      this.init = __bind(this.init, this);
      this.doPageFixups = __bind(this.doPageFixups, this);      var cookie;
      this.sleepy = false;
      this.allControls = {};
      this.controlClings = {};
      this.lastFixup = 0;
      this.pageWindow = $(window);
      this.pageBody = $('#smio_body');
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
      this.disp = new smio.Dispatcher(this, false);
      this.pageWindow.resize(_.debounce((__bind(function() {
        return this.onWindowResize();
      }, this)), 300));
      this.recalcing = false;
    }
    Client.prototype.doPageFixups = function() {
      var clingee, clinger, clingerID, gpos, gw, spos, sw, tpos, _ref;
      this.allControls[''].onEverySecond();
      return;
      if ((!this.recalcing) && ((!this.sleepy) || ((new Date().getTime() - this.lastFixup) >= 5000))) {
        this.recalcing = true;
        $('.smio-dt').each(__bind(function(i, span) {
          var $span, dt;
          $span = $(span);
          if ((dt = smio.Util.Number.tryParse($span.attr('data-dt'), 0))) {
            return $span.text(_date(dt).fromNow());
          }
        }, this));
        _ref = this.controlClings;
        for (clingerID in _ref) {
          clingee = _ref[clingerID];
          clinger = this.allControls[clingerID];
          if (clinger && clingee && clinger.el && clingee.el && (tpos = clingee.el.offset()) && (spos = clinger.el.offset())) {
            gpos = {
              top: tpos.top + clingee.el.outerHeight() - 6,
              left: tpos.left
            };
            gw = clingee.el.outerWidth() + 40;
            sw = clinger.el.outerWidth();
            if ((gpos.left !== spos.left) || (gpos.top !== spos.top) || (gw !== sw)) {
              clinger.el.css({
                top: gpos.top,
                left: gpos.left,
                width: gw + 'px'
              });
            }
            smio.Control.setClingerOpacity(clinger, clingee);
          }
        }
        this.lastFixup = new Date().getTime();
        return this.recalcing = false;
      }
    };
    Client.prototype.init = function() {
      var k, tl;
      for (k in _date.relativeTime) {
        if ((tl = smio.resources.client["natlangtime_" + k])) {
          _date.relativeTime[k] = tl;
        }
      }
      $.ajaxSetup({
        timeout: 3000
      });
      $('#smio_offline_msg').text(smio.resources.client.connecting);
      this.disp.connect();
      return setInterval(this.doPageFixups, 1000);
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

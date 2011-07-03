(function() {
  var smio;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  smio = global.smoothio;
  smio.Socket = (function() {
    function Socket(client, isSocketIO, host, secure, port) {
      var opts;
      this.client = client;
      this.setTimer = __bind(this.setTimer, this);
      this.send = __bind(this.send, this);
      this.onSocketReconnecting = __bind(this.onSocketReconnecting, this);
      this.onSocketReconnectFailed = __bind(this.onSocketReconnectFailed, this);
      this.onSocketReconnect = __bind(this.onSocketReconnect, this);
      this.onSocketDisconnect = __bind(this.onSocketDisconnect, this);
      this.onSocketConnecting = __bind(this.onSocketConnecting, this);
      this.onSocketConnectFailed = __bind(this.onSocketConnectFailed, this);
      this.onSocketConnect = __bind(this.onSocketConnect, this);
      this.onSocketClose = __bind(this.onSocketClose, this);
      this.onSleepy = __bind(this.onSleepy, this);
      this.onMessage = __bind(this.onMessage, this);
      this.onOnline = __bind(this.onOnline, this);
      this.onOffline = __bind(this.onOffline, this);
      this.onError = __bind(this.onError, this);
      this.messageFetch = __bind(this.messageFetch, this);
      this.message = __bind(this.message, this);
      this.connect = __bind(this.connect, this);
      this.ready = false;
      this.offline = 1;
      this.initialFetchDone = false;
      this.lastFetchTime = 0;
      if (isSocketIO) {
        opts = {
          resource: '/_/sockio/',
          transports: ['websocket'],
          rememberTransport: false,
          reconnect: true,
          connectTimeout: 5000,
          secure: smio.iif(secure)
        };
        if (port) {
          opts.port = port;
        }
        this.socket = new io.Socket(host, opts);
        this.socket.on('connect', __bind(function() {
          return this.onSocketConnect();
        }, this));
        this.socket.on('connect_failed', __bind(function() {
          return this.onSocketConnectFailed();
        }, this));
        this.socket.on('connecting', __bind(function(type) {
          return this.onSocketConnecting(type);
        }, this));
        this.socket.on('close', __bind(function() {
          return this.onSocketClose();
        }, this));
        this.socket.on('disconnect', __bind(function() {
          return this.onSocketDisconnect();
        }, this));
        this.socket.on('message', __bind(function(msg) {
          return this.onMessage(msg);
        }, this));
        this.socket.on('reconnect', __bind(function(type, attempts) {
          return this.onSocketReconnect(type, attempts);
        }, this));
        this.socket.on('reconnect_failed', __bind(function() {
          return this.onSocketReconnectFailed();
        }, this));
        this.socket.on('reconnecting', __bind(function(delay, attempts) {
          return this.onSocketReconnecting(delay, attempts);
        }, this));
      } else {
        this.poll = {
          interval: {
            val: 0,
            handle: null,
            sleepyFactor: 4
          },
          send: __bind(function(freq) {
            return $.post("/_/poll/?t=" + (smio.Util.DateTime.ticks()), JSON.stringify(freq.msg), (__bind(function(m, t, x) {
              return this.onMessage(m, t, x);
            }, this)), 'text').error(__bind(function(x, t, e) {
              return this.onError(x, t, e, freq);
            }, this));
          }, this)
        };
      }
    }
    Socket.prototype.connect = function() {
      this.ready = true;
      $('#smio_offline').attr('title', smio.resources.smoothio.connecting_hint);
      if (this.socket) {
        return this.socket.connect();
      } else if (this.poll) {
        this.poll.send(this.message({}, {
          cmd: 's',
          settings: [['fi', 'bg']]
        }));
        return this.poll.send(this.messageFetch());
      }
    };
    Socket.prototype.message = function(msg, funcs) {
      return new smio.FetchRequestMessage(msg, smio.Util.Object.mergeDefaults(funcs, {
        url: ["/"]
      }));
    };
    Socket.prototype.messageFetch = function() {
      return this.message({}, {
        cmd: 'f',
        ticks: this.lastFetchTime
      });
    };
    Socket.prototype.onError = function(xhr, textStatus, error, freq) {
      var cid, ctl;
      if (!this.poll) {
        return alert(JSON.stringify(xhr));
      } else {
        if (freq && (cid = freq.ctlID()) && (ctl = this.client.allControls[cid])) {
          ctl.onInvokeResult([
            {
              xhr: xhr,
              textStatus: textStatus,
              error: error
            }
          ]);
        }
        if ((textStatus === 'timeout') || (error === 'timeout') || (xhr && (((xhr.status === 0) && (xhr.readyState === 0)) || ((xhr.readyState === 4) && (xhr.status >= 12001) && (xhr.status <= 12156))))) {
          return this.onOffline(true);
        } else {
          this.onOnline();
          if (!ctl) {
            if (xhr && xhr.responseText) {
              return alert(xhr.responseText);
            } else {
              return alert("" + textStatus + "\n\n" + (JSON.stringify(error)) + "\n\n" + (JSON.stringify(xhr)));
            }
          }
        }
      }
    };
    Socket.prototype.onOffline = function() {
      this.offline++;
      if (this.offline === (this.poll ? 1 : 2)) {
        $('#smio_favicon').attr({
          'href': '/_/file/images/bg.png'
        });
        return $('#smio_offline').show();
      }
    };
    Socket.prototype.onOnline = function() {
      if (this.offline) {
        this.offline = 0;
        $('#smio_favicon').attr({
          'href': '/_/file/images/smoothio.png'
        });
        $('#smio_offline').hide();
        if (this.socket) {
          return this.send(this.messageFetch());
        }
      }
    };
    Socket.prototype.onMessage = function(msg, textStatus, xhr) {
      var cfg, cid, ctl, ctls, data, err, fresp;
      this.onOnline();
      data = null;
      if (msg === 'smoonocookie') {
        this.socket.disconnect();
        onSmoothioNoCookie();
        return;
      }
      if ((!msg) && textStatus && !_.isString(textStatus)) {
        data = textStatus;
      }
      if (msg && (!data) && _.isString(msg)) {
        if (_.startsWith(msg, '{')) {
          try {
            data = JSON.parse(msg);
          } catch (err) {
            if (_.isString(err)) {
              err = {
                message: err
              };
            }
            err.faultyJson = msg;
            this.onError(err);
          }
        } else {
          data = {};
        }
      }
      if (data) {
        fresp = new smio.FetchResponseMessage(data);
        if ((ctls = fresp.controls())) {
          this.lastFetchTime = fresp.ticks();
          this.client.syncControls(ctls);
        }
        if ((cfg = fresp.settings())) {
          if (this.poll && cfg.fi) {
            this.poll.interval.val = smio.Util.Number.tryParse(cfg.fi, 16000, function(iv) {
              return (iv > 100) && (iv < 12000000);
            });
            this.setTimer();
          }
          if (cfg.bg) {
            this.client.pageBody.css({
              'background-image': "url('" + cfg.bg + "')"
            });
          }
        }
        if ((cid = fresp.ctlID()) && (ctl = this.client.allControls[cid])) {
          return ctl.onInvokeResult(fresp.errors(), fresp.msg, fresp);
        }
      }
    };
    Socket.prototype.onSleepy = function(sleepy) {
      if (this.ready && this.poll) {
        return this.setTimer();
      }
    };
    Socket.prototype.onSocketClose = function() {};
    Socket.prototype.onSocketConnect = function() {
      return this.onOnline();
    };
    Socket.prototype.onSocketConnectFailed = function() {
      return this.onOffline();
    };
    Socket.prototype.onSocketConnecting = function(type) {
      return this.onOffline();
    };
    Socket.prototype.onSocketDisconnect = function() {
      return this.onOffline();
    };
    Socket.prototype.onSocketReconnect = function() {
      return this.onOnline();
    };
    Socket.prototype.onSocketReconnectFailed = function() {
      return this.onOffline();
    };
    Socket.prototype.onSocketReconnecting = function() {
      return this.onOffline();
    };
    Socket.prototype.send = function(freq) {
      if (this.socket) {
        return this.socket.send(JSON.stringify(freq.msg));
      } else if (this.poll) {
        return this.poll.send(freq);
      }
    };
    Socket.prototype.setTimer = function(fn) {
      var pi, val;
      pi = this.poll.interval;
      if (!fn) {
        fn = __bind(function() {
          return this.poll.send(this.messageFetch());
        }, this);
      }
      if (!pi.val) {
        pi.val = 5000;
      }
      val = this.client.sleepy ? pi.val * pi.sleepyFactor : pi.val;
      if (pi['handle']) {
        clearInterval(pi.handle);
      }
      if (fn && val) {
        return pi.handle = setInterval(fn, val);
      }
    };
    return Socket;
  })();
}).call(this);

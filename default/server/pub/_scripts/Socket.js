(function() {
  var smio;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  smio = global.smoothio;
  smio.Socket = (function() {
    function Socket(client, isSocketIO, host, secure, port) {
      var opts;
      this.client = client;
      this.offline = false;
      if (isSocketIO) {
        opts = {
          resource: '/_/sockio/',
          rememberTransport: false,
          connectTimeout: 5000,
          secure: secure === true
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
          busy: false,
          msg: {
            last: null,
            next: {}
          },
          intervals: {
            heartbeat: {
              val: 4500,
              handle: null
            },
            fetch: {
              val: 20000,
              handle: null
            },
            sleepyFactor: 4
          },
          lastResponseTime: 0,
          lastSendTime: 0,
          send: __bind(function(heartbeat, force) {
            var data;
            if (force || !this.poll.busy) {
              this.poll.busy = true;
              if (heartbeat) {
                data = null;
              } else {
                this.poll.msg.last = data = this.poll.msg.next;
                this.poll.msg.next = {};
              }
              return ($.post("/_/poll/" + (heartbeat ? 'p' : 'f') + "/?t=" + (smio.Util.DateTime.ticks()), data, (__bind(function(m, t, x) {
                return this.onMessage(m, t, x);
              }, this)), 'html')).error(__bind(function(x, t, e) {
                return this.onError(x, t, e);
              }, this));
            }
          }, this)
        };
      }
    }
    Socket.prototype.connect = function() {
      if (this.socket) {
        return this.socket.connect();
      } else if (this.poll) {
        this.setTimers();
        return this.poll.send(false, true);
      }
    };
    Socket.prototype.onError = function(xhr, textStatus, error, url) {
      if (this.poll) {
        if (xhr && (xhr.status === 0) && (xhr.readyState === 0)) {
          this.onOffline();
        } else {
          this.onOnline();
          if (xhr && xhr.responseText) {
            alert(xhr.responseText);
          } else {
            alert("" + textStatus + "\n\n" + (JSON.stringify(error)) + "\n\n" + (JSON.stringify(xhr)));
          }
        }
        return this.poll.busy = false;
      }
    };
    Socket.prototype.onOffline = function() {
      if (!this.offline) {
        this.offline = true;
        return $('#smio_offline').show();
      }
    };
    Socket.prototype.onOnline = function() {
      if (this.offline) {
        this.offline = false;
        return $('#smio_offline').hide();
      }
    };
    Socket.prototype.onMessage = function(msg, textStatus, xhr) {
      var data;
      data = null;
      if (_.isString(msg)) {
        try {
          data = JSON.parse(msg);
        } catch (err) {
          this.onError(err);
        }
      }
      if (this.poll) {
        this.onOnline();
        return this.poll.busy = false;
      }
    };
    Socket.prototype.onSleepy = function(yeap) {
      this.setTimers();
      return $('#smio_sleepy')[yeap ? 'show' : 'hide']();
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
    Socket.prototype.onSocketReconnect = function(type, attempts) {
      return this.onOnline();
    };
    Socket.prototype.onSocketReconnectFailed = function() {
      return this.onOffline();
    };
    Socket.prototype.onSocketReconnecting = function(delay, attempts) {
      return this.onOffline();
    };
    Socket.prototype.clearTimers = function() {
      this.setTimer('heartbeat');
      return this.setTimer('fetch');
    };
    Socket.prototype.setTimer = function(name, fn) {
      var obj, val;
      obj = this.poll.intervals[name];
      val = this.client.sleepy ? obj.val * this.poll.intervals.sleepyFactor : obj.val;
      if (obj['handle']) {
        clearInterval(obj.handle);
      }
      if (fn) {
        return obj.handle = setInterval(fn, val);
      }
    };
    Socket.prototype.setTimers = function() {
      this.setTimer('heartbeat', __bind(function() {
        return this.poll.send(true);
      }, this));
      return this.setTimer('fetch', __bind(function() {
        return this.poll.send(false);
      }, this));
    };
    return Socket;
  })();
}).call(this);

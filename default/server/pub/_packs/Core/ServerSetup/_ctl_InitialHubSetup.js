(function() {
  /*
  Auto-generated from Core/ServerSetup/InitialHubSetup.ctl
  */  var smio, smoothio;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  smio = smoothio = global.smoothio;
  smio.Packs_Core_ServerSetup_InitialHubSetup = (function() {
    __extends(Packs_Core_ServerSetup_InitialHubSetup, smio.Control);
    Packs_Core_ServerSetup_InitialHubSetup.prototype.renderTemplate = function() {
      return {
        "div .smio-setup": {
          "id": '',
          "div .smio-setup-outer .smio-setup-outer-top": {
            "div .smio-setup-header": {
              html: [this.r('title', 'smio-setup-header-detail', smio.Control.util.jsVoid, this.urlSeg())]
            },
            "div .smio-setup-header-desc": [this.r('desc')]
          },
          "div .smio-setup-inner": {
            "SlidePanel #stepslide .smio-setup-stepslide": {
              itemClass: 'smio-setup-stepbox',
              onItemSelect: this.onSlide,
              items: {
                "#owner": {
                  'div .smio-setup-stepbox-title': [this.r('steptitle_owner')],
                  'div .smio-setup-stepbox-form': {
                    "Controls #user": {
                      ctltype: 'TextInput',
                      onChange: __bind(function() {
                        return this.verifyInputs;
                      }, this),
                      required: true,
                      nospellcheck: true,
                      labelText: __bind(function(id) {
                        return "owner_" + id;
                      }, this),
                      placeholder: __bind(function(id) {
                        return "owner_" + id + "hint";
                      }, this),
                      type: __bind(function(id) {
                        if (id !== 'name') {
                          return 'password';
                        } else {
                          return '';
                        }
                      }, this),
                      items: ['#name', '#pass', '#pass2']
                    },
                    "div .smio-setup-stepbox-form-label": {
                      html: [this.r('owner_choice')]
                    },
                    "Controls #owner": {
                      ctltype: 'Toggle',
                      disabled: true,
                      name: this.id('owner_toggle'),
                      items: {
                        "#create": {
                          checked: true,
                          labelHtml: ['owner_create', 'localhost']
                        },
                        "#login": {
                          labelHtml: ['owner_login', 'localhost']
                        }
                      }
                    }
                  }
                },
                "#template": {
                  "div .smio-setup-stepbox-title": [this.r('steptitle_template')],
                  "div .smio-setup-stepbox-form": {
                    text: ['Hub templates are not yet available.']
                  }
                },
                "#finish": {
                  "div .smio-setup-stepbox-title": [this.r('steptitle_finish')],
                  "div .smio-setup-stepbox-form": {
                    "TextInput #hub_title": {
                      required: true,
                      placeholder: 'hub_titlehint',
                      labelText: 'hub_title'
                    },
                    "div .smio-setup-stepbox-form-label": {
                      html: [this.r('hub_hint')]
                    },
                    "Controls #bg": {
                      ctltype: 'Toggle',
                      name: this.id('hub_bg'),
                      checked: __bind(function(id) {
                        return id === 'bg0';
                      }, this),
                      labelHtml: __bind(function(id) {
                        return 'nbsp';
                      }, this),
                      style: __bind(function(id) {
                        return {
                          'background-image': "url('/_/file/images/" + id + ".jpg')"
                        };
                      }, this),
                      onCheck: __bind(function(id) {
                        return __bind(function(chk) {
                          if (chk) {
                            return this.client.pageBody.css({
                              "background-image": "url('/_/file/images/" + id + ".jpg')"
                            });
                          }
                        }, this);
                      }, this),
                      items: ['#bg0', '#bg1', '#bg2', '#bg3', '#bg4']
                    },
                    "div .smio-setup-createbtn": {
                      "LinkButton #hub_create .smio-bigbutton": {
                        disabled: true,
                        labelText: 'hub_create'
                      }
                    }
                  }
                }
              }
            }
          },
          "TabStrip #steptabs .smio-setup-outer .smio-setup-steptabs": {
            "tabClass": 'smio-setup-steptab',
            "tabs": ['owner', 'template', 'finish'],
            "resPrefix": 'steps_',
            "onTabSelect": __bind(function(tabID) {
              return this.onTabSelect(tabID);
            }, this)
          }
        }
      };
    };
    Packs_Core_ServerSetup_InitialHubSetup.prototype.onLoad = function() {
      Packs_Core_ServerSetup_InitialHubSetup.__super__.onLoad.call(this);
      return $('.smio-setup-header-detail').click(__bind(function() {
        var nurl, port, urlseg;
        port = ("" + (this.client.pageUrl.attr('port'))) === '80' ? '' : ":" + (this.client.pageUrl.attr('port'));
        nurl = prompt(this.r('url_hint', this.client.pageUrl.attr('protocol'), this.client.pageUrl.attr('host'), port), urlseg = this.urlSeg());
        if ((nurl != null) && (nurl !== null) && (nurl !== urlseg)) {
          if (!_.startsWith(nurl, '/')) {
            nurl = "/" + nurl;
          }
          return location.replace(_.trim(nurl));
        }
      }, this));
    };
    Packs_Core_ServerSetup_InitialHubSetup.prototype.onSlide = function(index, itemID) {
      return this.ctl('steptabs').selectTab(itemID);
    };
    Packs_Core_ServerSetup_InitialHubSetup.prototype.onTabSelect = function(tabID) {
      return this.ctl('stepslide').scrollTo(tabID);
    };
    Packs_Core_ServerSetup_InitialHubSetup.prototype.urlSeg = function() {
      var urlseg;
      if ((urlseg = _.trim(this.client.pageUrl.attr('path'), '/'))) {
        return "/" + urlseg + "/";
      } else {
        return '/';
      }
    };
    Packs_Core_ServerSetup_InitialHubSetup.prototype.verifyInputs = function($input) {
      var userVal;
      return userVal = _.trim('' + this.sub('stepslide/user/user').val());
    };
    function Packs_Core_ServerSetup_InitialHubSetup(client, parent, args) {
      this.verifyInputs = __bind(this.verifyInputs, this);
      this.urlSeg = __bind(this.urlSeg, this);
      this.onTabSelect = __bind(this.onTabSelect, this);
      this.onSlide = __bind(this.onSlide, this);
      this.onLoad = __bind(this.onLoad, this);
      this.renderTemplate = __bind(this.renderTemplate, this);      Packs_Core_ServerSetup_InitialHubSetup.__super__.constructor.call(this, client, parent, args);
      this.init();
    }
    Packs_Core_ServerSetup_InitialHubSetup.prototype.className = function() {
      return "Core_ServerSetup_InitialHubSetup";
    };
    Packs_Core_ServerSetup_InitialHubSetup.prototype.classNamespace = function() {
      return "Core_ServerSetup";
    };
    return Packs_Core_ServerSetup_InitialHubSetup;
  })();
}).call(this);

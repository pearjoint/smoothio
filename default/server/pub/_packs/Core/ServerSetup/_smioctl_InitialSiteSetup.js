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
  }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  smio = smoothio = global.smoothio;
  smio.Packs_Core_ServerSetup_InitialSiteSetup = (function() {
    __extends(Packs_Core_ServerSetup_InitialSiteSetup, smio.Control);
    Packs_Core_ServerSetup_InitialSiteSetup.prototype.renderTemplate = function() {
      return {
        "div .smio-setup": {
          "id": '',
          "div .smio-setup-outer .smio-setup-outer-top": {
            "div.smio-setup-header": {
              html: [this.r('title', 'smio-setup-header-detail', smio.Control.util.jsVoid, this.urlSeg())]
            },
            "div.smio-setup-header-desc": [this.r('desc')]
          },
          "div .smio-setup-inner": {
            "SlidePanel #stepslide .smio-setup-stepslide": {
              itemClass: 'smio-setup-stepbox',
              onItemSelect: __bind(function(i, id) {
                return this.onSlide(i, id);
              }, this),
              items: {
                "#owner": {
                  'div .smio-setup-stepbox-title': [this.r('steptitle_owner')],
                  'div .smio-setup-stepbox-form': {
                    "TextInput #owner_name": {
                      autoFocus: true,
                      labelText: this.r('owner_name'),
                      nospellcheck: true
                    },
                    "TextInput #owner_pass": {
                      labelText: this.r('owner_pass'),
                      type: 'password'
                    },
                    "div .smio-setup-stepbox-form-label": {
                      html: [this.r('owner_choice')]
                    },
                    "Toggles #owner": {
                      disabled: true,
                      items: {
                        "#create": {
                          checked: true,
                          labelHtml: this.r('owner_create', 'localhost')
                        },
                        "#login": {
                          labelHtml: this.r('owner_login', 'localhost')
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
                      placeholder: this.r('hub_titlehint'),
                      labelText: this.r('hub_title')
                    },
                    "div .smio-setup-stepbox-form-label": {
                      html: [this.r('hub_hint')]
                    },
                    "ul #hubhints": {
                      "li #hubhint1": [this.r('hubhint1')],
                      "li #hubhint2": [this.r('hubhint2')],
                      "li #hubhint3": [this.r('hubhint3')],
                      "li #hubhint4": [this.r('hubhint4')]
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
    Packs_Core_ServerSetup_InitialSiteSetup.prototype.onLoad = function() {
      Packs_Core_ServerSetup_InitialSiteSetup.__super__.onLoad.call(this);
      return $('.smio-setup-header-detail').click(__bind(function() {
        var nurl, port, urlseg;
        port = smio.iif(("" + (this.client.pageUrl.attr('port'))) === '80', '', ":" + (this.client.pageUrl.attr('port')));
        nurl = prompt(this.r('url_hint', this.client.pageUrl.attr('protocol'), this.client.pageUrl.attr('host'), port), urlseg = this.urlSeg());
        if ((nurl != null) && nurl !== null && nurl !== urlseg) {
          if (!_.startsWith(nurl, '/')) {
            nurl = "/" + nurl;
          }
          return location.replace(_.trim(nurl));
        }
      }, this));
    };
    Packs_Core_ServerSetup_InitialSiteSetup.prototype.onSlide = function(index, itemID) {
      return this.controls.steptabs.selectTab(itemID);
    };
    Packs_Core_ServerSetup_InitialSiteSetup.prototype.onTabSelect = function(tabID) {
      return this.controls.stepslide.scrollTo(tabID);
    };
    Packs_Core_ServerSetup_InitialSiteSetup.prototype.urlSeg = function() {
      var urlseg;
      urlseg = _.trim(this.client.pageUrl.attr('path'), '/');
      return urlseg = smio.iif(urlseg, "/" + urlseg + "/", '/');
    };
    function Packs_Core_ServerSetup_InitialSiteSetup(client, parent, args) {
      Packs_Core_ServerSetup_InitialSiteSetup.__super__.constructor.call(this, client, parent, args, "Core_ServerSetup", "Core_ServerSetup_InitialSiteSetup");
      this.jsSelf = "smio.client.allControls['" + this.id() + "']";
      this.init();
    }
    return Packs_Core_ServerSetup_InitialSiteSetup;
  })();
}).call(this);

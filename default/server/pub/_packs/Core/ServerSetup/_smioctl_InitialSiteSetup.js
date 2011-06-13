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
      var urlseg;
      urlseg = _.trim(this.client.pageUrl.attr('directory'), '/');
      urlseg = smio.iif(urlseg, "/" + urlseg + "/", '/');
      return {
        "div .smio-setup": {
          "id": '',
          "div .smio-setup-outer .smio-setup-outer-top": {
            "div.smio-setup-header": {
              html: [this.r('title', urlseg)]
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
                "owner": {
                  'div .smio-setup-stepbox-title': [this.r('steptitle_owner')],
                  'div .smio-setup-stepbox-form': {
                    "TextInput #owner_name": {
                      labelText: this.r('owner_name'),
                      nospellcheck: true
                    },
                    "TextInput #owner_pass": {
                      labelText: this.r('owner_pass'),
                      type: 'password'
                    },
                    "div .smio-setup-stepbox-form-label": {
                      html: ['The Hub owner specified above is:']
                    },
                    "div": {
                      "Toggle #owner_create": {
                        toggleName: 'owner_toggle',
                        labelHtml: this.r('owner_create', 'localhost'),
                        checked: true
                      },
                      "Toggle #owner_login": {
                        toggleName: 'owner_toggle',
                        labelHtml: this.r('owner_login', 'localhost')
                      }
                    }
                  }
                },
                "template": {
                  "div .smio-setup-stepbox-title": [this.r('steptitle_template')],
                  "div .smio-setup-stepbox-form": {
                    text: ['Hub templates are not yet available.']
                  }
                },
                "finish": {
                  "div .smio-setup-stepbox-title": [this.r('steptitle_finish')],
                  "div .smio-setup-stepbox-form": {
                    html: ['mooboar<br/><br/>blaa<br/><br/>foo<br/><br/>yeah right']
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
      return this.controls['stepslide'].controls['owner_name'].sub('input').focus();
    };
    Packs_Core_ServerSetup_InitialSiteSetup.prototype.onSlide = function(index, itemID) {
      return this.controls.steptabs.selectTab(itemID);
    };
    Packs_Core_ServerSetup_InitialSiteSetup.prototype.onTabSelect = function(tabID) {
      return this.controls.stepslide.scrollTo(tabID);
    };
    function Packs_Core_ServerSetup_InitialSiteSetup(client, parent, args) {
      Packs_Core_ServerSetup_InitialSiteSetup.__super__.constructor.call(this, client, parent, args, "Core_ServerSetup", "Core_ServerSetup_InitialSiteSetup");
      this.jsSelf = "smio.client.allControls['" + this.id() + "']";
      this.init();
    }
    return Packs_Core_ServerSetup_InitialSiteSetup;
  })();
}).call(this);

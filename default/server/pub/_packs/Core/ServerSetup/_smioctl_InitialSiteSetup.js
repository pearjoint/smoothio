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
    Packs_Core_ServerSetup_InitialSiteSetup.prototype.onSlide = function(index, itemID) {
      return this.controls.steptabs.selectTab(itemID);
    };
    Packs_Core_ServerSetup_InitialSiteSetup.prototype.onTabSelect = function(tabID) {
      return this.controls.stepslide.scrollTo(tabID);
    };
    Packs_Core_ServerSetup_InitialSiteSetup.prototype.renderTemplate = function() {
      return {
        "div .smio-setup": {
          "id": this.id(),
          "div .smio-setup-outer .smio-setup-outer-top": {
            "div.smio-setup-header": this.r('title'),
            "div.smio-setup-header-desc": this.r('desc')
          },
          "div .smio-setup-inner": {
            "SlidePanel #stepslide .smio-setup-stepslide": {
              itemClass: 'smio-setup-stepbox',
              onItemSelect: __bind(function(i, id) {
                return this.onSlide(i, id);
              }, this),
              items: [
                {
                  "item #owner": {
                    'div .smio-setup-stepbox-title': this.r('steptitle_owner'),
                    'div .smio-setup-stepbox-form': 'ding blaa<br/><br/>foo<br/><br/>yeah right'
                  },
                  "item #template": {
                    "div .smio-setup-stepbox-title": this.r('steptitle_template'),
                    "div .smio-setup-stepbox-form": 'boar<br/>blaa<br/><br/>foo<br/><br/>yeah right'
                  },
                  "item #finish": {
                    "div .smio-setup-stepbox-title": this.r('steptitle_finish'),
                    "div .smio-setup-stepbox-form": 'mooboar<br/><br/>blaa<br/><br/>foo<br/><br/>yeah right'
                  }
                }
              ]
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
    function Packs_Core_ServerSetup_InitialSiteSetup(client, parent, args) {
      Packs_Core_ServerSetup_InitialSiteSetup.__super__.constructor.call(this, client, parent, args, "Core_ServerSetup", "Core_ServerSetup_InitialSiteSetup");
      this.jsSelf = "smio.client.allControls['" + this.id() + "']";
      this.init();
    }
    return Packs_Core_ServerSetup_InitialSiteSetup;
  })();
}).call(this);
